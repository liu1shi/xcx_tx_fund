var  StaticString = require('staticString.js')


//判断是否登录
var setIsLogin = function (value) {
  wx.setStorageSync(StaticString.isLogin, value)
}

var getIsLogin = function () {
  return wx.getStorageSync(StaticString.isLogin)
}

//存取cookie
var setCookie = function (value) {
  wx.setStorageSync(StaticString.cookieStr, value)
}

var getCookie = function () {
  return wx.getStorageSync(StaticString.cookieStr)
}


module.exports = {
  setIsLogin: setIsLogin,
  getIsLogin: getIsLogin,
  setCookie: setCookie,
  getCookie: getCookie
}
