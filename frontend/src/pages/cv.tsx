import { h } from "preact";

import CVSection from "src/components/CVSection";
import ListElement from "src/components/ListElement";

const CV = () => {
  return (
    <section className={css["cv"]}>
      <ListElement
        className={css["cv-list-element"]}
        src="https://fomantic-ui.com/images/avatar2/large/kristy.png"
        toggle="Eksporter"
        onToggle={(state) => {
          console.log(state);
        }}
        title="I am testing"
        content="this is the content"
        active
      />
    </section>
  );
};

export default CV;

css`
  .cv {
    .cv-list-element {
      margin: 1rem;
    }
  }
`;
