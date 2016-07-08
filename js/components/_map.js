window.app = window.app || {};

app.map = (function () {

    var mapElement;

    var mapOptions = {
        zoom: 16,
        scrollwheel: false,
        draggable: !Modernizr.touch,
        styles: []
    };

    var _initialize = function () {

        mapElement = document.getElementById('map-canvas');

        if (mapElement) {
            if (typeof google !== 'undefined') {
                this.load();
            } else {
                app.helpers.loadScript('https://maps.googleapis.com/maps/api/js?v=3.exp' +
                    '&key=AIzaSyA90nWScunrXckdU368WTPvJ6bZWJLT81c&callback=app.map.load');
            }
        }
    };

    var _load = function () {

        console.log('loading boys');

        var latlng = mapElement.getAttribute('data-latlng').split(',');
        var points = mapElement.getAttribute('data-points-obj');

        if (latlng) {
            this.renderPoint(latlng[0], latlng[1]);
        } else if (points) {
            this.renderPoints(window[points]);
        }

    };

    var _renderPoint = function (lat, lng) {

        var myLatLng = new google.maps.LatLng(lat, lng);

        var map = new google.maps.Map(mapElement, app.helpers.extend(mapOptions, { center: myLatLng }));

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map
        });

        google.maps.event.addDomListener(window, 'resize', app.helpers.debounce(function () {
            map.setCenter(myLatLng);
        }));

    };

    var _renderPoints = function (points) {

        var markers = [];
        var map = new google.maps.Map(mapElement, mapOptions);
        var bounds = new google.maps.LatLngBounds();
        var infoWindow = new google.maps.infoWindow({
            content: 'Loading…'
        });

        var pointCount = points.length;

        var point;
        var latLng;
        var marker;

        function showInfoWindow() {
            infoWindow.setContent([
                '<div class="excerpt excerpt--infowindow">',
                    '<button class="excerpt__close"></button>',
                    '<div class="excerpt__header">',
                        '<h3 class="excerpt__title">' + this.title + '</h3>',
                    '</div>',
                    '<div class="excerpt__main">',
                        '<p>' + this.teaser + '</p>',
                    '</div>',
                '</div>'
            ].join('\n'));

            infoWindow.open(map, this);
        }

        for (var i = 0; i < pointCount; i++) {
            point = points[i];
            latLng = new google.maps.LatLng(point.lat, point.lng);

            marker = new google.maps.Marker({
                position: latLng,
                map: map,
                lat: tmpMarker.lat,
                lng: tmpMarker.lng,
            });

            marker.id = i;
            markers.push(marker);
            bounds.extend(latLng);

            google.maps.event.addListener(marker, 'click', showInfoWindow);

        }

        if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
            bounds.extend(new google.maps.LatLng(bounds.getNorthEast().lat() + 0.01, bounds.getNorthEast().lng() + 0.01));
            bounds.extend(new google.maps.LatLng(bounds.getSouthWest().lat() - 0.01, bounds.getSouthWest().lng() - 0.01));
        }

        map.fitBounds(bounds);
        map.setZoom(map.getZoom() - 1);

        google.maps.event.addDomListener(window, 'resize', app.helpers.debounce(function () {
            map.fitBounds(bounds);
        }));

    };

    return {
        init: _initialize,
        load: _load,
        renderPoint: _renderPoint,
        renderPoints: _renderPoints
    };


})();