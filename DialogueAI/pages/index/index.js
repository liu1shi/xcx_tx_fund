//index.js
//获取应用实例
// const app = getApp()

var SendReq = require('../../public/network/sendreq.js')

Page({

  data: {
    authInfo: true,
    arrayData:[]
  },

  onLoad: function () {
    // this.getUserInfo()

    this.refresh()

  },

  onShow: function () {

    // var that = this;

    // wx.getSetting({
    //   success(res) {
    //     if (!res.authSetting['scope.userInfo']) {
    //       wx.authorize({
    //         scope: 'scope.userInfo',
    //         success() {
    //           that.getUserInfo()
    //           that.setData({
    //             authInfo: true,
    //           })
    //         },
    //         fail() {
    //           that.setData({
    //             authInfo: false,
    //           })
    //         }
    //       })
    //     } else {
    //       that.getUserInfo()
    //       that.setData({
    //         authInfo: true
    //       })
    //     }
    //   }
    // })

  },

  getUserInfo: function () {

    var that = this

    wx.getUserInfo({
      success: function (res) {
        that.setData({
          authInfo: true
        })
        // 可以将 res 发送给后台解码出 unionId
        console.log('res.userInfo' + res.userInfo)
      },
      fail: function () {
        that.setData({
          authInfo: false
        })
      }
    })

  },


  onPullDownRefresh: function () {
    this.refresh()
    wx.stopPullDownRefresh()
  },

  refresh: function () {
    var that = this
    SendReq.kgraphHomepage(function (res) {
      that.setData({
        arrayData:res.data.data.ValueList
      })
    })
  },

  btnClick: function (e) {
    var item = e.currentTarget.dataset.item
    var params = "FundCode=" + item.FundCode + "&Fund300Index=" + item.Fund300Index
    wx.navigateTo({
      url: '../detail/detail?' + params
    })
  }

})
