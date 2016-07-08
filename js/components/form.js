window.app = window.app || {};

window.ParsleyConfig = {
    excluded: 'input:not(:visible), input.novalidate',
    classHandler: function (ParsleyField) {
        return ParsleyField.$element.closest('.form__item').append('<div class="parsley-errors-container"/>');
    },
    errorsContainer: function (ParsleyField) {
        return ParsleyField.$element.closest('.form__item').children('.parsley-errors-container');
    }
};

window.ParsleyValidator.setLocale(document.documentElement.lang);

app.form = (function ($, undefined) {

    var $document = $(document);
    var $window = $(window);
    var $html = $('html');
    var $body = $('body');
    var $forms = $('form');

    var _initialize = function () {
        $forms.on('click', 'button[type=submit]', this.submit);
    };

    var _submit = function () {

        var $form = $(this.form);

        if ($form.data('is-submitted')) {
            return false;
        }

        if ($form.parsley().isValid()) {
            $form.data('is-submitted', true).addClass('is-submitted');
        }

    };

    return {
        init: _initialize,
        submit: _submit
    };

})(jQuery);
