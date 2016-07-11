window.app = window.app || {};

app.form = (function formComponent($, undefined) {

    var $document = $(document);
    var $window = $(window);
    var $html = $('html');
    var $body = $('body');
    var $forms = $('form');

    function initialize() {

        window.ParsleyConfig = {
            excluded: 'input:not(:visible), input.novalidate',
            classHandler: function (ParsleyField) {
                return ParsleyField.$element.closest('.form__item').append('<div class="parsley-errors-container"/>');
            },
            errorsContainer: function (ParsleyField) {
                return ParsleyField.$element.closest('.form__item').children('.parsley-errors-container');
            }
        };

        window.Parsley.setLocale(document.documentElement.lang);

        $forms.on('click', 'button[type=submit]', this.submit);

    }

    function submit() {

        var $form = $(this.form);

        if ($form.data('is-submitted')) {
            return false;
        }

        if ($form.parsley().isValid()) {
            $form.data('is-submitted', true).addClass('is-submitted');
        }

    }

    return {
        init: initialize,
        submit: submit
    };

})(jQuery);
