import { h } from "preact";

import { useContext, useEffect, useState } from "preact/hooks";

import context from "src/pages/context/notebookContext";

let timer;

const Notepad = () => {
  const { notes, setNotes, activeIndex } = useContext(context);

  const [note, setNote] = useState<Note>({
    title: "",
    content: "",
  });

  useEffect(() => {
    notes[activeIndex] && setNote(notes[activeIndex]);
  }, [activeIndex]);

  const handleInput = (note?: Note) => {
    notes[activeIndex] = {
      ...notes[activeIndex],
      ...note,
    };

    setNote(notes[activeIndex]);

    clearTimeout(timer);
    timer = setTimeout(() => setNotes(notes), 500);
  };

  return (
    <section className={css["notepad"]}>
      <input
        type="text"
        placeholder="Title"
        className="fermin-typography-headline"
        onInput={(event) => {
          handleInput({
            title: event.target["value"],
            content: note.content,
          });
        }}
        value={note.title}
      />
      <textarea
        name="textarea"
        placeholder="..."
        className="fermin-typography-body"
        onInput={(event) => {
          handleInput({
            title: note.title,
            content: event.target["value"],
          });
        }}
        value={note.content}
      ></textarea>
    </section>
  );
};

export default Notepad;

css`
  .notepad {
    display: grid;
    grid-template-rows: auto 1fr;
    background-color: var(--fermin-background);
    margin: 6rem;
    input,
    textarea {
      padding: 1rem;
      border: none;
      background-color: var(--fermin-background);
      &:focus {
        outline: none;
      }
    }
    input {
      margin: 2rem 0;
      font-size: 14pt;
    }
    textarea {
      resize: none;
      font-size: 11pt;
    }
  }
`;
