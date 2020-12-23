import { h } from "preact";

import TextField from "src/components/core/TextField";

import { useState, useEffect } from "preact/hooks";
import { NOK } from "src/utils/currency";
import useTranslate from "src/i18n/useTranslate";

const calculate = (savings = 0, deposit = 0, timespan = 0, interest = 0) => {
  for (let i = 0; i < timespan; i++) {
    savings += (interest * savings) / 100 + deposit;
  }

  return NOK(savings);
};

const SavingsCalculator = () => {
  const [calculation, setCalculation] = useState("0");

  const [savings, setSavings] = useState("");
  const [deposit, setDeposit] = useState("");
  const [timespan, setTimespan] = useState("");
  const [interest, setInterest] = useState("");

  useEffect(() => {
    setCalculation(
      calculate(
        savings ? parseInt(savings) : undefined,
        deposit ? parseInt(deposit) : undefined,
        timespan ? parseInt(timespan) : undefined,
        interest ? parseInt(interest) : undefined
      )
    );
  }, [savings, deposit, timespan, interest]);

  const { t } = useTranslate();

  return (
    <section className={css["savings-calculator"]}>
      <h5 className="fermin-typography-headline">{t("accumulated_savings")}</h5>
      <section className={css["inputs"]}>
        <TextField
          label={t("current_savings")}
          type="number"
          value={savings}
          onInput={({ target }) => setSavings(target["value"])}
          autocomplete="off"
        />
        <TextField
          label={t("yearly_deposit")}
          type="number"
          value={deposit}
          onInput={({ target }) => setDeposit(target["value"])}
          autocomplete="off"
        />
        <TextField
          label={t("timespan")}
          type="number"
          value={timespan}
          onInput={({ target }) => setTimespan(target["value"])}
          autocomplete="off"
        />
        <TextField
          label={t("interest_per_year_in_percent")}
          type="number"
          value={interest}
          onInput={({ target }) => setInterest(target["value"])}
          autocomplete="off"
        />
      </section>
      <p className="fermin-typography-body"> {calculation} </p>
    </section>
  );
};

export default SavingsCalculator;

css`
  .savings-calculator {
    h5 {
      margin-bottom: 2rem;
    }
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
