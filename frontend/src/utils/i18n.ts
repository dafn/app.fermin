const translations = {
  akkumulert_formue: {
    no: "Akkumulert formue",
    en: "Accumulated Wealth",
  },
};

export default (key: string, language: Language) => {
  try {
    return translations[key.toLowerCase()][language.toLowerCase()];
  } catch (error) {
    console.error(`Could not find "${key}" for language "${language}"`);
    return null;
  }
};
