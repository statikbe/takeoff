(function($){
    $.fn.flyoutNav = function (options) {
        var $body = $('body');

        var settings = {
            bodyClass: 'flyout-enabled',
            activeBodyClass: 'flyout-active',
            back: function(elem) {
                var elem = elem || false;
                if(!elem) return 'Back';
                return $(elem).data('back') || 'Back';
            }
        };

        if ( options ) {
            $.extend( settings, options );
        }
        return this.each(function () {
            var $that = $(this),
                $flyout = $($that.attr('href')),
                $linksWithSubmenus = $flyout.find('li > a:not(:only-child)');

            $body.addClass(settings.bodyClass);

            // Add back links to the items
            $flyout.find('a + ul').each(function() {
                var $submneu = $(this),
                    $backItem = $('<li><a href="#" class="flyout-back">' + settings.back(this) + '</a></li>');
                $submneu.prepend($backItem);
            });

            $that.on('click', function(e) {
                e.preventDefault();
                $body.toggleClass(settings.activeBodyClass);
            });

            $flyout.find('a.flyout-back').on('click', function() {
                $(this).closest('ul').parent().removeClass('active');
            });

            $linksWithSubmenus.on('click', function(e) {
                e.preventDefault();
                $(this.parentNode).addClass('active');
            });

            // Close the nav
            $flyout.find('.flyout-close').on('click', function(e) {
                e.preventDefault();
                $body.removeClass(settings.activeBodyClass);
            });
        });
    };
})(window.jQuery);
