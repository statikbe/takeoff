window.app = window.app || {};

app.common = (function($, undefined) {
  var $document = $(document),
      $window = $(window),
      $html = $('html'),
      $body = $('body');

  var _initialize = function() {
    // First set window size
    this.windowResize();
    $window.on('resize', debounce(app.common.windowResize, 250, false));

    this.svgFallback();

    // this.googleMaps.init();
    // _gallery();
    _flyoutNavigation();
  };

  var _windowResize = function() {
    $.extend(app.variables, {
      windowWidth: $window.width(),
      windowHeight: $window.height()
    });
  };

  var _flyoutNavigation = function() {
    $('#toggle-flyout-nav').flyoutNav({
      back: function() {
        return '<span class="icon -previous"></span> Terug';
      }
    });
  };

  var _gallery = function() {
    $('.colorbox').colorbox({
      close: '&times;',
      next: '&rsaquo;',
      previous: '&lsaquo;',
      maxWidth: '90%',
      maxHeight: '90%'
    });

    $('.colorbox--video').colorbox({
      close: '&times;',
      next: '&rsaquo;',
      previous: '&lsaquo;',
      maxWidth: '90%',
      maxHeight: '90%',
      iframe: true,
      innerWidth: 640,
      innerHeight: 480
    });
  };

  var _svgFallback = function() {
    if (!Modernizr.svg) {
      var $html = $('html'),
          $imgs = $('img[src$=".svg"]');

      $imgs.each(function(k,v){
        var $img = $(v),
            fallback = $img.attr('data-url'),
            width = $img.attr('width'),
            height = $img.attr('height');

        $img.attr('src', fallback);
        // IE8 fix
        if ($html.hasClass('lt-ie9')) {
          $img.parent('a').css({ 'width' : width , 'height' : height });
        }
      });
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
  };

  // var _googleMaps = {
  //   $map: $('#map-canvas'),
  //   init: function() {
  //     if(this.$map.length) {
  //       if(typeof google !== 'undefined') {
  //         app.common.googleMaps.loadMap();
  //       } else {
  //         app.common.googleMaps.loadScript();
  //       }
  //     }
  //   },
  //   loadScript: function() {
  //     var script = document.createElement('script');
  //     script.type = 'text/javascript';
  //     script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp' +
  //         '&key=AIzaSyA90nWScunrXckdU368WTPvJ6bZWJLT81c&callback=app.common.googleMaps.loadMap';
  //     document.body.appendChild(script);
  //   },
  //   loadMap: function() {
  //     var latlng = this.$map.data('latlng');
  //     if(latlng) {
  //       var myLatLng = new google.maps.LatLng(latlng.split(',')[0], latlng.split(',')[1]),
  //         mapOptions = {
  //           zoom: 16,
  //           scrollwheel: false,
  //           draggable: false,
  //           center: myLatLng
  //         };

  //       var map = new google.maps.Map(this.$map[0], mapOptions);

  //       // var image = '/img/marker.png';
  //       var beachMarker = new google.maps.Marker({
  //           position: myLatLng,
  //           map: map
  //           // ,
  //           // icon: image
  //       });

  //       google.maps.event.addDomListener(window, 'resize', function() {
  //         map.setCenter(myLatLng);
  //       });
  //     }
  //   }
  // };

  var _finalize = function() {
    var doneClass = 'js-done';

    $window.on('load', function(){
      $html.addClass(doneClass);
    });
    function delayedJS() {
      if(!$html.hasClass(doneClass)) {
        $html.addClass(doneClass);
      }
    }
    window.setTimeout(delayedJS, 4000);
  };

  return {
    init: _initialize,
    windowResize: _windowResize,
    toggleSubmenu: _toggleSubmenu,
    svgFallback: _svgFallback,
    // googleMaps: _googleMaps,
    finalize: _finalize
  };

})(jQuery);

// Helper functions for common.js
window.debounce = function(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};
