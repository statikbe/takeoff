// ParsleyConfig definition if not already set
window.ParsleyConfig = window.ParsleyConfig || {};
window.ParsleyConfig.i18n = window.ParsleyConfig.i18n || {};

// Define then the messages
window.ParsleyConfig.i18n.nl = $.extend(window.ParsleyConfig.i18n.nl || {}, {
  defaultMessage: "Deze waarde lijkt onjuist."
      , type: {
            email:      "Dit lijkt geen geldig e-mail adres te zijn."
          , url:        "Dit lijkt geen geldige URL te zijn."
          , urlstrict:  "Dit is geen geldige URL."
          , number:     "Deze waarde moet een nummer zijn."
          , digits:     "Deze waarde moet numeriek zijn."
          , dateIso:    "Deze waarde moet een datum in het volgende formaat zijn: (YYYY-MM-DD)."
          , alphanum:   "Deze waarde moet alfanumeriek zijn."
          , phone:      "Deze waarde moet een geldig telefoonnummer zijn."
        }
      , notnull:        "Deze waarde mag niet leeg zijn."
      , notblank:       "Deze waarde mag niet leeg zijn."
      , required:       "Dit veld is verplicht"
      , regexp:         "Deze waarde lijkt onjuist te zijn."
      , min:            "Deze waarde mag niet lager zijn dan %s."
      , max:            "Deze waarde mag niet groter zijn dan %s."
      , range:          "Deze waarde moet tussen %s en %s liggen."
      , minlength:      "Deze tekst is te kort. Deze moet uit minimaal %s karakters bestaan."
      , maxlength:      "Deze waarde is te lang. Deze mag maximaal %s karakters lang zijn."
      , mincheck:       "Je moet minstens %s opties selecteren."
      , maxcheck:       "Je moet %s of minder opties selecteren."
      , rangecheck:     "Je moet tussen de %s en %s opties selecteren."
      , rangelength:    "Deze waarde moet tussen %s en %s karakters lang zijn."
      , equalto:        "Deze waardes moeten identiek zijn."
});

// If file is loaded after Parsley main file, auto-load locale
if ('undefined' !== typeof window.ParsleyValidator)
  window.ParsleyValidator.addCatalog('nl', window.ParsleyConfig.i18n.nl, true);