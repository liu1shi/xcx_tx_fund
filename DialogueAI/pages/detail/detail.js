//index.js
//获取应用实例
// const app = getApp()

var SendReq = require('../../public/network/sendreq.js')
var PublicMethod = require('../../public/method/publicMethod.js')


var lsyjArr,yjphArr

Page({

  data: {
    preData: {},
    arrayData: {},
    lsyjData: [],
    yjphData: [],
    jqjzData: [],
    isLsyj: true,
    isLsyjMore: false,
    isyjphMore: false,
    isJqjzMore: false,
    messageData: []
  },

  onLoad: function (options) {

    this.setData({
      preData: JSON.parse(options.preData)
    })

    var params = {
      "FundCode": this.data.preData.FundCode,
      "FundManagerCode": this.data.preData.FundManagerCode
    }

    if (this.data.preData.Fund300Index == 1) {
      var that = this
      SendReq.kgraphEnhanced_index_funds(params,function (res) {
        that.fundRes(res)
      })
    } else if (this.data.preData.Fund300Index == 2) {
      var that = this
      SendReq.kgraphIndex_funds(params,function (res) {
        that.fundRes(res)
      })
    } else if (this.data.preData.Fund300Index == 0) {
      var that = this
      SendReq.kgraphType_funds(params,function (res) {
          that.fundRes(res)
      })
    }

  },


  fundRes: function (res) {
      var lsyjJson = res.data.data.fund_performance.data
      var yjphJson = res.data.data.fund_rank.data
      lsyjArr = [
        {"text":"近1月","value":lsyjJson.FundChangeRate1Month},
        {"text":"近3月","value":lsyjJson.FundChangeRate3Month},
        {"text":"近6月","value":lsyjJson.FundChangeRate6Month},
        {"text":"近1年","value":lsyjJson.FundChangeRate1Year},
        {"text":"近2年","value":lsyjJson.FundChangeRate2Year},
        {"text":"近3年","value":lsyjJson.FundChangeRate3Year},
        {"text":"近5年","value":lsyjJson.FundChangeRate5Year}
      ]
      yjphArr = [
        {"text":"近1月","value": yjphJson.FundRank1Month ? yjphJson.FundRank1Month.rank + '/' + yjphJson.FundRank1Month.total_num : ''},
        {"text":"近3月","value": yjphJson.FundRank3Month ? yjphJson.FundRank3Month.rank + '/' + yjphJson.FundRank3Month.total_num : ''},
        {"text":"近6月","value": yjphJson.FundRank6Month ? yjphJson.FundRank6Month.rank + '/' + yjphJson.FundRank6Month.total_num : ''},
        {"text":"近1年","value": yjphJson.FundRank1Year ? yjphJson.FundRank1Year.rank + '/' + yjphJson.FundRank1Year.total_num : ''},
        {"text":"近2年","value": yjphJson.FundRank2Year ? yjphJson.FundRank2Year.rank + '/' + yjphJson.FundRank2Year.total_num : ''},
        {"text":"近3年","value": yjphJson.FundRank3Year ? yjphJson.FundRank3Year.rank + '/' + yjphJson.FundRank3Year.total_num : ''},
        {"text":"近5年","value": yjphJson.FundRank5Year ? yjphJson.FundRank5Year.rank + '/' + yjphJson.FundRank5Year.total_num : ''}
      ]

      this.setData({
        arrayData: res.data.data,
        lsyjData: lsyjArr.slice(0,5),
        yjphData: yjphArr.slice(0,5),
        jqjzData: res.data.data.fund_valuation.data.ValueList.slice(0,5),
        messageData: res.data.data.fund_related_info_list.data.RelatedInfoList
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
    var params = "FundManagerCode=" + this.data.preData.FundManagerCode
    wx.navigateTo({
      url: '../memberDetail/memberDetail?' + params
    })
  },

  jumpList: function () {
    var params = "FundTypeCode=" + this.data.preData.FundTypeCode + "&FundType=" + this.data.preData.FundType + "&FundInvestmentCode=" + this.data.preData.FundInvestmentCode
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
  }

})
