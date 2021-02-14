// plugins/wx-share.js 内容如下

import Vue from 'vue'
import axios from 'axios'  // 如nuxt已经集成了axios 此处可以去掉
import wx from 'weixin-js-sdk'

Vue.prototype.$axios = axios // 如nuxt已经集成了axios 此处可以去掉
Vue.prototype.$wechat = wx

const wechatShare = {
  install(Vue) {
    Vue.prototype.wxShare = function(shareData, url) {
      this.$axios
        .get('//xxx.com/v2/weixin-share/get', {
          // 请求配置
          params: {
            currentUrl: url  // 根据后台配置填写
          }
        })
        .then(res => {
          const Data = res.data.data
          this.$wechat.config({
            debug: false,
            appId: Data.appId,
            timestamp: Data.timestamp,
            nonceStr: Data.nonceStr,
            signature: Data.signature,
            jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
          })
        })
      this.$wechat.ready(() => {
      // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
        this.$wechat.updateAppMessageShareData({
          title: shareData.title,
          desc: shareData.desc,
          link: shareData.url,
          imgUrl: shareData.image,
          success: function() {
            // 设置成功
          },
          cancel: function() {
            console.log('分享取消')
          }
        })
        // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
        this.$wechat.updateTimelineShareData({
          title: shareData.title,
          desc: shareData.desc,
          link: shareData.url,
          imgUrl: shareData.image,
          success: function() {
            // 设置成功
          },
          cancel: function() {
            console.log('分享取消')
          }
        })
      })
    }
  }
}

Vue.use(wechatShare)
