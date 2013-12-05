window.app = window.app || {};

app.common = (function($, undefined) {

  var _initialize = function() {
    this.fixDrupaljQuery();
    this.svgFallback();
  };

  var _fixDrupaljQuery = function() {
    jQuery.browser = jQuery.browser || {msie: navigator.userAgent.match(/msie/i) ? true : false};
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
    fixDrupaljQuery: _fixDrupaljQuery,
    toggleSubmenu: _toggleSubmenu,
    svgFallback: _svgFallback,
    finalize: _finalize
  };

})(jQuery);
