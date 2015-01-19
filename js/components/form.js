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
  var $forms = $('form');

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

  // Expressionengine validation
  // var _validate= function() {
  //   $forms.each(function(k, v){
  //     var $form = $(v),
  //         $fields = $form.find('.form__text, .form__textarea'),
  //         $statusSucces = $form.find('.block--success'),
  //         $statusError = $form.find('.block--error'),
  //         $button = $form.find('[type=submit]'),
  //         action = $form.attr('action') ? updateQueryStringParameter($form.attr('action'), 'callback', '?') : '',
  //         method = $form.attr('method'),
  //         novalidate = $form.attr('novalidate'),
  //         noJSON = $form.hasClass('nojson'),
  //         $returnInput = $form.find('input[name="return_url"]'),
  //         returnURL;

  //     var onFormError = function() {
  //           $statusSucces.hide();
  //           $statusError.show(function() {
  //             animatedScrollTo(
  //               document.body,
  //               $statusError.offset().top,
  //               500
  //             );
  //           });
  //           $button.prop('disabled', false);
  //         },
  //         onFormSucces = function() {
  //           $form.hide();
  //           $statusError.hide();
  //           $statusSucces.show(function() {
  //             animatedScrollTo(
  //               document.body,
  //               $statusSucces.offset().top,
  //               500
  //             );
  //           });
  //         };

  //     if ($returnInput.length !== '0') {
  //       returnURL = $returnInput.val();
  //     }

  //     if (novalidate === undefined) {
  //       $form.parsley().subscribe('parsley:form:validate', function(formInstance) {
  //         if (formInstance.isValid() === true) {
  //           $form.addClass('is-submitted');
  //           $button.prop('disabled', true);
  //         }
  //       });

  //       if (!noJSON) {
  //         $form.on('submit', function(e){
  //           e.preventDefault();
  //           /*
  //             We assume all internal forms have the POST method
  //             These forms send data in text format, so we need to convert that into a json object (done further below)
  //           */
  //           var ajaxSettings = {
  //             type: method,
  //             url: action,
  //             data: $form.serialize()
  //           };
  //           if (method === 'POST') {
  //             ajaxSettings.dataType = 'text';
  //           } else {
  //             ajaxSettings.dataType = 'json';
  //           }

  //           $.ajax(
  //             ajaxSettings
  //           )
  //           .done(function(data) {
  //             var isObj = $.isPlainObject(data);
  //             if (!isObj) {
  //               data = jQuery.parseJSON(data);
  //             }

  //             if (data.success && data.success === 1) {
  //               // Internal forms
  //               onFormSucces();
  //             } else if (data.Status && data.Status === 200) {
  //               onFormSucces();
  //             } else {
  //               onFormError();
  //             }
  //           })
  //           .fail(function(jqXHR, textStatus) {
  //             onFormError();
  //           })
  //           .always(function() {
  //             $form.removeClass('is-submitted');
  //           });
  //           if (!returnURL || returnURL === '') {
  //             return false;
  //           }
  //         });
  //       }
  //     }
  //   });
  // };

  return {
    init: _initialize,
    submit: _submit
  };

})(jQuery);
