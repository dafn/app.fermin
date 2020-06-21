import { h } from "preact";

import AccumulatedWealthCalculator from "src/components/AccumulatedWealthCalculator";
import IndependentIncomeCalculator from "src/components/IndependentIncomeCalculator";

const Calculator = () => {
  return (
    <main className={css["calculator"]}>
      <section>
        <AccumulatedWealthCalculator />
        <IndependentIncomeCalculator />
      </section>
    </main>
  );
};

export default Calculator;

css`
  .calculator {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    background-color: var(--fermin-theme-background);
    > section {
      width: max-content;
      display: grid;
      row-gap: 2rem;
    }
  }
`;
