define(['jquery', 'modernizr'], function() {
  var _initialize = function() {
    var component = $('body').data('component');

    // hit up common first.
    this.fire('common');

    // Hit up the page component
    if(component) {
      this.fire(component);
    }

    // Fire the finalize function for common
    this.fire('common','finalize');
  };

  var _fire = function(func, funcname, args) {
    funcname = (funcname === undefined) ? 'init' : funcname;

    var comp = 'components/' + func;
    require([comp], function(component) {
      if (typeof component[funcname] == 'function') {
        component[funcname](args);
      }
    });
  };

  return {
    init: _initialize,
    fire: _fire
  };
});
