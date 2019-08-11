var Network = require('network.js')
var StaticString = require('../method/staticString.js')
var PublicUserdefault = require('../method/publicUserdefault.js')

function sendYzmReq (success) {
    //删除 cookie
    PublicUserdefault.setCookie('')
    Network.baseSendReq(StaticString.mainUrl + '/user/showCode',null,function (res) {
    //设置 cookie
    var cookieArr = res.header['Set-Cookie'].split(',')
    var cookie = ''
    for (var i in cookieArr) {
      var cookieStr = cookieArr[i]
      if (cookieStr.indexOf('JSESSIONID') != -1) {
        cookie = cookieStr
      }
    }

    PublicUserdefault.setCookie(cookie)
    if (success) {
      success(res);
    }
  })
}

function sendLoginReq (success) {
  Network.sendLoginReq(function (res) {
    if (success) {
      success(res);
    }
  })
}

//首页展示接口
function kgraphHomepage (success) {
  Network.sendReq(StaticString.mainUrl + '/kgraph/home_page',{apply:true},"GET",null,false,null,true,true,function (res) {
    if (success) {
      success(res)
    }
  })
}

//指数型基金详情接口
function kgraphIndex_funds (params,success) {
  Network.sendReq(StaticString.mainUrl + '/kgraph/index_funds',params,"GET",null,true,null,true,true,function (res) {
    if (success) {
      success(res)
    }
  })
}

//指数增强型基金详情接口
function kgraphEnhanced_index_funds (params,success) {
  Network.sendReq(StaticString.mainUrl + '/kgraph/enhanced_index_funds',params,"GET",null,true,null,true,true,function (res) {
    if (success) {
      success(res)
    }
  })
}

//板块基金详情接口
function kgraphType_funds (params,success) {
  Network.sendReq(StaticString.mainUrl + '/kgraph/type_funds',params,"GET",null,true,null,true,true,function (res) {
    if (success) {
      success(res)
    }
  })
}

//基金经理详情接口
function kgraphFund_managers (params,success) {
  Network.sendReq(StaticString.mainUrl + '/kgraph/fund_managers',params,"GET",null,true,null,true,true,function (res) {
    if (success) {
      success(res)
    }
  })
}

//沪深指数版块排行接口
function kgraphCsi_300_index (success) {
  Network.sendReq(StaticString.mainUrl + '/kgraph/csi_300_index',{apply:true},"GET",null,true,null,true,true,function (res) {
    if (success) {
      success(res)
    }
  })
}

//板块基金排行接口
function kgraphFund_type (params,success) {
  Network.sendReq(StaticString.mainUrl + '/kgraph/fund_type',params,"GET",null,true,null,true,true,function (res) {
    if (success) {
      success(res)
    }
  })
}

//板块基金排行接口
function kgraphInformation (params,success) {
  Network.sendReq(StaticString.mainUrl + '/kgraph/information',params,"GET",null,true,null,true,true,function (res) {
    if (success) {
      success(res)
    }
  })
}
//板块基金排行接口
function kgraphInformation_entity (params,success) {
  Network.sendReq(StaticString.mainUrl + '/kgraph/information_entity',params,"GET",null,true,null,true,true,function (res) {
    if (success) {
      success(res)
    }
  })
}

module.exports = {
  sendYzmReq: sendYzmReq,
  sendLoginReq: sendLoginReq,
  kgraphHomepage: kgraphHomepage,
  kgraphIndex_funds: kgraphIndex_funds,
  kgraphType_funds: kgraphType_funds,
  kgraphEnhanced_index_funds: kgraphEnhanced_index_funds,
  kgraphType_funds: kgraphType_funds,
  kgraphFund_managers: kgraphFund_managers,
  kgraphCsi_300_index: kgraphCsi_300_index,
  kgraphFund_type: kgraphFund_type,
  kgraphInformation: kgraphInformation,
  kgraphInformation_entity: kgraphInformation_entity
}
