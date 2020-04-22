import { h } from "preact";

import TextField from "preact-material-components/TextField";

import style from "./independentIncomeCalculator.module.scss";
import { useState } from "preact/hooks";

const IndependentIncomeCalculator = () => {
  const [calculation, setCalculation] = useState(0);

  return (
    <section class={style["independent-income-calculator"]}>
      <h5 class="mdc-typography--headline5" >Accumulert formue </h5>
      <section class={style.inputs}>
        <TextField label="Gross income" outlined dense />
        <TextField label="Salary" outlined dense />
        <TextField label="Personal income tax" outlined dense />
      </section>
      <p class="mdc-typography--body1" > NOK {calculation} </p>
    </section>
  );
};

export default IndependentIncomeCalculator;
