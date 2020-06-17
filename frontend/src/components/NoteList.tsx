import { h } from "preact";

import { useContext, useState } from "preact/hooks";

import Card from "preact-material-components/Card";
import Button from "preact-material-components/Button";
import Fab from "src/components/core/Fab";

import Dialog from "./core/Dialog";

import context from "src/pages/context/notebookContext";
import cn from "src/utils/cn";

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
    <section class={css["notelist"]}>
      {notes.length ? (
        notes.map((note, index) => (
          <Card
            class={`${css["card"]} ${cn({
              [css["active"]]: index === activeIndex,
            })}`}
            onClick={() => index !== activeIndex && setActiveIndex(index)}
          >
            <h2 class="mdc-typography--subtitle2"> {note.title} </h2>
            <p class="mdc-typography--body2"> {note.content} </p>
            <i
              class={`${cn({
                [css["show"]]: index === activeIndex,
              })} icon-trash`}
              onClick={() => showDialog(true)}
            />
          </Card>
        ))
      ) : (
        <section class={css["empty-list"]}>
          <h2 class="mdc-typography--subtitle2">Empty list</h2>
        </section>
      )}
      <Fab onClick={addNote}>
        <i class="icon-plus" />
      </Fab>
      <Dialog message="Er du sikker på at vil slette notatet?" show={dialog}>
        <Button dense onClick={() => showDialog(false)}>
          Cancel
        </Button>
        <Button
          dense
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
    button {
      background-color: var(--fermin-theme-positive);
    }
    .empty-list,
    .card {
      display: grid;
      position: relative;
      height: 5rem;
      width: 20rem;
      margin: 0 1rem 1rem 1rem;
    }
    .card {
      grid-template-rows: 1fr 1fr;
      border-right: solid 2px var(--fermin-theme-surface);
      background-color: var(--fermin-theme-surface);
      padding: 1rem;
      transition: all 0.05s;
      cursor: pointer;
      &:hover {
        transform: scale(0.99);
      }
      h2,
      p {
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      h2 {
        align-self: baseline;
      }
      p {
        align-self: end;
      }
      i {
        display: none;
        position: absolute;
        margin: 0.3rem;
        font-size: 12pt;
        transition: color 0.05s;
        color: var(--fermin-theme-icon-on-light);
        right: 0;
        cursor: pointer;
        &.show {
          display: block;
        }
        &:hover {
          color: var(--fermin-theme-negative);
        }
      }
    }
    .empty-list {
      grid-row: 1fr;
      h2 {
        align-self: center;
        justify-self: center;
        color: var(--fermin-theme-placeholder);
        margin: 0;
      }
    }
    .active {
      border-right: solid 2px var(--fermin-theme-positive);
    }
  }
`;
