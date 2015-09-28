module.exports = function() {
  var selection = JSON.parse(require('fs').readFileSync('icons/selection.json'));
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