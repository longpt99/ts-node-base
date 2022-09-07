export default class ObjectUtil {
  static swap(obj: { [key: string]: string }) {
    const reverse = {};
    for (const key in obj) {
      reverse[obj[key]] = key;
    }
    return reverse;
  }
}
