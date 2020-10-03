import { h } from "preact";

import CVList from "src/components/CVList";
import ListElement from "src/components/ListElement";

const CV = () => {
  return (
    <section className={css["cv"]}>
      <CVList />
    </section>
  );
};

export default CV;

css`
  .cv {
    display: grid;
    grid-template-columns: auto 1fr;
  }
`
