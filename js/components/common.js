window.app = window.app || {};

app.common = (function commonComponent($, undefined) {

    let $document = $(document);
    let $window = $(window);
    let $html = $('html');
    let $body = $('body');

    function initialize() {

        //  Set initial variables
        this.windowResize();

        $window.on('resize', app.helpers.debounce(this.windowResize, 250, false));

        colorbox();

    }

    function windowResize() {

        var isFlyoutActive = app.helpers.isBreakpointActive('flyout');

        if (!isFlyoutActive) {
            $body.removeClass('flyout-active');
        }

        $.extend(app.variables, {
            windowWidth: $window.width(),
            windowHeight: $window.height(),
            isFlyoutActive: isFlyoutActive
        });

    }

    function colorbox() {

        if (typeof $.colorbox == 'undefined') return;

        var defaultOptions = {
            close: '&times;',
            next: '&rsaquo;',
            previous: '&lsaquo;',
            maxWidth: '90%',
            maxHeight: '90%'
        };

        $('.js-gallery-image').colorbox(defaultOptions);

        $('.js-gallery-video').colorbox($.extend({}, defaultOptions, {
            iframe: true,
            innerWidth: 640,
            innerHeight: 480
        }));
    }

    function finalize() {

        function jsDone() {
            $html.addClass('js-done');
        }

        $window.on('load', jsDone);

        setTimeout(jsDone, 4000);

    }

    return {
        init: initialize,
        windowResize: windowResize,
        finalize: finalize
    };

})(jQuery);
