window.app = window.app || {};

app.helpers = (function() {
    var localStorageAvailable = function() {
        var testKey = 'localstorageTest';
        try {
            localStorage.setItem(testKey, testKey);
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    };

    return {
        localStorageAvailable: localStorageAvailable
    };

})();