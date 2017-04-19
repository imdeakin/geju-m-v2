/**
 * Created by deakin on 17-2-27.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'chat-page',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatPageComponent {
    public title: string = "让交流更专注";
    public describes: string[] = [
        "工作上的事宜沟通使用办公软件处理，",
        "让信息不再被埋没，交流更加专注。"
    ];
}
