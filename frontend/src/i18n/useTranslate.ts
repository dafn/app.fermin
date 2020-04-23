import { useContext, StateUpdater } from "preact/hooks";

import languageContext from "src/i18n/languageContext";
import translation from "src/i18n/translation";

interface Translator {
  t: (key: string) => string;
  lang: Language;
  setLang: StateUpdater<Language>;
}

export default (): Translator => {
  const { lang, setLang } = useContext(languageContext);

  return {
    t: (key: string) => translation(key, lang),
    lang,
    setLang,
  };
};
