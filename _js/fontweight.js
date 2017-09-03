(function() {

  if (navigator.userAgent.indexOf('Android') > -1) {
    var stylesheet = document.createElement('style');
    stylesheet.appendChild(document.createTextNode(':root{--bold-font-weight: 500;}'));
    document.head.appendChild(stylesheet);
  }

})();
