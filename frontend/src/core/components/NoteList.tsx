import { h } from "preact";

import { useContext } from "preact/hooks";

import Card from "preact-material-components/Card";
import Fab from "preact-material-components/Fab";

import context from "src/pages/notebook/context";

import style from "./notelist.module.scss";

const Notelist = () => {
  const { notes, activeIndex, setActiveIndex } = useContext(context);

  return (
    <section class={style.notelist}>
      {notes.map((note, index) => (
        <Card
          class={`${style.card} ${index === activeIndex ? style.active : ""}`}
          onClick={() => index !== activeIndex && setActiveIndex(index)}
        >
          <h2 class="mdc-typography--subtitle2"> {note.title} </h2>
          <p class="mdc-typography--body2"> {note.content} </p>
        </Card>
      ))}
      <Fab ripple mini>
        <Fab.Icon>add</Fab.Icon>
      </Fab>
    </section>
  );
};

export default Notelist;
