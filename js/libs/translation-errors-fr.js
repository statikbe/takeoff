// ParsleyConfig definition if not already set
window.ParsleyConfig = window.ParsleyConfig || {};
window.ParsleyConfig.i18n = window.ParsleyConfig.i18n || {};

// Define then the messages
window.ParsleyConfig.i18n.fr = jQuery.extend(window.ParsleyConfig.i18n.fr || {}, {
  defaultMessage: "Cette valeur semble non valide.",
  type: {
    email:        "Cette valeur n'est pas une adresse email valide.",
    url:          "Cette valeur n'est pas une URL valide.",
    number:       "Cette valeur doit Ãªtre un nombre.",
    integer:      "Cette valeur doit Ãªtre un entier.",
    digits:       "Cette valeur doit Ãªtre numÃ©rique.",
    alphanum:     "Cette valeur doit Ãªtre alphanumÃ©rique."
  },
  notblank:       "Cette valeur ne peut pas Ãªtre vide.",
  required:       "Ce champ est requis.",
  pattern:        "Cette valeur semble non valide.",
  min:            "Cette valeur ne doit pas Ãªtre infÃ©rieure Ã  %s.",
  max:            "Cette valeur ne doit pas excÃ©der %s.",
  range:          "Cette valeur doit Ãªtre comprise entre %s et %s.",
  minlength:      "Cette chaÃ®ne est trop courte. Elle doit avoir au minimum %s caractÃ¨res.",
  maxlength:      "Cette chaÃ®ne est trop longue. Elle doit avoir au maximum %s caractÃ¨res.",
  length:         "Cette valeur doit contenir entre %s et %s caractÃ¨res.",
  mincheck:       "Vous devez sÃ©lectionner au moins %s choix.",
  maxcheck:       "Vous devez sÃ©lectionner %s choix maximum.",
  check:          "Vous devez sÃ©lectionner entre %s et %s choix.",
  equalto:        "Cette valeur devrait Ãªtre identique."
});

// If file is loaded after Parsley main file, auto-load locale
if ('undefined' !== typeof window.ParsleyValidator)
  window.ParsleyValidator.addCatalog('fr', window.ParsleyConfig.i18n.fr, true);
