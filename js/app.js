require.config({
  paths: {
    "jquery": "https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
    "modernizr": "libs/modernizr.custom.min"
  }
});

require(["components/main"], function(main) {
  main.init();
});
