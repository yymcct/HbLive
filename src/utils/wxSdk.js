import { api_GetWxConfig } from '@/api/weixin';
import wx from "weixin-js-sdk/index";

//var wx = require('weixin-js-sdk/index')
export function wxShare(url, shareData) {
    api_GetWxConfig({ url: url }).then(res => {
        wx.config({
            debug: false, // 开启调试模式,
            appId: res.result.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: res.result.timeStamp, // 必填，生成签名的时间戳
            nonceStr: res.result.nonceStr, // 必填，生成签名的随机串
            signature: res.result.signaTure, // 必填，签名，见附录1
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ', 
                'onMenuShareQZone'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });

        wx.ready(function () {
            // Vue.prototype.$wx = wx

            if (shareData) {
                // 注册分享自定义的信息
                wx.onMenuShareTimeline(shareData);
                wx.onMenuShareAppMessage(shareData);
                wx.onMenuShareQQ(shareData);
                wx.onMenuShareQZone(shareData);
            }

         
        })

        wx.error(function () {
            console.log('微信jdk 出错了')
            // config信息验证后会执行ready方法，
            // 所有接口调用都必须在config接口获得结果之后，
            // config是一个客户端的异步操作，
            // 所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。
            // 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        })
    }).catch(e => {
        console.log(e)
    })
}
