import CryptoJS from 'crypto-js';

export class StringUtil {
  static encrypt(data: string, secretKey: string) {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
  }

  static decrypt(data: string, secretKey: string) {
    return CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8);
  }

  static random() {
    return CryptoJS.lib.WordArray.random(128 / 8).toString();
  }
}
