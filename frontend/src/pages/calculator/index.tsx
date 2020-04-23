import { h } from "preact";

import style from "./index.module.scss";

import AccumulatedWealthCalculator from "src/core/components/AccumulatedWealthCalculator";
import IndependentIncomeCalculator from "src/core/components/IndependentIncomeCalculator";
import { useContext } from "preact/hooks";

import { contexts } from "src/app/context";

const Calculator = () => {
  const { t } = useContext(contexts.translateContext);
  const { setLang } = useContext(contexts.languageContext);

  return (
    <main class={style.calculator}>
      <section>
        <AccumulatedWealthCalculator t={t} setLang={setLang} />
        <IndependentIncomeCalculator />
      </section>
    </main>
  );
};

export default Calculator;
