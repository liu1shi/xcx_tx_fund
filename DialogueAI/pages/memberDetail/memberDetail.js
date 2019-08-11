//index.js
//获取应用实例
// const app = getApp()

var SendReq = require('../../public/network/sendreq.js')
var PublicMethod = require('../../public/method/publicMethod.js')

Page({

  data: {
    arrayData: {},
    funds: [],
    tjManager: [],   //推荐基金管理人
    tjFunds: [],      //推荐基金
    resume: '',        //简历
    isResume: false,
    isFund: false,
    isTjManager: false,
    isTjFunds: false
  },

  onLoad: function (options) {

    var that = this

    var params = {
      "FundManagerCode": options.FundManagerCode
    }

    SendReq.kgraphFund_managers(params,function (res) {
      that.setData({
        arrayData: res.data.data,
        funds: res.data.data.funds.slice(0,5),
        tjManager: res.data.data.recommend.data.RecommendFundManagerList.slice(0,5),
        tjFunds: res.data.data.recommend.data.RecommendFundList.slice(0,5),
        resume: res.data.data.fund_manager.data.Resume.slice(0,80)
      })
    })
  },

  onShow: function () {

  },

  resumeMore:function () {
    if (this.data.arrayData.fund_manager.data.Resume && this.data.arrayData.fund_manager.data.Resume.length <= 80) {
      PublicMethod.alert(null,'没有更多了哟',false)
      return
    }

    this.setData({
      isResume: !this.data.isResume
    })

    if (this.data.isResume) {
      this.setData({
        resume: this.data.arrayData.fund_manager.data.Resume
      })
    } else {
      this.setData({
        resume: this.data.arrayData.fund_manager.data.Resume.slice(0,80)
      })
    }
  },

  fundMore: function () {

    if (this.data.arrayData.funds && this.data.arrayData.funds.length <= 5) {
      PublicMethod.alert(null,'没有更多了哟',false)
      return
    }

    this.setData({
      isFund: !this.data.isFund
    })

    if (this.data.isFund) {
      this.setData({
        funds: this.data.arrayData.funds
      })
    } else {
      this.setData({
        funds: this.data.arrayData.funds.slice(0,5)
      })
    }

  },

  tjManagerMore: function () {

    if (this.data.arrayData.recommend.data.RecommendFundManagerList && this.data.arrayData.recommend.data.RecommendFundManagerList.length <= 5) {
      PublicMethod.alert(null,'没有更多了哟',false)
      return
    }

    this.setData({
      isTjManager: !this.data.isTjManager
    })

    if (this.data.isTjManager) {
      this.setData({
        tjManager: this.data.arrayData.recommend.data.RecommendFundManagerList
      })
    } else {
      this.setData({
        tjManager: this.data.arrayData.recommend.data.RecommendFundManagerList.slice(0,5)
      })
    }
  },

  tjFundsMore: function () {
    if (this.data.arrayData.recommend.data.RecommendFundList && this.data.arrayData.recommend.data.RecommendFundList.length <= 5) {
      PublicMethod.alert(null,'没有更多了哟',false)
      return
    }

    this.setData({
      tjFunds: !this.data.tjFunds
    })

    if (this.data.tjFunds) {
      this.setData({
        tjFunds: this.data.arrayData.recommend.data.RecommendFundList
      })
    } else {
      this.setData({
        tjFunds: this.data.arrayData.recommend.data.RecommendFundList.slice(0,5)
      })
    }
  },

  btnClick: function (e) {
    console.log('dataset : ' + e.currentTarget.dataset.index + e.currentTarget.dataset.item.title)
  }

})
