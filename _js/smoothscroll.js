(function() {
  var workLink = document.querySelector('a[href="/#work"]');

  workLink.addEventListener('click', function scrollToWork(e) {
    var work = document.querySelector('#work');
    var clientRects = work.getBoundingClientRect();
    window.scroll({
      top: clientRects.top,
      behavior: 'smooth'
    });

    e.preventDefault();
  });
})();
