/**
 * Created by deakin on 17-2-27.
 */
import { Component, AfterViewInit } from '@angular/core';
declare let $: any;
@Component({
    selector: 'wx-tips',
    templateUrl: './wx-tips.component.html',
    styleUrls: ['./wx-tips.component.css']
})
export class WxTipsComponent implements AfterViewInit {
    public ngAfterViewInit(): void {
        $('.weixin-tip').click(function () {
            $(this).hide();
        });
    }
}
