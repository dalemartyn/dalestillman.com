(function() {

  var body = document.body;

  document.addEventListener('keydown', function(event) {
    if (event.keyCode === 68) {
      body.classList.toggle('dark');
    }
  });

})();
