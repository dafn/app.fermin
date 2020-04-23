import { createContext } from "preact";
import { StateUpdater } from "preact/hooks";

interface LanguageContext {
  lang: Language;
  setLang: StateUpdater<Language>;
}

export default createContext<LanguageContext>(null);
