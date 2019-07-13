(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  var recalc = function () {
    var clientWidth = docEl.clientWidth
    if (!clientWidth) return;
    var remFull = 3.75
    var size = clientWidth / (remFull * 100) * 100

    docEl.style.fontSize = size + 'px'

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
          docEl.style.fontSize = size * (clientWidth / eDivWidth) + 'px'
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
