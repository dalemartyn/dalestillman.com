(function() {

  var darkmode = {
    init: function() {
      var isDark = this.loadState();
      if (isDark === true) {
        this.add();
      }
      this.addListener();
    },
    toggle: function() {
      if (this.isDark) {
        this.remove();
      } else {
        this.add();
      }
    },
    create: function() {
      var css = '<!-- css -->';
      var ss = document.createElement('style');
      ss.appendChild(document.createTextNode(css));
      this.ss = ss;
    },
    add: function() {
      if (!this.ss) {
        this.create();
      }
      document.head.appendChild(this.ss);
      this.saveState(true);
    },
    remove: function() {
      this.ss.remove();
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
    }
  };

  darkmode.init();

})();
