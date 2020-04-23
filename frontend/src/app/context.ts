import { createContext } from "preact";
import { StateUpdater } from "preact/hooks";

interface LanguageContext {
  lang: Language;
  setLang: StateUpdater<Language>;
}

interface TranslateContext {
  t: Translator
}

const languageContext = createContext<LanguageContext>(null);
const translateContext = createContext<TranslateContext>(null);

export const contexts = {
  languageContext,
  translateContext,
};
