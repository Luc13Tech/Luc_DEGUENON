import { useTranslation } from "react-i18next";

const languages = [
  {
    code: "fr",
    label: "FR",
    name: "Français",
  },
  {
    code: "en",
    label: "EN",
    name: "English",
  },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const currentLanguage = (
    i18n.resolvedLanguage ||
    i18n.language ||
    "fr"
  ).split("-")[0];

  const changeLanguage = async (language) => {
    if (!language || language === currentLanguage) {
      return;
    }

    try {
      await i18n.changeLanguage(language);

      localStorage.setItem(
        "language",
        language
      );
    } catch (error) {
      console.error(
        "Erreur lors du changement de langue :",
        error
      );
    }
  };

  return (
    <div
      className="language-switcher"
      role="group"
      aria-label="Choisir la langue"
    >
      {languages.map((language) => {
        const active =
          currentLanguage === language.code;

        return (
          <button
            key={language.code}
            type="button"
            className={`language-switcher__button ${
              active
                ? "language-switcher__button--active"
                : ""
            }`}
            onClick={() =>
              changeLanguage(language.code)
            }
            aria-label={`Passer en ${language.name}`}
            aria-pressed={active}
          >
            {language.label}
          </button>
        );
      })}
    </div>
  );
}
