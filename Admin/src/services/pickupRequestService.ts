import { ObjectId } from 'mongodb';
import { getPickupServiceDb } from '../config/database';
import { IPickupRequest } from '../types';

export class PickupRequestService {
  private static collectionName = 'pickuprequests';

  static async find(filter: any = {}, projection: any = {}, options: any = {}): Promise<IPickupRequest[]> {
    const db = await getPickupServiceDb();
    const collection = db.collection(this.collectionName);
    let query = collection.find(filter, { projection });
    
    if (options.sort) {
      query = query.sort(options.sort);
    }
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    const results = await query.toArray();
    return results as unknown as IPickupRequest[];
  }

  static async findById(id: string, projection: any = {}): Promise<IPickupRequest | null> {
    const db = await getPickupServiceDb();
    const collection = db.collection(this.collectionName);
    const result = await collection.findOne({ _id: new ObjectId(id) }, { projection });
    return result as unknown as IPickupRequest | null;
  }

  static async countDocuments(filter: any = {}): Promise<number> {
    const db = await getPickupServiceDb();
    const collection = db.collection(this.collectionName);
    return await collection.countDocuments(filter);
  }

  static async findOne(filter: any, projection: any = {}): Promise<IPickupRequest | null> {
    const db = await getPickupServiceDb();
    const collection = db.collection(this.collectionName);
    const result = await collection.findOne(filter, { projection });
    return result as unknown as IPickupRequest | null;
  }
}
