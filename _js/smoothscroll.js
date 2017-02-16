(function() {
  var workLink = document.querySelector('a[href="/#work"]');

  workLink.addEventListener('click', function scrollToWork() {
    document.querySelector('#work').scrollIntoView({ behavior: 'smooth' });
  });
})();
