window.ParsleyConfig = window.ParsleyConfig || {};
window.ParsleyConfig.i18n = window.ParsleyConfig.i18n || {};

window.ParsleyConfig.i18n.fr = jQuery.extend(window.ParsleyConfig.i18n.fr || {}, {
    defaultMessage:     "Cette valeur semble non valide.",
    type: {
        email:          "Cette valeur n'est pas une adresse email valide.",
        url:            "Cette valeur n'est pas une URL valide.",
        urlstrict:      "Cette valeur n'est pas une URL valide.",
        number:         "Cette valeur doit être un nombre.",
        integer:        "Cette valeur doit être un entier.",
        digits:         "Cette valeur doit être numérique.",
        dateIso:        "Cette valeur doit être une date dans le format suivant: (AAAA-MM-JJ).",
        alphanum:       "Cette valeur doit être alphanumÃ©rique.",
        phone:          "Cette valeur n'est past un numéro de téléphone"
    },
    notnull:            "Cette valeur ne peut pas être vide.",
    notblank:           "Cette valeur ne peut pas être vide.",
    required:           "Ce champ est requis.",
    regexp:             "Cette valeur semble non valide.",
    pattern:            "Cette valeur semble non valide.",
    min:                "Cette valeur ne doit pas être inférieure à %s.",
    max:                "Cette valeur ne doit pas excéder %s.",
    range:              "Cette valeur doit être comprise entre %s et %s.",
    minlength:          "Cette chaÃ®ne est trop courte. Elle doit avoir au minimum %s caractères.",
    maxlength:          "Cette chaÃ®ne est trop longue. Elle doit avoir au maximum %s caractères.",
    length:             "Cette valeur doit contenir entre %s et %s caractères.",
    mincheck:           "Vous devez sélectionner au moins %s choix.",
    maxcheck:           "Vous devez sélectionner %s choix maximum.",
    check:              "Vous devez sélectionner entre %s et %s choix.",
    rangecheck:         "Vous devez sélectionner entre %s et %s choix.",
    rangelength:        "Cette valeur doit contenir entre %s et %s caractères.",
    equalto:            "Cette valeur devrait être identique."
});

if (typeof window.Parsley !== 'undefined') {
    window.Parsley.addCatalog('fr', window.ParsleyConfig.i18n.fr, true);
}