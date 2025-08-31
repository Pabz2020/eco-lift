import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

let pickupServiceClient: MongoClient | null = null;
let userServiceClient: MongoClient | null = null;
let pickupServiceDb: Db | null = null;
let userServiceDb: Db | null = null;
let isConnecting = false;
let connectionPromise: Promise<void> | null = null;

const ensureConnections = async () => {
  if (isConnecting && connectionPromise) {
    return connectionPromise;
  }

  if (pickupServiceDb && userServiceDb) {
    return;
  }

  isConnecting = true;
  connectionPromise = connectDatabases();
  
  try {
    await connectionPromise;
  } finally {
    isConnecting = false;
    connectionPromise = null;
  }
};

export const connectDatabases = async () => {
  try {
    if (!process.env.PICKUP_SERVICE_DB_URL) {
      throw new Error('PICKUP_SERVICE_DB_URL environment variable is not set');
    }
    if (!process.env.USER_SERVICE_DB_URL) {
      throw new Error('USER_SERVICE_DB_URL environment variable is not set');
    }

    // Connect to pickup-service database
    const pickupServiceUrl = `${process.env.PICKUP_SERVICE_DB_URL}`;
    pickupServiceClient = new MongoClient(pickupServiceUrl);
    await pickupServiceClient.connect();
    pickupServiceDb = pickupServiceClient.db(process.env.PICKUP_SERVICE_DB);

    // Connect to user-service database
    const userServiceUrl = `${process.env.USER_SERVICE_DB_URL}`;
    userServiceClient = new MongoClient(userServiceUrl);
    await userServiceClient.connect();
    userServiceDb = userServiceClient.db(process.env.USER_SERVICE_DB);

    console.log('Pickup Service URL:', pickupServiceUrl);
    console.log('User Service URL:', userServiceUrl);
    console.log('✅ Connected to MongoDB databases');
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    console.error('Please make sure you have a .env file with the required environment variables.');
    console.error('You can copy env.example to .env and update the values as needed.');
    throw error;
  }
};

export const getPickupServiceDb = async (): Promise<Db> => {
  await ensureConnections();
  if (!pickupServiceDb) {
    throw new Error('Pickup service database connection not established');
  }
  return pickupServiceDb;
};

export const getUserServiceDb = async (): Promise<Db> => {
  await ensureConnections();
  if (!userServiceDb) {
    throw new Error('User service database connection not established');
  }
  return userServiceDb;
};

export const closeConnections = async () => {
  if (pickupServiceClient) {
    await pickupServiceClient.close();
  }
  if (userServiceClient) {
    await userServiceClient.close();
  }
};
