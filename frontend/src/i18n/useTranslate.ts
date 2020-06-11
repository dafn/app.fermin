import { useContext, StateUpdater } from "preact/hooks";

import languageContext from "src/i18n/languageContext";
import translation, { TranslationKeys } from "src/i18n/translation";

interface Translator {
  t: (key: TranslationKeys) => string;
  lang: Language;
  setLang: StateUpdater<Language>;
}

export default (): Translator => {
  const { lang, setLang } = useContext(languageContext);

  return {
    t: (key) => translation(key, lang),
    lang,
    setLang,
  };
};
