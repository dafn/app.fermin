import { h } from "preact";

import TextField from "preact-material-components/TextField";

import style from "./accumulatedWealthCalculator.module.scss";
import { useState } from "preact/hooks";

const AccumulatedWealthCalculator = () => {
  const [calculation, setCalculation] = useState(0);

  return (
    <section class={style["accumulated-wealth-calculator"]}>
      <h5 class="mdc-typography--headline5" >Accumulert formue </h5>
      <section class={style.inputs}>
        <TextField label="Current wealth" outlined dense />
        <TextField label="Annual deposit" outlined dense />
        <TextField label="years of return" outlined dense />
        <TextField label="interest per year" outlined dense />
      </section>
      <p class="mdc-typography--body1" > NOK {calculation} </p>
    </section>
  );
};

export default AccumulatedWealthCalculator;
