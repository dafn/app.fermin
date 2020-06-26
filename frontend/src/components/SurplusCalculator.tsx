import { h } from "preact";

import TextField from "src/components/core/TextField";

import { useState, useEffect } from "preact/hooks";
import useTranslate from "src/i18n/useTranslate";
import { NOK } from "src/utils/currency";

interface Calculation {
  salarySurplus: string;
  incomeSurplus: string;
  totalSurplus: string;
}

const calculate = (income = 0, salary = 0, salaryTaxRate = 0): Calculation => {
  const phoneSubscription = 7000,
    pc = 5000,
    phone = 2000,
    transport = 9000,
    internet = 6000,
    aga = (14.1 * salary) / 100;

  const pension = (7 * salary) / 100;

  const utilities = phoneSubscription + pc + phone + transport + internet + aga,
    taxableIncome = income - utilities - salary - pension;

  const incomeTax = (22 * taxableIncome) / 100,
    incomeSurplus = taxableIncome - incomeTax;

  const salaryTax = (salaryTaxRate * salary) / 100,
    salarySurplus = salary - salaryTax;

  return {
    salarySurplus: NOK(salarySurplus),
    incomeSurplus: NOK(incomeSurplus),
    totalSurplus: NOK(salarySurplus + incomeSurplus),
  };
};

const SurplusCalculator = () => {
  const [calculation, setCalculation] = useState<Calculation>(undefined);

  const [income, setIncome] = useState("");
  const [salary, setSalary] = useState("");
  const [salaryTax, setSalaryTax] = useState("");

  const { t } = useTranslate();

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
    <section className={css["independent-income-calculator"]}>
      <h5 className="mdc-typography--headline5">{t("independent_earnings")}</h5>
      <section className={css["inputs"]}>
        <TextField
          label={t("gross_income")}
          type="number"
          value={income}
          onInput={({ target }) => setIncome(target["value"])}
          autocomplete="off"
        />
        <TextField
          label={t("salary")}
          type="number"
          value={salary}
          onInput={({ target }) => setSalary(target["value"])}
          autocomplete="off"
        />
        <TextField
          label={t("tax_on_salary")}
          type="number"
          value={salaryTax}
          onInput={({ target }) => setSalaryTax(target["value"])}
          autocomplete="off"
        />
      </section>
      <section>
        <p className="mdc-typography--body1">
          {t("total")} {calculation?.totalSurplus}
        </p>
        <p className="mdc-typography--body1">
          {t("corporate")} {calculation?.incomeSurplus}
        </p>
        <p className="mdc-typography--body1">
          {t("private")} {calculation?.salarySurplus}
        </p>
      </section>
    </section>
  );
};

export default SurplusCalculator;

css`
  .independent-income-calculator {
    section {
      display: flex;
      p {
        margin: 1rem 2rem 0 0;
      }
    }
    .inputs {
      display: grid;
      grid-template-columns: repeat(3, auto);
      column-gap: 1rem;
    }
  }
`;
