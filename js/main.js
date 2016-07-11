// DON'T ADD ANYTHING TO THIS FILE, USE COMMON.JS PLEASE

window.app = window.app || {};
app.variables = app.variables || {};

app.main = (function () {

    function fire(component, funcName, args) {
        funcName = (typeof funcName === 'undefined') ? 'init' : funcName;

        if (typeof funcName === 'undefined') {
            funcName = 'init';
        }

        if (component !== '' && app[component] && typeof app[component][funcName] == 'function') {
            app[component][funcName](args);
        }
    }

    function initialize() {

        var dataComponents = document.body.getAttribute('data-components');

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

})();


$(document).ready(function () {
    app.main.init();
});