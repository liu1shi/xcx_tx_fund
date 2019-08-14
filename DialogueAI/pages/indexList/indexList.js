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
    wx.setNavigationBarTitle({
      title: '指数型基金排名'
    })
    this.setData({
      isClickLeft: true,
      arrayData: resData.data.EnhancementIndexRankList
    })
  },

  btnRight: function () {
    wx.setNavigationBarTitle({
      title: '指数增强型基金排名'
    })
    this.setData({
      isClickLeft: false,
      arrayData: resData.data.IndexRankList
    })
  },

  clickDetail: function(e) {

    var item = e.currentTarget.dataset.item
    var params = "FundCode=" + item.FundCode + "&Fund300Index=" + (this.data.isClickLeft ? 2 : 1)

    wx.navigateTo({
      url: '../detail/detail?' + params
    })
  }
})
