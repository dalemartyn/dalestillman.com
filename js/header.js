(function() {

  var $header = document.getElementById('site-header');
  var BAR_HEIGHT = $header.getBoundingClientRect().height - 64;

  var lastScrollTop = 0;
  var isShown = true;
  var topOfBar = 0;
  var isAnchored = true;

  function scrollHandler(e) {
    var scrollTop = window.pageYOffset;

    var isScrollingUp = scrollTop < lastScrollTop;
    var scale = window.outerWidth / window.innerWidth;

    // show bar if start scrolling up
    if (!isShown && isScrollingUp) {
      console.log('making visible');
      translateY(scrollTop - BAR_HEIGHT);
      $header.classList.remove('invisible');
      isShown = true;
      topOfBar = scrollTop - BAR_HEIGHT;
    }

    if (isShown) {

      // we have scrolled past the bar height, so fix it to top
      if (isAnchored && (topOfBar - scrollTop >= 0)) {
        console.log('fixing to viewport');
        $header.classList.add('fixed');
        translateY(0);
        isAnchored = false;
      }

      // we have started scrolling down, start scrolling the bar off screen
      else if (!isAnchored && !isScrollingUp) {
        console.log('anchoring to page');
        $header.classList.remove('fixed');

        // original behaviour
        // topOfBar = scrollTop;
        // translateY(scrollTop);

        // new behaviour
        topOfBar = lastScrollTop;
        translateY(lastScrollTop);
        isAnchored = true;
      }

      // we have scrolled to the top
      if (!isAnchored && scrollTop === 0) {
        console.log('at the top');
        $header.classList.add('top');
      }

      // scrolled offscreen, so hide bar
      if (isAnchored && topOfBar + BAR_HEIGHT < scrollTop) {
        console.log('scrolled off page, setting invisible');
        $header.classList.add('invisible');
        isShown = false;
      }
    }

    lastScrollTop = scrollTop;
  }

  function translateY(y) {
    $header.style.transform = 'translate3d(0, ' + y + 'px, 0)';
    if (y !== 0) {
      $header.classList.remove('top');
    }
  }

  window.addEventListener('scroll', scrollHandler);
  window.addEventListener('resize', function() {
    console.log('resize');
  });

  scrollHandler();

})();
