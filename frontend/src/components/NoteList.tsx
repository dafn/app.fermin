import { h } from "preact";

import { useContext, useState } from "preact/hooks";

import context from "src/pages/context/notebookContext";

import Fab from "src/components/core/Fab";
import ListElement from "src/components/ListElement";
import ChoiceDialog from "src/components/ChoiceDialog";

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
          <h2 className="fermin-typography-subtitle">Empty list</h2>
        </section>
      )}
      <Fab className={css["fab"]} onClick={addNote}>
        <i className="icon-plus" />
      </Fab>
      <ChoiceDialog
        message="Er du sikker på at du vil slette notatet?"
        show={dialog}
        onAccept={() => {
          deleteNote(activeIndex);
          showDialog(false);
        }}
        onDecline={() => showDialog(false)}
      />
    </section>
  );
};

export default Notelist;

css`
  .notelist {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 1rem;
    overflow-y: scroll;
    min-width: 22rem;
    .list-element {
      margin-bottom: 1rem;
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
        margin: 0;
      }
    }
  }
`;
