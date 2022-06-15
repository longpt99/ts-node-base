import AES from 'crypto-js/aes';
import encUtf8 from 'crypto-js/enc-utf8';
import lib from 'crypto-js/lib-typedarrays';

export class StringUtil {
  static encrypt(data: string, secretKey: string): string {
    return AES.encrypt(data, secretKey).toString();
  }

  static decrypt(data: string, secretKey: string): string {
    return AES.decrypt(data, secretKey).toString(encUtf8);
  }

  static random(): string {
    return lib.random(128 / 8).toString();
  }
}
