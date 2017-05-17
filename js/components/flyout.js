window.app = window.app || {};

app.flyout = (function flyoutComponent($, undefined) {

    var $document = $(document);
    var $body = $('body');

    $('.js-flyout-toggle').each(function () {

        var $this = $(this);
        var $flyoutRegion = $($this.attr('href'));

        $body.addClass('flyout-enabled');

        $this.on('click', function (event) {
            event.preventDefault();
            $body.addClass('flyout-active');
        });

        $document.on('click', '.flyout__close, .flyout__overlay', function (event) {
            event.preventDefault();
            $body.removeClass('flyout-active');
        });

        //  Multi-level flyout menu
        $flyoutRegion.find('a + ul').each(function () {

            var $submenu = $(this);
            var $anchor = $submenu.prev();
            var $backItem = $('<li><a href="#" class="flyout__back">Back</a></li>');

            $(this).prepend($backItem);

            $anchor.on('click', function (event) {
                event.preventDefault();
                $(this).parent().addClass('is-active');
            });

            $backItem.find('.flyout__back').on('click', function (event) {
                event.preventDefault();
                $(this).closest('li.is-active').removeClass('is-active');
            });

        });

    });

})(jQuery);
