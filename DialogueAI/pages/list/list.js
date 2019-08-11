//index.js
//获取应用实例
// const app = getApp()

var SendReq = require('../../public/network/sendreq.js')

var i = 1
var resData
var FundTypeCode
var FundInvestmentCode

Page({

  data: {
    arrayData:[],
    FundTypeName: ''
  },

  onLoad: function (options) {

    FundTypeCode = options.FundTypeCode
    FundInvestmentCode = options.FundInvestmentCode
    wx.setNavigationBarTitle({
      title: options.FundType + '行业基金排名'
    })

    this.refresh()
  },

  onShow: function () {

  },

  onPullDownRefresh: function () {
    this.refresh()
    wx.stopPullDownRefresh()
  },

  onReachBottom: function () {
    if (i-1 <= resData.data.FundList.length / 20) {
      i ++
      this.setData({
        arrayData: this.data.arrayData.concat(resData.data.FundList.slice((i - 1) * 20,20))
      })
    }
  },

  refresh: function () {

    i = 1
    var that = this

    var params = {
      // "FundType": FundTypeCode,
      "InvestmentTypeCode": FundInvestmentCode
    }

    SendReq.kgraphFund_type(params,function (res) {
      resData = res.data.data
      that.setData({
        arrayData: resData.data.FundList.slice(0,20)
      })
    })
  }

})
