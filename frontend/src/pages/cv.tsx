import { h } from "preact";

import CVList from "src/components/CVList";
import CVEditor from "src/components/CVEditor";
import Button from "src/components/core/Button";

const CV = () => {
  return (
    <section className={css["cv"]}>
      <CVList />
      <CVEditor />
      <Button variant="positive" className={css["generate-pdf-button"]}>
        Generer PDF
      </Button>
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
    .generate-pdf-button {
      position: absolute;
      right: 1rem;
      top: 1rem;
    }
  }
`;
