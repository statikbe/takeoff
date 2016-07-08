//! DONT ADD ANYTHING IN THIS FILE, USE COMMON.JS PLEASE.

window.app = window.app || {};
app.variables = app.variables || {};

app.main = (function($, undefined) {

    var _fire = function(func, funcname, args){
        funcname = (funcname === undefined) ? 'init' : funcname;


        if (func !== '' && app[func] && typeof app[func][funcname] == 'function') {
            app[func][funcname](args);
        }
    };

    var _initialize = function () {
        var dataComponents = $('body').data('components');

        this.fire('common');

        if (dataComponents) {
            var components = dataComponents.split(' ');
            for (var comp in components) {
                this.fire(components[comp]);
            }
        }

        // Fire the finalize function for common
        this.fire('common','finalize');
    };

    return {
        init: _initialize,
        fire : _fire
    };

})(jQuery);


$(document).ready(function () {
    app.main.init();
});