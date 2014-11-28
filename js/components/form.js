window.app = window.app || {};

app.form = (function($, undefined) {
  var $forms = $('form');

  var _initialize = function() {
    $forms.on('click', 'button[type=submit]', this.submit);
  };

  var _submit = function() {
    var $form = $(this.form);

    if($form.data('is-submitted')) return false;
    console.log($form.parsley().isValid());
    if($form.parsley().isValid()) {
      console.log('ddsdf');
      $form
        .data('is-submitted', true)
        .addClass('is-submitted');
    }
  };

  return {
    init: _initialize,
    submit: _submit
  };

})(jQuery);
