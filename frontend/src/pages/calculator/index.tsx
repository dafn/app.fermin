import { h } from "preact";

import style from "./index.module.scss";

import AccumulatedWealthCalculator from "src/components/AccumulatedWealthCalculator";
import IndependentIncomeCalculator from "src/components/IndependentIncomeCalculator";

const Calculator = () => {
  return (
    <main class={style.calculator}>
      <section>
        <AccumulatedWealthCalculator />
        <IndependentIncomeCalculator />
      </section>
    </main>
  );
};

export default Calculator;
