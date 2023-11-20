/*
* 在 head 中引入即可，记得修改下面的全屏适配比例
*
* */

(function (doc, win) {
  var remFull = 7.5 // 7.5rem全屏
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return;

    var fontSize = clientWidth / remFull
    docEl.style.fontSize = fontSize + 'px'

    var eDivWidth = 0
    var eDiv = document.createElement('div')

    eDiv.style.width = remFull + 'rem'
    eDiv.style.height = '1px'
    eDiv.style.position = 'fixed'
    eDiv.style.boxSizing = 'border-box'
    document.body.appendChild(eDiv)
    eDivWidth = eDiv.clientWidth

    if (clientWidth !== eDivWidth) {
      var timer = setInterval((function () {
        clientWidth = docEl.clientWidth
        eDivWidth = eDiv.clientWidth

        if (clientWidth !== eDivWidth) {
          docEl.style.fontSize = fontSize * (clientWidth / eDivWidth) + 'px'
        } else {
          clearInterval(timer)
          document.body.removeChild(eDiv)
        }
        return arguments.callee
      })(), 100)
    } else {
      document.body.removeChild(eDiv)
    }
  };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window);
