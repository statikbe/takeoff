window.app = window.app || {};

app.helpers = (function ($, undefined) {

    var $body = $('body');
    
    var _debounce = function (func, wait, immediate) {

        var timeout;

        return function () {

            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    };

    //  Loosely based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
    var _extend = function (target) {

        target = Object(target);

        var argLen = arguments.length;
        var source, key;

        for (var i = 1; i < argLen; i++) {
            source = arguments[i];
            if (source !== null) {
                for (key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }

        return target;
        
    };

    var _getContentProperty = function (element, pseudoElement) {

        if (!window.hasOwnProperty('getComputedStyle')) {
            //  getComputedStyle is not supported
            return '';
        }

        return getComputedStyle(element, pseudoElement).getPropertyValue('content');
    };

    var _isBreakpointActive = function (breakpointKey) {
        return this.getContentProperty($body[0], ':after').indexOf(breakpointKey) < 0;
    };

    var _loadScript = function (url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.body.appendChild(script);
    };

    return {
        debounce: _debounce,
        extend: _extend,
        getContentProperty: _getContentProperty,
        isBreakpointActive: _isBreakpointActive,
        loadScript: _loadScript
    };

})(jQuery);