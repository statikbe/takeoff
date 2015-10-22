var fs = require('fs');
var rmdir = require('rimraf');
var extractSVG = require('font-awesome-svg-png/lib/generate');

var options = {
  sizes: '48',
  color: 'black',
  sprites: false,
  nopadding: true,
  png: false,
  svg: true,
  optipng: false,
  dest: 'svg/font-awesome/'
};

module.exports = extractSVG(options, function() {
  var src = 'svg/font-awesome/black/svg/';
  var dest = options.dest;

  fs.mkdir(dest, function(err) {
    if(err) console.log("Directory '" + dest + "' already exists");
  });

  fs.readdir(src, function(err, files) {
    for(var i = 0; i < files.length; i++)
      fs.rename(src + files[i], 'svg/font-awesome/' + files[i]);
    rmdir('svg/font-awesome/black', function(err) {
      if(err) console.log(err);
    });
  });
});