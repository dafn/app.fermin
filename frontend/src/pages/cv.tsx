import { h } from "preact";

import CVList from "src/components/CVList";
import CVEditor from "src/components/CVEditor";
import ListElement from "src/components/ListElement";

const CV = () => {
  return (
    <section className={css["cv"]}>
      <CVList />
      <CVEditor />
    </section>
  );
};

export default CV;

css`
  .cv {
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    background-color: var(--fermin-theme-background);
  }
`
