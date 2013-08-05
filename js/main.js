window.app = (function($, undefined) {
  return {
    fire : function(func, funcname, args){
      funcname = (funcname === undefined) ? 'init' : funcname;

      if (func !== '' && app[func] && typeof app[func][funcname] == 'function') {
        app[func][funcname](args);
      }
    },

    init: function() {
      var component = $('body').data('component');

      // hit up common first.
      app.fire('common');

      // Hit up the page component
      if(component) {
        app.fire(component);
      }

      // Fire the finalize function for common
      app.fire('common','finalize');
    },

    common: (function () {
      var _initialize = function() {
        // console.log('common init');
        this.toggleSubmenu();
      };

      var _toggleSubmenu = function() {
        var $link = $('.toggle-menu'),
            $submenu = $('[class*=pane-menu-sidebar]'),
            $mainitems = $('span', $submenu);

        $link.on('click', function(e) {
          e.preventDefault();
          $submenu.toggle();
        });

        $mainitems.on('click', function(e) {
          e.preventDefault();
          $(this).next('ul').toggle();
        });
      }

      var _finalize = function() {
        // console.log('common finalize');
      };

      return {
        init: _initialize,
        toggleSubmenu: _toggleSubmenu,
        finalize: _finalize
      };
    }()) // END OF COMMON

  };
})(jQuery);


$(document).ready(function() {
  app.init();
});
