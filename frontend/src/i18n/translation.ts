const translations = {
  accumulated_savings: {
    no: "Akkumulert sparebeløp",
    en: "Accumulated Wealth",
  },
  current_savings: {
    no: "Nåværende sparebeløp",
    en: "Current savings",
  },
  yearly_deposit: {
    no: "Årlig innskudd",
    en: "Yearly deposit",
  },
  timespan: {
    no: "Tidshorisont",
    en: "Timespan",
  },
  interest_per_year_in_percent: {
    no: "renter pr år i %",
    en: "interest per year in percent",
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
  investments_as_percent_of_surplus: {
    no: "Invisteringer som %",
    en: "Investments as % of surplus",
  },
  tax_and_expenses_as_percentage_of_total: {
    no: "Skatt & Utgifter i %",
    en: "Taxes and expenses in %",
  },
};

export type TranslationKey = keyof typeof translations;

export default (key: TranslationKey, language: Language) => {
  try {
    return translations[key.toString().toLowerCase()][language.toLowerCase()];
  } catch (error) {
    console.error(
      `translation > default | Could not find "${key
        .toString()
        .toLowerCase()}" for language "${language.toLowerCase()}"`
    );
    return null;
  }
};
