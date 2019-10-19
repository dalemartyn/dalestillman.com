(function() {

  var switched = useState();
  var darkThemeOS = matchMedia('(prefers-color-scheme: dark)');
  var button

  function toggle() {
    switched = !switched;
    setState(switched);
    updateTheme(switched);
  }

  function isDarkTheme() {
    return (darkThemeOS.matches && !switched || !darkThemeOS.matches && switched);
  }

  function updateTheme() {
    var isDark = isDarkTheme();
    updateHtmlClass(isDark);
    updateMetaTag(isDark);
    updateButton(isDark);
  }

  function updateHtmlClass(isDark) {
    document.documentElement.classList.toggle('t-dark', isDark);
  }

  function updateMetaTag(isDark) {
    var color = isDark ? '#263238' : "fff";
    theme.setAttribute('content', color);
  }

  function updateButton(isDark) {
    if (button) {
      button.setAttribute('aria-checked', isDark);
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

    document.addEventListener('DOMContentLoaded', function(event) {
      button = document.querySelector('.js-theme-toggle');
      button.addEventListener('click', toggle);
      updateButton(isDarkTheme());
    });

    darkThemeOS.addListener(function() {
      switched = false;
      setState(switched);
      updateTheme();
    });
  }

  updateTheme();
  addListeners();

})();
