import { useLocalization } from "../localization";

function LanguageSwitcher() {
  const { language, setLanguage, t } = useLocalization();
  return (
    <div className="language-switcher" aria-label={t("language")}>
      <button type="button" className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")} aria-pressed={language === "en"}>EN</button>
      <button type="button" className={language === "kn" ? "active" : ""} onClick={() => setLanguage("kn")} aria-pressed={language === "kn"}>ಕನ್ನಡ</button>
    </div>
  );
}

export default LanguageSwitcher;
