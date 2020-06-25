import { h } from "preact";

import TextField from "src/components/core/TextField";

import { useState, useEffect } from "preact/hooks";
import { NOK } from "src/utils/currency";
import useTranslate from "src/i18n/useTranslate";

const calculate = (wealth = 0, investment = 0, years = 0, growth = 0) => {
  for (let i = 0; i < years; i++) {
    wealth += (growth * wealth) / 100 + investment;
  }

  return NOK(wealth);
};

const SavingsCalculator = () => {
  const [calculation, setCalculation] = useState("0");

  const [wealth, setWealth] = useState("");
  const [investment, setInvestment] = useState("");
  const [years, setYears] = useState("");
  const [growth, setGrowth] = useState("");

  useEffect(() => {
    setCalculation(
      calculate(
        wealth ? parseInt(wealth) : undefined,
        investment ? parseInt(investment) : undefined,
        years ? parseInt(years) : undefined,
        growth ? parseInt(growth) : undefined
      )
    );
  }, [wealth, investment, years, growth]);

  const { t } = useTranslate();

  return (
    <section className={css["accumulated-wealth-calculator"]}>
      <h5 className="mdc-typography--headline5">{t("accumulated_wealth")}</h5>
      <section className={css["inputs"]}>
        <TextField
          label={t("current_savings")}
          type="number"
          value={wealth}
          onInput={({ target }) => setWealth(target["value"])}
          autocomplete="off"
        />
        <TextField
          label={t("yearly_deposit")}
          type="number"
          value={investment}
          onInput={({ target }) => setInvestment(target["value"])}
          autocomplete="off"
        />
        <TextField
          label={t("timespan")}
          type="number"
          value={years}
          onInput={({ target }) => setYears(target["value"])}
          autocomplete="off"
        />
        <TextField
          label={t("interest_per_year_in_percent")}
          type="number"
          value={growth}
          onInput={({ target }) => setGrowth(target["value"])}
          autocomplete="off"
        />
      </section>
      <p className="mdc-typography--body1"> {calculation} </p>
    </section>
  );
};

export default SavingsCalculator;

css`
  .accumulated-wealth-calculator {
    p {
      margin: 1rem 2rem 0 0;
    }
    .inputs {
      display: grid;
      grid-template-columns: repeat(4, auto);
      column-gap: 1rem;
    }
  }
`;
