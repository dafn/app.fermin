const translations = {
  accumulated_wealth: {
    no: "Akkumulert formue",
    en: "Accumulated Wealth",
  },
  private: {
    no: "Privat",
    en: "Private",
  },
  corporate: {
    no: "AS",
    en: "Corporate",
  },
  independent_earnings: {
    no: "Uavhenging overskudd",
    en: "Independent earnings",
  },
  gross_income: {
    no: "Brutto inntekt",
    en: "Gross income",
  },
  salary: {
    no: "Lønn",
    en: "Salary",
  },
  tax_on_salary: {
    no: "Skatt på lønn i %",
    en: "Tax on salary in %",
  },
  total: {
    no: "Total",
    en: "Total",
  },
};

export type TranslationKey = keyof typeof translations;

export default (key: TranslationKey, language: Language) => {
  try {
    return translations[key.toString().toLowerCase()][language.toLowerCase()];
  } catch (error) {
    console.error(
      `translation > default | Could not find "${key}" for language "${language}"`
    );
    return null;
  }
};
