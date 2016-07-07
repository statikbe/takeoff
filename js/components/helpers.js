window.app = window.app || {};

<<<<<<< HEAD
app.helpers = (function () {

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

    var _getContentProperty = function (element, pseudoElement) {

        if (!!getComputedStyle) {
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
        getContentProperty: _getContentProperty,
        isBreakpointActive: _isBreakpointActive,
        loadScript: _loadScript
    };
})();