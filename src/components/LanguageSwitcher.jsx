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

  const changeLanguage = (language) => {
    if (language === i18n.language) return;

    i18n.changeLanguage(language);
  };

  return (
    <div
      className="language-switcher"
      role="group"
      aria-label="Choisir la langue"
    >
      {languages.map((language) => {
        const active = i18n.language === language.code;

        return (
          <button
            key={language.code}
            type="button"
            className={`language-switcher__button ${
              active
                ? "language-switcher__button--active"
                : ""
            }`}
            onClick={() => changeLanguage(language.code)}
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
