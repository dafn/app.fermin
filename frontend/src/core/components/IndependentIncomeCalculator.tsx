import { h } from "preact";

import TextField from "preact-material-components/TextField";

import style from "./independentIncomeCalculator.module.scss";
import { useState, useEffect } from "preact/hooks";
import { NOK } from "src/utils/currency";

interface Calculation {
  personalProfit: string;
  corporateProfit: string;
  totalProfit: string;
}

const calculate = (income = 0, salary = 0, salaryTax = 0): Calculation => {
  const phoneSubscription = 7000,
    pc = 5000,
    phone = 2000,
    transport = 9000,
    internet = 6000,
    aga = (14.1 * salary) / 100;

  const pension = (7 * salary) / 100;

  const expences = phoneSubscription + pc + phone + transport + internet + aga,
    taxableCorporateIncome = income - expences - salary - pension;

  const coperateIncomeTax = (22 * taxableCorporateIncome) / 100,
    coperateProfits = taxableCorporateIncome - coperateIncomeTax;

  const personalIncomeTax = (salaryTax * salary) / 100,
    postTaxSalary = salary - personalIncomeTax;

  return {
    personalProfit: NOK(postTaxSalary),
    corporateProfit: NOK(coperateProfits),
    totalProfit: NOK(postTaxSalary + coperateProfits),
  };
};

const IndependentIncomeCalculator = () => {
  const [calculation, setCalculation] = useState<Calculation>(undefined);

  const [income, setIncome] = useState("");
  const [salary, setSalary] = useState("");
  const [salaryTax, setSalaryTax] = useState("");

  useEffect(() => {
    setCalculation(
      calculate(
        income ? parseInt(income) : undefined,
        salary ? parseInt(salary) : undefined,
        salaryTax ? parseInt(salaryTax) : undefined
      )
    );
  }, [income, salary, salaryTax]);

  return (
    <section class={style["independent-income-calculator"]}>
      <h5 class="mdc-typography--headline5">Selvstendig Konsulent Overskudd</h5>
      <section class={style.inputs}>
        <TextField
          label="Brutto inntekt"
          outlined
          dense
          type="number"
          value={income}
          onInput={({ target }) => setIncome(target.value)}
          autocomplete="off"
        />
        <TextField
          label="Lønn"
          outlined
          dense
          type="number"
          value={salary}
          onInput={({ target }) => setSalary(target.value)}
          autocomplete="off"
        />
        <TextField
          label="Skatt på lønn i %"
          outlined
          dense
          type="number"
          value={salaryTax}
          onInput={({ target }) => setSalaryTax(target.value)}
          autocomplete="off"
        />
      </section>
      <p class="mdc-typography--body1">Total {calculation?.totalProfit}</p>
      <p class="mdc-typography--body1">
        Corporate {calculation?.corporateProfit}
      </p>
      <p class="mdc-typography--body1">
        Personal {calculation?.personalProfit}
      </p>
    </section>
  );
};

export default IndependentIncomeCalculator;
