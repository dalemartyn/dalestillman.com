(function() {

  var switched = useState();
  var dark = matchMedia('(prefers-color-scheme: dark)');

  function toggle() {
    switched = !switched;
    setState(switched);
    updateTheme(switched);
  }


  function updateTheme() {
    if (dark.matches && !switched || !dark.matches && switched) {
      document.documentElement.classList.add('t-dark');
      theme.setAttribute('content', '#263238');
    } else {
      document.documentElement.classList.remove('t-dark');
      theme.setAttribute('content', '#fff');
    }
  }


  function setState(switched) {
    sessionStorage.setItem('darkmode', switched);
  }


  function useState() {
    var val = sessionStorage.getItem('darkmode');
    return val === 'true';
  }


  function addListeners() {
    document.addEventListener('keydown', function(event) {
      if (event.keyCode === 68) {
        toggle();
      }
    });

    document.addEventListener('DOMContentLoaded', function (event) {
      document.querySelector('.js-theme-toggle').addEventListener('click', toggle);
    });

    dark.addListener(function() {
      switched = false;
      setState(switched);
      updateTheme();
    });
  }


  updateTheme();
  addListeners();

})();
