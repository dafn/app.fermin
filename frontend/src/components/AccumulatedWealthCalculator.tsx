import { h } from "preact";

import TextField from "preact-material-components/TextField";

import { useState, useEffect } from "preact/hooks";
import { NOK } from "src/utils/currency";

const calculate = (wealth = 0, investment = 0, years = 0, growth = 0) => {
  for (let i = 0; i < years; i++) {
    wealth += (growth * wealth) / 100;
    wealth += investment;
  }

  return NOK(wealth);
};

const AccumulatedWealthCalculator = () => {
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

  return (
    <section class={css["accumulated-wealth-calculator"]}>
      <h5 class="mdc-typography--headline5">Akkumulart formue</h5>
      <section class={css["inputs"]}>
        <TextField
          label="Nåværende Formue"
          outlined
          dense
          type="number"
          value={wealth}
          onInput={({ target }) => setWealth(target.value)}
          autocomplete="off"
        />
        <TextField
          label="Årlig invistering"
          outlined
          dense
          type="number"
          value={investment}
          onInput={({ target }) => setInvestment(target.value)}
          autocomplete="off"
        />
        <TextField
          label="År med avkastning"
          outlined
          dense
          type="number"
          value={years}
          onInput={({ target }) => setYears(target.value)}
          autocomplete="off"
        />
        <TextField
          label="Avkastning per år i %"
          outlined
          dense
          type="number"
          value={growth}
          onInput={({ target }) => setGrowth(target.value)}
          autocomplete="off"
        />
      </section>
      <p class="mdc-typography--body1"> {calculation} </p>
    </section>
  );
};

export default AccumulatedWealthCalculator;

css`
  .accumulated-wealth-calculator {
    > h5,
    > p {
      margin: 1rem 0;
    }
    .inputs {
      display: grid;
      grid-template-columns: repeat(4, auto);
      column-gap: 1rem;
    }
  }
`