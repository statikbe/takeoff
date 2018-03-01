import $ from 'jquery';
import GoogleMapsLoader from 'google-maps';

export default function () {

    GoogleMapsLoader.KEY = '';
    GoogleMapsLoader.LIBRARIES = [];
    GoogleMapsLoader.LANGUAGE = $('html').attr('lang') || 'en';

    GoogleMapsLoader.load(initializeGoogleMaps);

}

function initializeGoogleMaps(google) {

    const defaultOptions = {
        zoom: 9,
        scrollwheel: false
    };

    let mapData = [];

    //  <div class="js-google-map" data-locations="[]" data-options="{}"></div>
    $('.js-google-map').each((i, mapEl) => {

        const $mapEl = $(mapEl);
        let locations = [];
        let customOptions = {};

        try {
            locations = JSON.parse($mapEl.attr('data-locations'));
            customOptions = JSON.parse($mapEl.attr('data-options'));
        } catch (e) {}

        var map = new google.maps.Map(mapEl, $.extend({}, defaultOptions, customOptions));

        var infowindow = new google.maps.InfoWindow();

        var bounds = new google.maps.LatLngBounds();

        var markers = [];

        $.each(locations, (i, location) {

            var marker = new google.maps.Marker({
                map,
                position: {
                    lat: parseFloat(location.lat),
                    lng: parseFloat(location.lng)
                }
            });

            google.maps.event.addListener(marker, 'click', function () {

                infowindow.setContent([
                    '<div>',
                        'Infowindow',
                    '</div>'
                ].join('\n'));

                infowindow.open(map, marker);
            });

            bounds.extend(marker.getPosition());
                
            markers.push(marker);
        });

        mapData.push({
            instance: map,
            bounds: bounds
        });

        map.fitBounds(bounds);
        map.setCenter(bounds.getCenter());
    });

    // Refocus map on screen resize
    $(window).on('resize', app.helpers.debounce(function () {
        $.each(mapData, function () {
            this.instance.fitBounds(this.bounds);
            this.instance.setCenter(this.bounds.getCenter());
        });
    }, 250, false));
}
