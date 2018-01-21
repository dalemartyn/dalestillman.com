(function() {

  var darkmode = {
    init: function() {
      var isDark = this.loadState();
      if (isDark === true) {
        this.turnOn();
      }
      this.addListener();
    },
    toggle: function() {
      if (this.isDark) {
        this.turnOff();
      } else {
        this.turnOn();
      }
    },
    turnOn: function() {
      document.documentElement.classList.add('t-dark');
      this.saveState(true);
    },
    turnOff: function() {
      document.documentElement.classList.remove('t-dark');
      this.saveState(false);
    },
    saveState: function(isDark) {
      this.isDark = isDark;
      sessionStorage.setItem('darkmode', isDark);
    },
    loadState: function() {
      var isDarkStr = sessionStorage.getItem('darkmode');
      var isDark = isDarkStr === 'true' ? true: false;
      this.isDark = isDark;
      return isDark;
    },
    addListener: function() {
      document.addEventListener('keydown', function(event) {
        if (event.keyCode === 68) {
          darkmode.toggle();
        }
      });

      var that = this;

      document.addEventListener('DOMContentLoaded', function (event) {
        document.querySelector('.icon').addEventListener('click', darkmode.toggle.bind(that));
      });
    }
  };

  darkmode.init();

})();
