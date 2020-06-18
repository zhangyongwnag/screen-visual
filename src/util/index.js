/**
 * @description requestAnimationFrame帧动画执行方案代替setInterval
 */

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (cb) {
      window.setTimeout(cb, 1000 / 60)
    }
})(window)


/**
 * @description 清除requestAnimationFrame帧动画
 */

window.cancelAnimFrame = (function () {
  return window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    window.mozCancelAnimationFrame ||
    window.oRancelAnimationFrame ||
    window.msCancelAnimationFrame ||
    clearTimeout
})(window)

/**
 * @description 函数防抖
 * @param {Function} fn : 要处理的函数方法
 * @param {Number} delay : 延迟执行的时间
 */

export function debounce(fn,delay = 2000) {
  let args = Array.prototype.slice.call(arguments, 1)
  clearTimeout(fn.timer)
  fn.timer = setTimeout(() => {
    fn.call(this,args)
  },delay)
}
