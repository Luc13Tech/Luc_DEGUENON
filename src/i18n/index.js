import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translations from "./translations";

const savedLanguage =
  localStorage.getItem("language") || "fr";

i18n
  .use(initReactI18next)
  .init({
    resources: translations,

    lng: savedLanguage,

    fallbackLng: "fr",

    supportedLngs: ["fr", "en"],

    interpolation: {
      escapeValue: false,
    },

    returnNull: false,

    returnEmptyString: false,

    react: {
      useSuspense: false,
    },
  });

export default i18n;
