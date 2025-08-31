import { ObjectId } from 'mongodb';
import { getUserServiceDb } from '../config/database';
import { IUser } from '../types';

export class UserService {
  private static collectionName = 'users';

  static async find(filter: any = {}, projection: any = {}): Promise<IUser[]> {
    const db = await getUserServiceDb();
    const collection = db.collection(this.collectionName);
    const results = await collection.find(filter, { projection }).toArray();
    return results as unknown as IUser[];
  }

  static async findById(id: string, projection: any = {}): Promise<IUser | null> {
    const db = await getUserServiceDb();
    const collection = db.collection(this.collectionName);
    const result = await collection.findOne({ _id: new ObjectId(id) }, { projection });
    return result as unknown as IUser | null;
  }

  static async countDocuments(filter: any = {}): Promise<number> {
    const db = await getUserServiceDb();
    const collection = db.collection(this.collectionName);
    return await collection.countDocuments(filter);
  }

  static async findOne(filter: any, projection: any = {}): Promise<IUser | null> {
    const db = await getUserServiceDb();
    const collection = db.collection(this.collectionName);
    const result = await collection.findOne(filter, { projection });
    return result as unknown as IUser | null;
  }
}
