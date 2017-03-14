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
      var css = 'body{background-color:#212b31;color:#fff}figcaption{background:#2b3940;color:rgba(255,255,255,0.5)}code{background:#2b3940}blockquote{border-color:rgba(255,255,255,0.4)}.highlight{background:#2b3940;color:#eceff1}.post-meta{color:rgba(255,255,255,0.5)}.site-title-link{color:#fff}.site-nav a{color:rgba(255,255,255,0.7)}.post-link{color:rgba(255,255,255,0.5)}.star-logo__circle{fill:rgba(255,255,255,0.4)}.star-logo__star{fill:#212b31}';
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
