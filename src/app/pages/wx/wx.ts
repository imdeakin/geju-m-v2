/**
 * Created by deakin on 17-2-27.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'wx-page',
    templateUrl: './wx.component.html',
    styleUrls: ['./wx.component.css']
})
export class WxPageComponent {
    public title: string = "信息混乱";
    public describes: string[] = [
        "您还在被微信杂乱无章的消息轰炸着吗？",
        "生活，办公全都混杂在一起，沟通无从下手"
    ];

    public animate = {
        describe: {
            effect: 'bounceInUP',
            duration: '0.5s',
            delay: '0.3s'
        }
    };
}
