//index.js
//获取应用实例
// const app = getApp()

var SendReq = require('../../public/network/sendreq.js')
var PublicMethod = require('../../public/method/publicMethod.js')
var PublicUserdefault = require('../../public/method/publicUserdefault.js')


var lsyjArr,yjphArr

Page({

  data: {
    arrayData: {},
    lsyjData: [],
    yjphData: [],
    jqjzData: [],
    isLsyj: true,
    isLsyjMore: false,
    isyjphMore: false,
    isJqjzMore: false,
    messageData: [],
    face:'',
    RecommendArr: []
  },

  onLoad: function (options) {

    this.randFace()

    var FundCode = options.FundCode
    var Fund300Index = options.Fund300Index

    var params = {
      "FundCode": FundCode
    }

    if (Fund300Index == 1) {
      var that = this
      SendReq.kgraphEnhanced_index_funds(params,function (res) {
        that.fundRes(res)
      })
    } else if (Fund300Index == 2) {
      var that = this
      SendReq.kgraphIndex_funds(params,function (res) {
        that.fundRes(res)
      })
    } else if (Fund300Index == 0) {
      var that = this
      SendReq.kgraphType_funds(params,function (res) {
          that.fundRes(res)
      })
    }

  },


  fundRes: function (res) {
      lsyjArr = res.data.data.fund_performance.data.History
      yjphArr = res.data.data.fund_rank.data.History

      var lsyjGoodArr = res.data.data.fund_performance.data.RecommendString ? res.data.data.fund_performance.data.RecommendString.split(/<(.+?)>/) : []

      this.setData({
        arrayData: res.data.data,
        lsyjData: lsyjArr.slice(0,5),
        yjphData: yjphArr.slice(0,5),
        jqjzData: res.data.data.fund_valuation.data.ValueList.slice(0,5),
        messageData: res.data.data.fund_related_info_list.code == 0 ? res.data.data.fund_related_info_list.data.RelatedInfoList : [],
        RecommendArr: lsyjGoodArr
      })
  },

  onShow: function () {

  },

  lsyjClick: function () {
    this.setData({
      isLsyj: true
    })
  },

  jqjzClick: function () {
    this.setData({
      isLsyj: false
    })
  },

  lsyjMore: function () {

    if (this.data.isLsyj) {

      if (lsyjArr && lsyjArr.length <= 5) {
        PublicMethod.alert(null,'没有更多了哟',false)
        return
      }

      this.setData({
        isLsyjMore: !this.data.isLsyjMore
      })

      if (this.data.isLsyjMore) {
        this.setData({
          lsyjData: lsyjArr
        })
      } else {
        this.setData({
          lsyjData: lsyjArr.slice(0,5)
        })
      }
    } else {

      if (this.data.arrayData.fund_valuation.data.ValueList && this.data.arrayData.fund_valuation.data.ValueList.length <= 5) {
        PublicMethod.alert(null,'没有更多了哟',false)
        return
      }

      this.setData({
        isJqjzMore: !this.data.isJqjzMore
      })

      if (this.data.isJqjzMore) {
        this.setData({
          jqjzData: this.data.arrayData.fund_valuation.data.ValueList
        })
      } else {
        this.setData({
          jqjzData: this.data.arrayData.fund_valuation.data.ValueList.slice(0,5)
        })
      }
    }
  },

  yjphMore: function () {
    if (yjphArr && yjphArr.length <= 5) {
      PublicMethod.alert(null,'没有更多了哟',false)
      return
    }

    this.setData({
      isyjphMore: !this.data.isyjphMore
    })

    if (this.data.isyjphMore) {
      this.setData({
        yjphData: yjphArr
      })
    } else {
      this.setData({
        yjphData: yjphArr.slice(0,5)
      })
    }
  },

  helpClick: function () {
    PublicMethod.alert('同类排名','同类排名代表相同投资标的基金排名情况，代表基金投资、基金经理管理、收益等各方面的优劣。',false,null,null,'知道了','#0059ED')
  },

  jumpMemberDetail: function () {
    var params = "FundManagerCode=" + this.data.arrayData.fund_info.data.FundManagerCode
    wx.navigateTo({
      url: '../memberDetail/memberDetail?' + params
    })
  },

  jumpList: function (e) {

//    type = 1 只传行业
    var type = e.currentTarget.dataset.type

    var params = ''
    var data = this.data.arrayData.fund_info.data
    if (type == 1) {
      params = "FundTypeCode=" + data.FundTypeCode + "&FundType=" + data.FundType
    } else {
      params = "FundTypeCode=" + data.FundTypeCode + "&FundType=" + data.FundType + "&FundInvestmentCode=" + data.FundInvestmentCode + "&FundInvestmentType=" + data.FundInvestmentType
    }
     
    wx.navigateTo({
      url: '../list/list?' + params
    })
  },

  jumpIndexList: function () {
    wx.navigateTo({
      url: '../indexList/indexList'
    })
  },

  newsClick: function (e) {
    var relatedinfoid = e.currentTarget.dataset.relatedinfoid
    var params = "relatedinfoid=" + relatedinfoid
    wx.navigateTo({
      url: '../news/news?' + params
    })
  },

  randFace: function () {
    var i = Math.floor(Math.random() * 10)
    var face = '../../resource/image/face/head-thum-mask' + i + '.jpg'
    this.setData({
      face:face
    })
    PublicUserdefault.setFace(face)
  }

})
