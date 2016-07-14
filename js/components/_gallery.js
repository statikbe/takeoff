window.app = window.app || {};

app.gallery = (function galleryComponent($, undefined) {

    function initialize() {

        var defaultOptions = {
            close: '&times;',
            next: '&rsaquo;',
            previous: '&lsaquo;',
            maxWidth: '90%',
            maxHeight: '90%'
        };

        $('.js-gallery-image').colorbox(defaultOptions);

        $('.js-gallery-video').colorbox(app.helpers.extend(defaultOptions, {
            iframe: true,
            innerWidth: 640,
            innerHeight: 480
        }));

    }

    return {
        init: initialize
    };

})(jQuery);