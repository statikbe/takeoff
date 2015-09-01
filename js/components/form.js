window.app = window.app || {};

window.ParsleyConfig = window.ParsleyConfig || {};
window.ParsleyConfig = {
  excluded: 'input:not(:visible), input.novalidate',
  classHandler: function (ParsleyField) {
    return ParsleyField.$element.closest('.form__item').append('<div class="parsley-errors-container" />');
  },
  errorsContainer: function (ParsleyField) {
    return ParsleyField.$element.closest('.form__item').children('.parsley-errors-container');
  }
};
window.ParsleyValidator.setLocale('nl');

app.form = (function($, undefined) {
  var $document = $(document),
      $window = $(window),
      $html = $('html'),
      $body = $('body'),
      $forms = $('form');

  var _initialize = function() {
    $forms.on('click', 'button[type=submit]', this.submit);
  };

  var _submit = function() {
    var $form = $(this.form);

    if($form.data('is-submitted')) return false;
    if($form.parsley().isValid()) {
      $form
        .data('is-submitted', true)
        .addClass('is-submitted');
    }
  };

  // var _filter = function() {
  //   var formSelector = '.form--filter',
  //       $form = $(formSelector),
  //       resultsSelector = '#' + $form.closest('[id^=widget]').attr('id'),
  //       action = $form.attr('action'),
  //       filterTimout;

  //   $document.on('change', '.form--filter input', function() {
  //     var $form = $(this.form),
  //         url = action + '?' + $form.serialize();

  //     clearTimeout(filterTimout);
  //     if(Modernizr.history) {
  //       filterTimout = setTimeout(function() {
  //         _loadResults(url, resultsSelector);
  //       }, 500);
  //     }
  //   });

  //   var _loadResults = function(url, locationSelector) {
  //     var $location = $(locationSelector);
  //     $location.addClass('is-loading');

  //     $location.load( url + ' ' + locationSelector + ' > *', function(data) {
  //       history.pushState('', 'New URL: ' + url, url);
  //       $location.removeClass('is-loading');
  //     });
  //   };

  //   if(Modernizr.history) {
  //     window.onpopstate = function(event) {
  //       var $location = $(resultsSelector);
  //       $location.addClass('is-loading');
  //       _loadResults(window.location.pathname + window.location.search, resultsSelector);
  //     };
  //   }
  // };

  return {
    init: _initialize,
    submit: _submit
  };

})(jQuery);
