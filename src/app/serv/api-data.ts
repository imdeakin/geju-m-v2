/**
 * Created by Administrator on 2017/3/2.
 */
export class ApiData {
  constructor(public result: string,
              public success: boolean,
              public total?: number,
              public root?: any) {
  }
}
