'use strict';

import { debounce, isBreakpointActive } from './helpers';

const $document = $(document);
const $window = $(window);
const $html = $('html');
const $body = $('body');

windowResize();

$window.on('resize', debounce(windowResize, 250, false));

$window.on('load', jsDone);

setTimeout(jsDone, 4000);

function windowResize() {

    const isFlyoutActive = isBreakpointActive('flyout');
    const windowWidth = $window.width();
    const windowHeight = $window.height();

    if (!isFlyoutActive) {
        $body.removeClass('flyout-active');
    }

    $.extend(window.app.variables, {
        isFlyoutActive,
        windowWidth,
        windowHeight
    });
}

function jsDone() {
    $html.addClass('js-done');
}
