//index.js
//获取应用实例
// const app = getApp()

var SendReq = require('../../public/network/sendreq.js')


var resData

Page({

  data: {
    isClickLeft:true,
    arrayData:[]
  },

  onLoad: function () {

    var that = this
    SendReq.kgraphCsi_300_index(function (res) {
      resData = res.data.data
      that.setData({
        arrayData: resData.data.EnhancementIndexRankList
      })
    })
  },

  onShow: function () {

  },

  btnLeft: function () {
    this.setData({
      isClickLeft: true,
      arrayData: resData.data.EnhancementIndexRankList
    })
  },

  btnRight: function () {
    this.setData({
      isClickLeft: false,
      arrayData: resData.data.IndexRankList
    })
  }
})
