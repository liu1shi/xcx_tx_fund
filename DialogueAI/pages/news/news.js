//index.js
//获取应用实例
// const app = getApp()

var SendReq = require('../../public/network/sendreq.js')
var PublicUserdefault = require('../../public/method/publicUserdefault.js')

var code

Page({

  data: {
    resData:[],
    content:'',
    type: 0,
    EntityName: '',
    entityResData: '',
    Resume: '',
    face: ''
  },

  onLoad: function (options) {

    this.setData({
      face: PublicUserdefault.getFace()
    })

    var params = {
      RelatedInfoID: options.relatedinfoid
    }

    var that = this
    SendReq.kgraphInformation(params,function (res) {
      var html = that.split(res.data.data.data.RelatedContent)
      that.setData({
        resData: res.data.data.data,
        content: html
      })
    })
  },

  onShow: function () {

  },

  split: function (e) {
    var e1 = '&emsp;&emsp;' + e
    var e2 = e1.replace(/\\n/g,'\n&emsp;&emsp;')
    var e3 = e2.split(/<(.+?)>/)
    return e3
  },

  // replace: function (e) {
  //   var e1 = e.replace(/<(.+?),(.+?)>/g,'<text class="c-0059ED" data-value1="$1" data-value2="$2" bindtap="click">$1</text>')
  //   var e2 = '&emsp;&emsp;' + e1
  //   // var e3 = e2.replace(/\\n/g,'<p></p>&emsp;&emsp;')
  //   return e2
  // },

  richClick: function (e) {
    var item = e.currentTarget.dataset.item

    var type = 0
    var EntityName = ''
    var TypeCode = ''

    if (item.indexOf(',01') != -1) {
      var arr = item.split(',01_')
      type = 1
      EntityName = arr[0]
      TypeCode = '01_' + arr[1]
    } else if (item.indexOf(',02') != -1) {
      var arr = item.split(',02_')
      type = 2
      EntityName = arr[0]
      TypeCode = '02_' + arr[1]

      code = arr[1]

    }  else if (item.indexOf(',03') != -1) {
      var arr = item.split(',03_')
      type = 3
      EntityName = arr[0]
      TypeCode = '03_' + arr[1]

      code = 'industry_' + arr[1]

      this.setData({
        EntityName: EntityName
      })

    }  else if (item.indexOf(',04') != -1) {
      var arr = item.split(',04_')
      type = 4
      EntityName = arr[0]
      TypeCode = '04_' + arr[1]

      this.setData({
        EntityName: EntityName
      })

    }  else if (item.indexOf(',05') != -1) {
      var arr = item.split(',05')
      type = 5
      EntityName = arr[0]
      TypeCode = '05'
      this.setData({
        EntityName: EntityName
      })
    } else if (item.indexOf(',06') != -1) {
      var arr = item.split(',06')
      type = 4
      EntityName = arr[0]
      TypeCode = '06'
      this.setData({
        EntityName: EntityName
      })
    }

    var params = {
      EntityName: EntityName,
      TypeCode: TypeCode
    }

    var that = this
    SendReq.kgraphInformation_entity(params,function (res) {

      that.setData({
        entityResData: res.data.data.data,
        type: type
      })

      if (type == 2) {
          var Resume = res.data.data.data.Resume.slice(0,35) + '...'
          that.setData({
            Resume: Resume
          })
      }
    })

  },

  checkMore: function (e) {
    var type = e.currentTarget.dataset.type
  },

  hideMod: function () {
    this.setData({
      type: 0
    })
  },

  jumpDetail: function() {
    var params = "FundCode=" + this.data.entityResData.FundCode + "&Fund300Index=" + this.data.entityResData.Fund300Index

    wx.navigateTo({
      url: '../detail/detail?' + params
    })
  },

  jumpList: function () {
    var params = "FundTypeCode=" + code + "&FundType=" + this.data.EntityName
    wx.navigateTo({
      url: '../list/list?' + params
    })
  },

  jumpMemberDetail: function () {
    var params = "FundManagerCode=" + code
    wx.navigateTo({
      url: '../memberDetail/memberDetail?' + params
    })
  }


})
