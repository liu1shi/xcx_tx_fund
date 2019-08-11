var PublicMethod = require('../method/publicMethod.js')
var PublicUserdefault = require('../method/publicUserdefault.js')
var StaticString = require('../method/staticString.js')
var HmacSHA256 = require('../method/crypto/hmac-sha256.js')
var Hex = require('../method/crypto/enc-hex.js')

/* url,
params,
hudTit,
isShowHud,
failTit,
isShowFail,
isOnlySuccess,
success,成功回调
fail 失败回调
*/
function sendReq (url,params,type,hudTit,isShowHud,failTit,isShowFail,isOnlySuccess,success,fail) {

  if (isShowHud) {
      PublicMethod.showHud(hudTit);
  }

  params = params || {};
  if (type == 'GET') {
    url = url + '?' + serializeData(params)
    params = {}
  }

  PublicUserdefault.getCookie() && (header['Cookie'] = PublicUserdefault.getCookie())

  var that = this

  wx.request({
      url: url,
      method:type,
      data:params,
      success: function(res) {
        PublicMethod.hideHud();
        if (res.data.code) {
          // if (res.data.code == 130001) {
          //     PublicMethod.alert(null,res.data.message,false,null,null,null,null,function () {
          //       //跳转到登录界面
          //       // PublicMethod.jumpLogin()
          //       //登录态失效重新登录
          //       that.sendLoginReq()
          //     })
          // } else {
            if (isShowFail) {
              if (failTit) {
                PublicMethod.showText(failTit)
              } else {
                PublicMethod.showText(res.data.message || '网络超时，请重试')
              }
            }
          // }
        } else if (typeof(res.data.code) == 'undefined') {
          PublicMethod.showText(res.statusCode.toString() || '网络超时，请重试')
        }

        if (isOnlySuccess) {
          if (res.data.code == 0) {
            if (success) {
              success(res);
            }
          }
        } else {
            if (success) {
              success(res);
            }
        }
      },
      fail:function (res) {
          PublicMethod.hideHud();
          if (isShowFail) {
            if (failTit) {
              PublicMethod.showText(failTit)
            } else {
              PublicMethod.showText('网络请求失败!')
            }
          }
          if (fail) {
            fail(res);
          }
      }
    })
}

function serializeData (json) {
    // http://www.bubuko.com/infodetail-1851661.html
  var arr = []
  for(var p in json){
    arr.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]))
  }
  return arr.join("&")
}

// 简版发送POST网络请求，不显示Hud，失败后提示，只返回成功的数据
function baseSendReq (url,params,success) {
  this.sendReq(url,params,"POST",null,false,null,true,true,success)
}


//发送登录请求
function sendLoginReq (success) {
      var that = this
      wx.login({
        success (res) {
          if (res.code) {
            //发起网络请求
            var params = {
              code:res.code
            }
            that.sendReq(StaticString.mainUrl + '/wx_app/login',params,"POST",null,true,null,true,true,function (resSub) {
              if (success) {
                success(resSub)
              }
            })
          } else {
            PublicMethod.showText('登录失败！' + res.errMsg)
          }
        }
      })
}

module.exports = {
  sendReq: sendReq,
  baseSendReq: baseSendReq,
  sendLoginReq: sendLoginReq
}
