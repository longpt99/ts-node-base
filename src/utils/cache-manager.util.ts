import { client } from '../config/databases/database';

export class CacheManagerUtil {
  private static instance: CacheManagerUtil;

  constructor() {
    if (CacheManagerUtil.instance) {
      return CacheManagerUtil.instance;
    }

    CacheManagerUtil.instance = this;
  }

  async setKey(params: {
    key: string;
    value: string;
    exp?: number;
  }): Promise<string | null> {
    return params.exp
      ? client.setEx(params.key, params.exp, params.value)
      : client.set(params.key, params.value);
  }

  async delKey(key: string): Promise<number> {
    return client.del(key);
  }

  async getKey(key: string): Promise<string | null> {
    return client.get(key);
  }

  async hashSet(key: string, field: string, value: string): Promise<number> {
    return client.hSet(key, field, value);
  }

  async hashGet(key: string, field: string): Promise<string | undefined> {
    return client.hGet(key, field);
  }

  async hashGetAll(key: string): Promise<{ [x: string]: string }> {
    return client.hGetAll(key);
  }

  async hashDel(key: string, field: string): Promise<number> {
    return client.hDel(key, field);
  }

  async push<T>(queue: string, dataArr: T[]): Promise<number> {
    const msgArr: string[] = [];
    for (let i = 0; i < dataArr.length; i++) {
      msgArr.push(JSON.stringify(dataArr[i]));
    }
    return client.rPush(queue, msgArr);
  }
}
