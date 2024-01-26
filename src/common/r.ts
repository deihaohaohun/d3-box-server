export class R<T> {
  data: T;
  code: number;
  message: string;

  static success<T>(data?: T, code = 200, message = '请求处理成功') {
    const resp = new R<T>();
    resp.data = data;
    resp.code = code;
    resp.message = message;
    return resp;
  }
}
