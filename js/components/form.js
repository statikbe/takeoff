window.app = window.app || {};

app.form = (function formComponent($, undefined) {

    var $document = $(document);
    var $window = $(window);
    var $html = $('html');
    var $body = $('body');
    var $forms = $('form');

    function initialize() {

        app.helpers.extend(window.Parsley.options, {
            classHandler: function(ParsleyField) {
                return ParsleyField.$element.closest('.form__item');
            },
            errorClass: 'has-error',
            errorsContainer: function(ParsleyField) {
                var itemClass = '.form__item';
                var $formItem = ParsleyField.$element.closest(itemClass);
                var $formItemLast = $formItem.siblings(itemClass).andSelf().last();
                var $formGroup = $formItem.find('.form__group');

                if ($formGroup.length) {
                    return $formGroup;
                } else {
                    return $formItemLast;
                }
            },
            errorsWrapper: '<ul class="form__errors-list form__errors-client"></ul>',
            excluded: 'input:not(:visible), input.novalidate',
        });

        window.Parsley.setLocale(document.documentElement.lang);

        window.Parsley.on('field:error', function() {
            var $errorElement = window.Parsley.options.classHandler(this);
            $errorElement.find('.form__errors-server').remove();
        });

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
