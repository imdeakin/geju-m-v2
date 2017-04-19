import { Component, AfterViewInit } from '@angular/core';

declare let $: any;
declare let Swiper: any;
declare let swiperAnimateCache: any;
declare let swiperAnimate: any;
declare let ImgBroke: any;

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
    public id: string = 'main-swiper';
    public swiper;
    public arrowShow = true;
    public imgBroke;

    public ngAfterViewInit(): void {
        let $this = this;
        this.swiper = new Swiper('#' + this.id, {
            direction: 'vertical',
            speed: 800,
            onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
                swiper.lockSwipes();
                swiperAnimateCache(swiper); //隐藏动画元素
                swiperAnimate(swiper); //初始化完成开始动画
            },
            onSlideChangeStart: function (swiper) {
                $this.arrowShow = swiper.activeIndex < swiper.slides.length - 1;
            },
            onSlideChangeEnd: function (swiper) {
                swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
            },
            onTouchEnd: function (swiper, event) {
                let distance = swiper.touches.currentY - swiper.touches.startY;
                if (distance > 100) { // 往下划，上一页
                    swiper.unlockSwipes();
                    swiper.slidePrev();
                    swiper.lockSwipes();
                } else if (distance < -100) { // 往上划，下一页
                    if (swiper.activeIndex === 0) {
                        $this.imgBroke.shatter();
                    } else {
                        swiper.unlockSwipes();
                        swiper.slideNext();
                        swiper.lockSwipes();
                    }
                }
            }
        });

        this.imgBroke = ImgBroke({
            conId: 'wx-phone-cover',
            loop: true,
            imageWidth: $('#wx-phone-cover').width(),
            imageHeight: $('#wx-phone-cover').height(),
            onInit: function () {

            },
            onShatterEnd: function () {
                $this.swiper.unlockSwipes();
                $this.swiper.slideNext();
                $this.swiper.lockSwipes();
            }
        });
        this.imgBroke.init();
    }
}
