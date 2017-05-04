(function (callback) {
    // noncestr 生成随机字符串
    var createNonceStr = function () {
        return Math.random().toString(36).substr(2, 15);
    };

    // timestamp 取当前时间戳
    var createTimeStamp = function () {
        return parseInt(new Date().getTime() / 1000) + '';
    };

    //取当前页面url，不包含#部分
    var getCurrentUrl = function () {
        var url = location.href.split('#')[0];
        return url;
    };

    var url = encodeURIComponent(getCurrentUrl());
    // alert(url);
    // var data = "url=" + url;

    var ajaxSuccess = function (json) {
        var signature = json.signature;
        var nonceStr = json.nonceStr;
        var timestamp = json.timestamp;
        var appid = json.appid;
        var signParm = {"noncestr": nonceStr, "timestamp": timestamp, "signature": signature, "appid": appid};
        callback(signParm);
    };
    $.post('http://www.gzyueyun.com/yueyunapi/wx/WxSignController/getSign.hn', {url: url}, ajaxSuccess, 'json');

})(wxConfig);

function wxConfig(signParm) {

    var appid = signParm.appid,
        timestamp = signParm.timestamp,
        noncestr = signParm.noncestr,
        signature = signParm.signature;
    var apilist = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"];
    wx.config({
        debug: false,
        appId: appid,
        timestamp: timestamp,
        nonceStr: noncestr,
        signature: signature,
        jsApiList: apilist
    });

    wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后
        wx.onMenuShareTimeline({
            title: '格局：全新的松散组织连接方式', // 分享标题
            link: 'http://www.gzyueyun.com/m/geju/index.html', // 分享链接
            imgUrl: 'http://www.gzyueyun.com/m/geju/assets/img/logo.png', // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });

        wx.onMenuShareAppMessage({
            title: '格局：全新的松散组织连接方式', // 分享标题
            desc: '格局正在帮助开创未来的组织协作,提升沟通效率,让组织管理更简单、高效、安全.', // 分享描述
            link: 'http://www.gzyueyun.com/m/geju/index.html', // 分享链接
            imgUrl: 'http://www.gzyueyun.com/m/geju/assets/img/logo.png', // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                // 用户确认分享后执行的回调函数
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });

    wx.error(function (res) {
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });

}
