// DON'T ADD ANYTHING TO THIS FILE, USE COMMON.JS PLEASE

window.app = window.app || {};
app.variables = app.variables || {};

app.main = (function () {

    var _fire = function (component, funcName, args) {

        if (typeof funcName === 'undefined') {
            funcName = 'init';
        }

        if (component !== '' && app[component] && typeof app[component][funcName] == 'function') {
            app[component][funcName](args);
        }
    };

    var _initialize = function () {

        var dataComponents = document.body.getAttribute('data-components');

        this.fire('common');

        if (dataComponents) {
            dataComponents = dataComponents.split(' ');
            for (var comp in dataComponents) {
                this.fire(dataComponents[comp]);
            }
        }

        this.fire('common', 'finalize');
    };

    return {
        init: _initialize,
        fire: _fire
    };

})();


$(document).ready(function () {
    app.main.init();
});