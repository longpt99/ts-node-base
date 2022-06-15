import { client } from '../config/databases/database';

export class CacheManagerUtil {
  private static instance: CacheManagerUtil;

  constructor() {
    if (CacheManagerUtil.instance) {
      return CacheManagerUtil.instance;
    }

    CacheManagerUtil.instance = this;
  }

  async(params: {
    key: string;
    value: string;
    exp?: number;
  }): Promise<string | null> {
    return new Promise((resolve, reject) => {
      if (params.exp) {
        client.setex(params.key, params.exp, params.value, (err, val) => {
          if (err) {
            return reject(err);
          }
          return resolve(val);
        });
      }
      client.set(params.key, params.value, (err, val) => {
        if (err) {
          return reject(err);
        }
        return resolve(val);
      });
    });
  }

  async delKey(key: string): Promise<number> {
    return new Promise((resolve, reject) => {
      client.del(key, (err, val) => {
        if (err) {
          return reject(err);
        }
        return resolve(val);
      });
    });
  }

  async getKey(key: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      client.get(key, (err, val) => {
        if (err) {
          return reject(err);
        }
        return resolve(val);
      });
    });
  }

  async hashSet(key: string, field: string, value: string): Promise<number> {
    return new Promise((resolve, reject) => {
      client.hset(key, field, value, (err, val) => {
        if (err) {
          return reject(err);
        }
        return resolve(val);
      });
    });
  }

  async hashGet(key: string, field: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      client.hget(key, field, (err, val) => {
        if (err) {
          return reject(err);
        }
        return resolve(val);
      });
    });
  }

  async hashGetAll(key: string): Promise<{ [x: string]: string }> {
    return new Promise((resolve, reject) => {
      client.hgetall(key, (err, val) => {
        if (err) {
          return reject(err);
        }
        return resolve(val);
      });
    });
  }

  async hashDel(key: string, field: string): Promise<number> {
    return new Promise((resolve, reject) => {
      client.hdel(key, field, (err, val) => {
        if (err) {
          return reject(err);
        }
        return resolve(val);
      });
    });
  }

  async push<T>(queue: string, dataArr: T[]): Promise<number> {
    const msgArr: string[] = [];
    for (let i = 0; i < dataArr.length; i++) {
      msgArr.push(JSON.stringify(dataArr[i]));
    }
    return new Promise((resolve, reject) => {
      client.rpush(queue, msgArr, (err, val) => {
        if (err) {
          return reject(err);
        }
        return resolve(val);
      });
    });
  }
}
