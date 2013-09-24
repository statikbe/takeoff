define(['jquery'], function($) {
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
  };

  var _finalize = function() {
    // console.log('common finalize');
  };

  return {
    init: _initialize,
    toggleSubmenu: _toggleSubmenu,
    finalize: _finalize
  };
});
