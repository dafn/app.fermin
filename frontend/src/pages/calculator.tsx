import { h } from "preact";

import SavingsCalculator from "src/components/SavingsCalculator";
import SurplusCalculator from "src/components/SurplusCalculator";

const Calculator = () => {
  return (
    <main className={css["calculator"]}>
      <section>
        <SavingsCalculator />
        <SurplusCalculator />
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
