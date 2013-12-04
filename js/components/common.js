window.app = window.app || {};

app.common = (function($, undefined) {

  var _initialize = function() {
    // console.log('common init');
    this.toggleSubmenu();
    this.svgFallback();
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
  };

  var _svgFallback = function() {
    if (!Modernizr.svg) {
      var $html = $('html'),
          $img = $('img[src$=".svg"]'),
          fallback = $img.attr('data-url'),
          width = $img.attr('width');
          height = $img.attr('height');

      $img.attr('src', fallback);
      // IE8 fix
      if ($html.hasClass('lt-ie9')) {
        $img.parent('a').css({ 'width' : width , 'height' : height });
      }
    }
  };

  var _finalize = function() {
    // console.log('common finalize');
  };

  return {
    init: _initialize,
    toggleSubmenu: _toggleSubmenu,
    svgFallback: _svgFallback,
    finalize: _finalize
  };

})(jQuery);
