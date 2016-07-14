window.app = window.app || {};

app.helpers = (function helpersComponent($, undefined) {

    var $body = $('body');
    
    function debounce(func, wait, immediate) {

        var timeout;

        return function () {
            var context = this;
            var args = arguments;
            var callNow = immediate && !timeout; 
            function later() {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            }
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }

    //  Loosely based on https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
    function extend(target) {

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
        
    }

    function getContentProperty(element, pseudoElement) {

        if (!window.hasOwnProperty('getComputedStyle')) {
            //  getComputedStyle is not supported
            return '';
        }

        return getComputedStyle(element, pseudoElement).getPropertyValue('content');
    }

    function isBreakpointActive(breakpointKey) {
        return this.getContentProperty($body[0], ':after').indexOf(breakpointKey) < 0;
    }

    function loadScript(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.body.appendChild(script);
    }

    return {
        debounce: debounce,
        extend: extend,
        getContentProperty: getContentProperty,
        isBreakpointActive: isBreakpointActive,
        loadScript: loadScript
    };

})(jQuery);