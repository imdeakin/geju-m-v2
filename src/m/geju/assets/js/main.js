// 移动端rem单位适配
(function () {
  window.onload = function () {
    new flexible(750, 100)
  };

  window.onresize = function () {
    new flexible(750, 100)
  };
})();
