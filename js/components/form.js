'use strict';

import Parsley from 'parsleyjs';
import { extend } from './helpers';

require('../parsley/nl');

const $document = $(document);
const $window = $(window);
const $html = $('html');
const $body = $('body');
const $forms = $('form');

window.Parsley = Parsley;

extend(window.Parsley.options, {

    classHandler: function(ParsleyField) {
        return ParsleyField.$element.closest('.form__item');
    },

    errorClass: 'has-error',

    errorsContainer: function(ParsleyField) {
        var itemClass = '.form__item';
        var $formItem = ParsleyField.$element.closest(itemClass);
        var $formGroup = $formItem.find('.form__group');

        if ($formGroup.length) {
            return $formGroup;
        } else {
            return $formItem;
        }
    },

    errorsWrapper: '<ul class="form__errors-list form__errors-client"></ul>',

    excluded: 'input:not(:visible), input.novalidate'
});

window.Parsley.setLocale(document.documentElement.lang);

window.Parsley.on('field:error', function () {
    var $errorElement = window.Parsley.options.classHandler(this);
    $errorElement.find('.form__errors-server').remove();
});

$forms.on('click', 'button[type=submit]', submit);

function submit() {

    const $form = $(this.form);

    if ($form.data('is-submitted')) {
        return false;
    }

    if ($form.parsley().isValid()) {
        $form.data('is-submitted', true).addClass('is-submitted');
    }
}
