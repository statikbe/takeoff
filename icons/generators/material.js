var fs = require('fs');

module.exports = (function() {
  var src = 'icons/node_modules/material-design-icons/';
  var dest = 'icons/svg/material-design/';
  var excl = ['iconfont', 'sprites'];
  var oldFileName, newFileName;

  fs.mkdir(dest, function(err) {
    if(err) console.log("Directory '" + dest + "' already exists");
  });

  fs.readdir(src, function(err, files) {
    if(err) console.log(err);
    files.forEach(function(file) {
      if(fs.lstatSync(src + file).isDirectory() && excl.indexOf(file) < 0)
        fs.readdir(src + file + '/svg/production/', function(err, icons) {
          if(err) console.log(err);
          oldFileName = '';
          icons.forEach(function(icon, index) {
            newFileName = icon.slice(3).replace(/_\d+px/, '');
            if(index > 0 && newFileName !== oldFileName) 
              fs.createReadStream(src + file + '/svg/production/' + icons[index-1]).pipe(fs.createWriteStream(dest + oldFileName));
            oldFileName = newFileName;
          });
        });
    });
  });
})();