// DON'T ADD ANYTHING TO THIS FILE, USE COMMON.JS PLEASE

window.app = window.app || {};
app.variables = app.variables || {};

app.main = (function ($, undefined) {

    var $body = $('body');

    function fire(component, funcName, args) {

        if (funcName === undefined) {
            funcName = 'init';
        }

        if (component !== '' && app[component] && typeof app[component][funcName] === 'function') {
            app[component][funcName](args);
        }
    }

    function initialize() {

        var dataComponents = $body.data('components');

        this.fire('common');

        if (dataComponents) {
            dataComponents = dataComponents.split(' ');
            for (var comp in dataComponents) {
                this.fire(dataComponents[comp]);
            }
        }

        this.fire('common', 'finalize');

    }

    return {
        init: initialize,
        fire: fire
    };

})(jQuery);

$(document).ready(function () {
    app.main.init();
});