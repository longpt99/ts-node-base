import { client } from '../config/databases/database';
import { RedisClientType, RedisScripts } from 'redis';

export class CacheManagerUtil {
  constructor() {}

  async getClient() {
    return client;
  }

  public setKey = async (key: string, value: string, exp?: number) => {
    const redisClient = await this.getClient();
    return exp
      ? redisClient.setEx(key, exp, value)
      : redisClient.set(key, value);
  };

  public delKey = async (key: string) => {
    const redisClient = await this.getClient();
    return redisClient.del(key);
  };

  public getKey = async (key: string) => {
    const redisClient = await this.getClient();
    return redisClient.get(key);
  };

  public hashSet = async (key: string, field: string, value: string) => {
    const redisClient = await this.getClient();
    return redisClient.hSet(key, field, value);
  };

  public hashGet = async (key: string, field: string) => {
    const redisClient = await this.getClient();
    return redisClient.hGet(key, field);
  };

  public hashGetAll = async (key: string) => {
    const redisClient = await this.getClient();
    return redisClient.hGetAll(key);
  };

  public hashDel = async (key: string, field: string) => {
    const redisClient = await this.getClient();
    return redisClient.hDel(key, field);
  };

  public push = async <T>(queue: string, dataArr: T[]) => {
    const redisClient = await this.getClient();
    const msgArr: string[] = [];
    for (let i = 0; i < dataArr.length; i++) {
      msgArr.push(JSON.stringify(dataArr[i]));
    }
    return redisClient.rPush(queue, msgArr);
  };
}

export default new CacheManagerUtil();
