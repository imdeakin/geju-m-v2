/**
 * Created by Administrator on 2017/3/3.
 */
export class ApiConfig {
  public static server: string = '';
  public static root: string = ApiConfig.server + '/yueyunapi';
  public static imgRoot: string = '/yueyun';
  public static apiPath = {
    getBannerList: ApiConfig.root + '/mainController/getBannerList', // 获取Banner轮播图
    getPartnerList: ApiConfig.root + '/mainController/getPartnerList', // 获取合作伙伴列表
    getCategory: ApiConfig.root + '/mainController/getCategory', // 获取成功案例的类型列表
    getCaseList: ApiConfig.root + '/mainController/getCaseList', // 获取成功案例列表
    contact: ApiConfig.root + '/mainController/note', // 提交联系信息
  };

  public static getImgFullPath(imgPath: string): string {
    return ApiConfig.imgRoot + '/' + imgPath.replace('^/', '');
  }
}
