
/*
icon选择success、loading、none，
image优先级大于icon,
complete 结束的回调
*/
function showHudText(title,icon,image,duration) {
  wx.showToast({
    title: title?title:'',
    icon: icon,
    image:image,
    duration: duration
  })
}

//只显示文字3秒
function showText(title) {
  this.showHudText(title,"none",null,3000);
}

//显示loading 60秒
function showHud(title) {
  this.showHudText(title,"loading",null,60000);
}

function hideHud(argument) {
  wx.hideToast();
}


//isShowCancel  默认显示'取消'
function alert(title,content,isShowCancel,cancelText,cancelColor,confirmText,confirmColor,success,fail) {
  wx.showModal({
    title: title?title:'',
    content: content?content:'',
    showCancel: isShowCancel,
    cancelText: cancelText?cancelText:"取消",
    cancelColor: cancelColor?cancelColor:"#000000",
    confirmText: confirmText?confirmText:"确定",
    confirmColor: confirmColor?confirmColor:"#000000",
    success: function(res) {
      if (res.confirm) {
        if (success) {
          success();
        }
      } else if (res.cancel) {
        if (fail) {
          fail();
        }
      }
    }
  })
}

//基本弹框  包含取消 和 确定两个按钮
function baseAlert(title,content,success,fail) {
  this.alert(title,content,true,null,null,null,null,success,fail)
}


//将时间戳转化为00：00：00形式的时间  isMillisecond 是否毫秒
function timeisMillisecond(timeNum,isMillisecond) {
  var timeNum = parseInt(timeNum)
  if (isMillisecond) {
      var seconds = timeNum / 1000 % 60
      seconds = Math.floor(seconds)
      var minutes = (timeNum / 1000 / 60) % 60
      minutes = Math.floor(minutes)
      var hours = timeNum / 1000 / 3600
      hours = Math.floor(hours)
      return [hours, minutes, seconds].map(formatNumber).join(':')
  } else {
      var seconds = timeNum % 60
      seconds = Math.floor(seconds)
      var minutes = (timeNum / 60) % 60
      minutes = Math.floor(minutes)
      var hours = timeNum / 3600
      hours = Math.floor(hours)
      return [hours, minutes, seconds].map(formatNumber).join(':')
 }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function jumpLogin () {
  var pages = getCurrentPages()
  var curpage = pages[pages.length - 1]
  if (curpage.route != "pages/Login/LoginVC/LoginVC") {
    wx.navigateTo({
      url: '../../Login/LoginVC/LoginVC'
    })
  }
}

module.exports = {
  showHudText: showHudText,
  showText: showText,
  showHud: showHud,
  hideHud: hideHud,
  alert: alert,
  baseAlert: baseAlert,
  timeisMillisecond: timeisMillisecond,
  jumpLogin: jumpLogin
}
