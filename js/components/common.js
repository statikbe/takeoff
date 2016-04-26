window.app = window.app || {};

window.resUTILS = window.resUTILS || {};
window.resUTILS.getResponsiveTag = function(el, pseudoElement) {
  if (window.getComputedStyle) {
    // Get responsive tag
    if (!el) { el = document.body; }
    var tag = window.getComputedStyle(el,':' + pseudoElement).getPropertyValue('content') || '';
    tag = tag.replace( /'/g,'');
    tag = tag.replace( /"/g,''); // Firefox bugfix
    var tagPair = tag.split(' ');
    return tagPair;
  }
};

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
      windowHeight: $window.height(),
      isFlyoutActive: window.getComputedStyle(document.body, ':before').getPropertyValue('content').indexOf('flyout') > -1
    });
  };

  var _flyoutNavigation = function() {
    $('.js-flyout-toggle').flyoutNav();
    $window.on('resize', debounce(disableFlyout, 250, false));
    function disableFlyout() {
      if (!app.variables.isFlyoutActive) {
        $body.removeClass('flyout-active');
      }
    }
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
  //   mapStyle: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#444444"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#dbdbdb"},{"visibility":"on"}]}],
  //   mapOptions: {
  //     zoom: 16,
  //     scrollwheel: false,
  //     draggable: Modernizr.touch ? false : true
  //   },
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
  //     var latlng = this.$map.data('latlng'),
  //         points = this.$map.data('points-obj');
  //     if(latlng) {
  //       this.showPoint(latlng);
  //     } else if (points) {
  //       this.showPoints(window[points]);
  //     }
  //   },
  //   showPoint: function(latlng) {
  //     var myLatLng = new google.maps.LatLng(latlng.split(',')[0], latlng.split(',')[1]);
  //     var map = new google.maps.Map(this.$map[0], this.mapOptions);

  //     map.setOptions({styles: this.mapStyle});

  //     // var image = '/img/marker.png';
  //     var beachMarker = new google.maps.Marker({
  //         position: myLatLng,
  //         map: map
  //         // ,
  //         // icon: image
  //     });

  //     map.setCenter(myLatLng);

  //     google.maps.event.addDomListener(window, 'resize', function() {
  //       map.setCenter(myLatLng);
  //     });
  //   },
  //   showPoints: function(points) {
  //     // Set the map
  //     var markers = [],
  //         map = new google.maps.Map(this.$map[0], this.mapOptions),
  //         bounds = new google.maps.LatLngBounds(),
  //         infowindow = new google.maps.InfoWindow({
  //           content: "loading..."
  //         });

  //     map.setOptions({styles: this.mapStyle});

  //     var i = 0;
  //     while(points[i]) {
  //         var tmpMarker = points[i],
  //             tmpLatLng = new google.maps.LatLng(tmpMarker.lat, tmpMarker.lng),
  //             image = {};

  //         if(tmpMarker.marker) {
  //           image = {
  //             url: tmpMarker.marker,
  //             size: new google.maps.Size(55, 57),
  //             origin: new google.maps.Point(0,0),
  //             anchor: new google.maps.Point(12, 29)
  //           };
  //         }

  //         var marker = new google.maps.Marker({
  //           position: tmpLatLng,
  //           map: map,
  //           title: tmpMarker.title,
  //           city: '<strong>' + tmpMarker.cityLabel + '</strong>' + ' ' + tmpMarker.city,
  //           number: '<strong>' + tmpMarker.numberLabel + '</strong>' + ' ' + tmpMarker.number,
  //           project: tmpMarker,
  //           lat: tmpMarker.lat,
  //           lng: tmpMarker.lng,
  //           icon: image
  //         });

  //         marker.id = i;
  //         markers.push(marker);
  //         bounds.extend(tmpLatLng);

  //         google.maps.event.addListener(marker, 'click', showMarker);
  //         i++;
  //     }
  //     $document.on('click', '.popup__close', function(e) {
  //       e.preventDefault();
  //       infowindow.close();
  //     });
  //     function showMarker() {
  //       infowindow.setContent('<div class="map__popup">' +
  //         '<div class="popup__header popup__header--' + this.project.phase + ' clearfix">' +
  //           '<a href="' + this.project.url + '" class="popup__link grid__10">' +
  //             '<h5 class="popup__title">' + this.title + '</h5>' +
  //           '</a>' +
  //           '<a href="https://www.google.be/maps/dir/current+location/' + this.lat + ',' + this.lng + '/" target="_blank" class="popup__link popup__link--directions">' +
  //             '<i class="icon icon--location-arrow"></i>' +
  //           '</a>' +
  //         '</div>' +
  //         '<div class="popup__content">' +
  //           '<a href="#" class="popup__close">&times;</a>' +
  //           '<ul class="list--reset">' +
  //             '<li>' + this.city + '</li>' +
  //             '<li>' + this.number + '</li>' +
  //           '</ul>' +
  //         '</div>' +
  //       '</div>');

  //       infowindow.open(map, this);

  //       var iw = $('.gm-style-iw');
  //       iw.attr('style', '');
  //       iw.children('div').css({'display': 'block'});
  //       iw.prev().css({'display': 'none'});
  //       iw.next().css({'display': 'none'});
  //     }
  //
  //     // Don't zoom in too far on only one marker
  //     if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
  //       var extendPoint1 = new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01);
  //       var extendPoint2 = new google.maps.LatLng(bounds.getNorthEast().lat() - 0.01, bounds.getNorthEast().lng() - 0.01);
  //       bounds.extend(extendPoint1);
  //       bounds.extend(extendPoint2);
  //     }
  //     map.fitBounds(bounds);
  //
  //     map.setZoom((map.getZoom()-1));
  //     google.maps.event.addDomListener(window, 'resize', function() {
  //       map.fitBounds(bounds);
  //     });
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
