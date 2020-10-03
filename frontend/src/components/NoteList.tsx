import { h } from "preact";

import { useContext, useState } from "preact/hooks";

import Button from "src/components/core/Button";
import Fab from "src/components/core/Fab";

import Dialog from "./core/Dialog";

import context from "src/pages/context/notebookContext";
import ListElement from "./ListElement";

const Notelist = () => {
  const {
    notes,
    setNotes,
    activeIndex,
    setActiveIndex,
    deleteNote,
  } = useContext(context);

  const [dialog, showDialog] = useState(false);

  const addNote = () => {
    notes.push({
      title: "",
      content: "",
    });
    setNotes(notes);
    setActiveIndex(notes.length - 1);
  };

  return (
    <section className={css["notelist"]}>
      {notes.length ? (
        notes.map((note, index) => (
          <ListElement
            className={css["list-element"]}
            title={note.title}
            content={note.content}
            active={index === activeIndex}
            onClick={() => index !== activeIndex && setActiveIndex(index)}
            onDelete={() => {
              showDialog(true);
            }}
          />
        ))
      ) : (
        <section className={css["empty-list"]}>
          <h2 className="mdc-typography--subtitle2">Empty list</h2>
        </section>
      )}
      <Fab className={css["fab"]} onClick={addNote}>
        <i className="icon-plus" />
      </Fab>
      <Dialog message="Er du sikker på at vil slette notatet?" show={dialog}>
        <Button variant="primary" contained onClick={() => showDialog(false)}>
          Cancel
        </Button>
        <Button
          variant="primary"
          contained
          onClick={() => {
            deleteNote(activeIndex);
            showDialog(false);
          }}
        >
          Accept
        </Button>
      </Dialog>
    </section>
  );
};

export default Notelist;

css`
  .notelist {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--fermin-theme-tertiary);
    padding-top: 1rem;
    overflow-y: scroll;
    min-width: 22rem;
    .list-element {
      margin-bottom: 1rem;
    }
    .fab {
      background-color: var(--fermin-theme-positive);
    }
    .empty-list {
      display: grid;
      position: relative;
      height: 3rem;
      width: 18rem;
      margin: 0 1rem 1rem 1rem;
      grid-row: 1fr;
      h2 {
        align-self: center;
        justify-self: center;
        color: var(--fermin-theme-placeholder);
        margin: 0;
      }
    }
  }
`;
