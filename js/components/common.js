window.app = window.app || {};

app.common = (function commonComponent($, undefined) {

    var $document = $(document);
    var $window = $(window);
    var $html = $('html');
    var $body = $('body');

    function initialize() {

        //  Set initial variables
        this.windowResize();

        $window.on('resize', app.helpers.debounce(this.windowResize, 250, false));

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