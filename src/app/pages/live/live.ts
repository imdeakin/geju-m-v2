/**
 * Created by deakin on 17-2-27.
 */
import { Component } from '@angular/core';

@Component({
    selector: 'live-page',
    templateUrl: './live.component.html',
    styleUrls: ['./live.component.css']
})
export class LivePageComponent {
    public title: string = "直播";
    public describes: string[] = [
        "论坛/会议，不再是只有面对面，",
        "办公室里也能参与，不限场地，随时开播。",
    ];
}
