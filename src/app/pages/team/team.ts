/**
 * Created by deakin on 17-2-27.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'team-page',
    templateUrl: './team.component.html',
    styleUrls: ['./team.component.css']
})
export class TeamPageComponent {
    public title: string = "组织协作";
    public describes: string[] = [
        "我们为您准备了签到、统计、名片等管理工具",
        "提高组织内部的办公效率，开启智能组织管理新变革"
    ];
}
