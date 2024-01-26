export class ResPage<T> {
  data: T[];
  total: number;
  noMore: boolean;

  static page<T>(data: T[], total: number, noMore = false) {
    const res = new ResPage<T>();
    res.data = data;
    res.total = total;
    res.noMore = noMore;
    return res;
  }
}
