import $ from 'jquery';

import common from './components/common';
// import formComponent from './components/form';

window.$ = window.jQuery = $;

$(() => {

    window.app = window.app || {};
    window.app.variables = window.app.variables || {};

    common();

    function jsDone() {
        $('html').addClass('js-done');
    }

    $(window).on('load', jsDone);

    setTimeout(jsDone, 4000);
});
