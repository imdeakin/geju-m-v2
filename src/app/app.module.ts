import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { WxPageComponent } from './pages/wx';
import { LivePageComponent } from './pages/live';
import { NoticePageComponent } from './pages/notice';
import { ChatPageComponent } from './pages/chat';
import { FriendsPageComponent } from './pages/friends';
import { TeamPageComponent } from './pages/team';
import { StewardPageComponent } from './pages/steward';

import { BounceArrowComponent } from './common/bounce-arrow';
import { DlBtnComponent } from './common/dl-btn';
import { WxTipsComponent } from './common/wx-tips';

@NgModule({
    imports: [
        BrowserModule
    ],
    declarations: [
        AppComponent,
        WxPageComponent,
        LivePageComponent,
        NoticePageComponent,
        ChatPageComponent,
        FriendsPageComponent,
        TeamPageComponent,
        StewardPageComponent,

        BounceArrowComponent,
        DlBtnComponent,
        WxTipsComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
