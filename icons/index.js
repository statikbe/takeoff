require('./generators/awesome');
require('./generators/material');

var selection = require('./selection.json');

module.exports = function() {
  var source = [];
  for(var key in selection) {
    if(selection.hasOwnProperty(key)) {
      selection[key].forEach(function(icon) {
        source.push('icons/svg/' + key + '/' + icon + '.svg');
      });
    }
  }

  return source;
};