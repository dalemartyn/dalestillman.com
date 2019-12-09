(function() {

  var switched = useState();
  var darkThemeOS = matchMedia('(prefers-color-scheme: dark)');
  var button

  function toggle() {
    switched = !switched;
    setState(switched);
    switchTheme();
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

  function switchTheme() {
    document.documentElement.classList.add('is-transitioning');
    requestAnimationFrame(function () {
      requestAnimationFrame(function() {
        updateTheme();
        setTimeout(function() {
          document.documentElement.classList.remove('is-transitioning');
        }, 250);
      })
    })
  }

  function updateHtmlClass(isDark) {
    document.documentElement.classList.toggle('t-dark', isDark);
  }

  function updateHtmlClasses(isDark) {
    var root = document.documentElement;
    root.classList.add('is-transitioning');

    requestAnimationFrame(function () {
      requestAnimationFrame(function() {
        root.classList.toggle('t-dark', isDark);
      })
    })
  }

  function updateMetaTag(isDark) {
    var color = isDark ? '#212c31' : "fff";
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
