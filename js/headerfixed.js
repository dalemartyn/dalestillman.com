(function() {

  var $header = document.getElementById('site-header');
  var BAR_HEIGHT = $header.getBoundingClientRect().height - 64;

  var lastScrollTop = 0;
  var isAtTop = true;

  function scrollHandler(e) {
    var scrollTop = window.pageYOffset;

    // scrolled to the top
    if (!isAtTop && scrollTop === 0) {
      $header.classList.add('top');
      isAtTop = true;
    }

    // scrolled away from the top
    if (isAtTop && scrollTop !== 0) {
      $header.classList.remove('top');
      isAtTop = false;
    }

    lastScrollTop = scrollTop;
  }

  window.addEventListener('scroll', scrollHandler);

  scrollHandler();

})();
