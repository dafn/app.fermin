import { h } from "preact";

import TextField from "src/components/core/TextField";

import { useState, useEffect } from "preact/hooks";
import useTranslate from "src/i18n/useTranslate";
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
          {t("total")} {calculation?.totalProfit}
        </p>
        <p className="mdc-typography--body1">
          {t("corporate")} {calculation?.corporateProfit}
        </p>
        <p className="mdc-typography--body1">
          {t("private")} {calculation?.personalProfit}
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
