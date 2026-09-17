import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translations from "./translations";

i18n
  .use(initReactI18next)
  .init({
    resources: translations,

    lng: "fr",

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
