/**
 * Created by deakin on 17-2-27.
 */
import { Component, AfterViewInit } from '@angular/core';

declare let $: any;

@Component({
    selector: 'dl-btn',
    templateUrl: './dl-btn.component.html',
    styleUrls: ['./dl-btn.component.css']
})
export class DlBtnComponent implements AfterViewInit {
    public wxTipsShow = false;

    public isWeixin(): boolean {
        let ua = navigator.userAgent.toLowerCase();
        let result = ua.match(/MicroMessenger/i) + '';
        return result == "micromessenger";
    }

    public clickDl(): void {
        let isWeixin = this.isWeixin();
        if (isWeixin) {
            $(".weixin-tip").show();
        } else {
            window.location.href = 'http://www.gzyueyun.com/assets/dowload.html';
        }
    }

    public ngAfterViewInit(): void {

    }
}
