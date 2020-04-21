import { h } from "preact";

import { useContext, useRef } from "preact/hooks";

import Icon from "preact-material-components/Icon";
import Card from "preact-material-components/Card";
import Fab from "preact-material-components/Fab";
import Dialog from "preact-material-components/Dialog";

import context from "src/pages/notebook/context";

import style from "./notelist.module.scss";

const Notelist = () => {
  const {
    notes,
    setNotes,
    activeIndex,
    setActiveIndex,
    deleteNote,
  } = useContext(context);

  let deletePromt = useRef(null);

  const addNote = () => {
    notes.push({
      title: "",
      content: "",
    });
    setNotes(notes);
    setActiveIndex(notes.length - 1);
  };

  return (
    <section class={style.notelist}>
      {notes.length ? (
        notes.map((note, index) => (
          <Card
            class={`${style.card} ${index === activeIndex ? style.active : ""}`}
            onClick={() => index !== activeIndex && setActiveIndex(index)}
          >
            <h2 class="mdc-typography--subtitle2"> {note.title} </h2>
            <p class="mdc-typography--body2"> {note.content} </p>
            <Icon
              class={`${index === activeIndex ? style.show : ""}`}
              onClick={() => deletePromt["MDComponent"].show()}
            >
              delete_outline
            </Icon>
          </Card>
        ))
      ) : (
        <section class={style["empty-list"]}>
          <h2 class="mdc-typography--subtitle2">Empty list</h2>
        </section>
      )}
      <Fab ripple mini onClick={addNote}>
        <Fab.Icon>add</Fab.Icon>
      </Fab>
      <Dialog
        ref={(dialog) => (deletePromt = dialog)}
        onAccept={() => deleteNote(activeIndex)}
      >
        <Dialog.Header>Er du sikker på at du vil slette notatet?</Dialog.Header>
        <Dialog.Footer>
          <Dialog.FooterButton cancel>Nei</Dialog.FooterButton>
          <Dialog.FooterButton accept>Ja</Dialog.FooterButton>
        </Dialog.Footer>
      </Dialog>
    </section>
  );
};

export default Notelist;
