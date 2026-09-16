import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  fr: {
    translation: {
      languageName: "Français",
    },
  },

  en: {
    translation: {
      languageName: "English",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,

  lng: "fr",

  fallbackLng: "fr",

  interpolation: {
    escapeValue: false,
  },

  returnNull: false,
});

export default i18n;
