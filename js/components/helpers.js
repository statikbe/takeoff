import $ from 'jquery';

export function getContentProperty(element, pseudoElement) {

    if (!window.hasOwnProperty('getComputedStyle')) {
        //  getComputedStyle is not supported
        return '';
    }

    return window.getComputedStyle(element, pseudoElement).getPropertyValue('content');
}

export function isBreakpointActive(breakpointKey) {
    return getContentProperty(document.body, ':after').indexOf(breakpointKey) < 0;
}

export function loadScript(url, cb) {

    let script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    if (typeof cb !== 'undefined') {
        $(script).on('load', cb);
    }

    document.body.appendChild(script);
}
