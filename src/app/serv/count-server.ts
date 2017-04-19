/**
 * Created by Administrator on 2017/2/28.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class CountServer {

  /**
   * 以一行3个为准，计算当前项是否中间项
   * @param i 当前索引 从0开始
   * @returns {boolean}
   */
  public isCenterItem(i: number): boolean {
    let num = (i + 2) / 3;
    return Math.floor(num) === num;
  }

  /**
   * 以九宫图为准，计算当前项是否中间项
   * @param i 当前索引 从0开始
   * @returns {boolean}
   */
  public isMiddleItem(i: number): boolean {
    let num = (i + 2) / 6;
    return Math.floor(num) === num;
  }

  /**
   * 以一行3个为准，计算当前项是否在第一行
   * @param i 当前索引，从0开始
   * @returns {boolean}
   */
  public isFirstLineItem(i: number): boolean {
    return i < 3;
  }

  /**
   * 以一行3个为准，计算当前项是否在最后一行
   * @param i 当前索引，从0开始
   * @param l 总数
   * @returns {boolean}
   */
  public isLastLineItem(i: number, l: number): boolean {
    let lineCount = Math.ceil(l / 3);

    let lineNum = Math.ceil((i + 1) / 3);

    return lineCount === lineNum;
  }
}
