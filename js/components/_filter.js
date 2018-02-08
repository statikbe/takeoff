window.app = window.app || {};
app.filter = (function filterComponent($, undefined) {
    var $document = $(document);
    var $window = $(window);
    var $body = $('body');
    var $form = $('.js-filter-form');
    var $submit = $('.js-filter-submit').hide();
    var $inputFilter = $('.js-filter-form input, .js-filter-form select');
    var $result = $('.js-filter-results');
    var promise;

    function initialize() {
        $inputFilter.on('change', function(e) {
            $('.js-filter-loading').fadeIn();
            $result.hide();
            var url = $form.attr('action') + '?' + $form.serialize();
            getFilter(url);
        });
        $document.on('click', '.js-filter-pagination a', function(e) {
            e.preventDefault();
            $('.js-filter-loading').fadeIn();
            $result.hide();
            getFilter($(this).attr('href'));
        });
    }

    function getFilter(url) {
        if (promise) {
            promise.abort();
        }
        promise = $.get(url);
        promise.then(function(filter) {
            $('.js-filter-loading').hide();
            $result.html($(filter).find('.js-filter-results').html());
            $result.fadeIn();
            history.pushState('', 'New URL: ' + url, url);
        }, function(error) {
            // console.log(error);
        });
    }

    return {
        init: initialize
    };

})(jQuery);
