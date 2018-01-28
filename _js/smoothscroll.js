(function() {
  var siteTitle = document.querySelector('a[href="/"]');

  siteTitle.addEventListener('click', function scrollToTop(e) {

    window.scroll({
      top: 0,
      behavior: 'smooth'
    });

    e.preventDefault();
  });
})();
