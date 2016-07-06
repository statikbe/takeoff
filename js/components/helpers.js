window.app = window.app || {};

app.helpers = (function() {
    var loadScript = function(url) {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        document.body.appendChild(script);
    };

    return {
        loadScript: loadScript
    };
})();