import { h } from "preact";

import TextField from "preact-material-components/TextField";

import style from "./accumulatedWealthCalculator.module.scss";
import { useState } from "preact/hooks";

const AccumulatedWealthCalculator = () => {
  const [calculation, setCalculation] = useState(0);

  return (
    <section class={style["accumulated-wealth-calculator"]}>
      <h5 class="mdc-typography--headline5">Akkumulert formue </h5>
      <section class={style.inputs}>
        <TextField label="Nåværende Formue" outlined dense />
        <TextField label="Årlig invistering" outlined dense />
        <TextField label="År med avkastning" outlined dense />
        <TextField label="Avkastning per år i %" outlined dense />
      </section>
      <p class="mdc-typography--body1"> NOK {calculation} </p>
    </section>
  );
};

export default AccumulatedWealthCalculator;
