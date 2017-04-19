/**
 * Created by deakin on 17-2-27.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'steward-page',
    templateUrl: './steward.component.html',
    styleUrls: ['./steward.component.css']
})
export class StewardPageComponent {
    public title: string = "组织管家";
    public describes: string[] = [
        "高效管理内部成员与事项，更快更省心。",
        "让您更专注资源对接，开启新的连接方式！"
    ];
}
