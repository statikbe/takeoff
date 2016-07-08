window.app = window.app || {};

app.common = (function ($, undefined) {

    var $document = $(document);
    var $window = $(window);
    var $html = $('html');
    var $body = $('body');

    var _initialize = function () {

        //  Set initial variables
        this.windowResize();

        $window.on('resize', app.helpers.debounce(this.windowResize, 250, false));

        // _gallery();
        _flyoutNavigation();
    };

    var _windowResize = function () {

        var isFlyoutActive = app.helpers.isBreakpointActive('flyout');

        if (!isFlyoutActive) {
            $body.removeClass('flyout-active');
        }

        $.extend(app.variables, {
            windowWidth: $window.width(),
            windowHeight: $window.height(),
            isFlyoutActive: isFlyoutActive
        });

    };

    var _flyoutNavigation = function () {
        $('.js-flyout-toggle').flyoutNav();
    };

    var _gallery = function () {

        //  Let's change the className to 'js-gallery' or something in templates

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


    var _finalize = function () {

        function jsDone() {
            $html.addClass('js-done');
        }

        $window.on('load', jsDone);
        
        setTimeout(jsDone, 4000);

    };

    return {
        init: _initialize,
        windowResize: _windowResize,
        finalize: _finalize
    };

})(jQuery);