/**
 * Created by deakin on 17-2-27.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'friends-page',
    templateUrl: './friends.component.html',
    styleUrls: ['./friends.component.css']
})
export class FriendsPageComponent {
    public title: string = "信息爆发的朋友圈";
    public describes: string[] = [
        "微商、代购、集赞？发布的通知瞬间被淹没？",
        "资讯信息无法准确传达，担心遗漏重要内容？"
    ];
}
