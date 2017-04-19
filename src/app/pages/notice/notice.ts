/**
 * Created by deakin on 17-2-27.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'notice-page',
    templateUrl: './notice.component.html',
    styleUrls: ['./notice.component.css']
})
export class NoticePageComponent {
    public title: string = "公告管理";
    public describes: string[] = [
        "组织资讯，项目发布，商机寻找，资源对接更方便，",
        "让信息准确的传达给组织的每一个人。"
    ];
}
