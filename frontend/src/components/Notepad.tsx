import { h } from "preact";

import { useContext, useEffect, useRef } from "preact/hooks";

import context from "src/pages/context/notebookContext";

let timer;

const Notepad = () => {
  const { notes, setNotes, activeIndex } = useContext(context);

  const title = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    if (notes.length) {
      title.current["value"] = notes[activeIndex].title;
      content.current["value"] = notes[activeIndex].content;
    }
  }, [notes, activeIndex]);

  useEffect(() => {
    if (notes.length < 1) {
      title.current["value"] = "";
      content.current["value"] = "";
    }
  });

  const saveNote = () => {
    notes[activeIndex] = {
      ...notes[activeIndex],
      title: title.current["value"],
      content: content.current["value"],
    };

    setNotes(notes);
  };

  const handleInput = () => {
    clearTimeout(timer);
    timer = setTimeout(() => saveNote(), 500);
  };

  return (
    <section className={css["notepad"]}>
      <input
        type="text"
        ref={title}
        value={notes.length > 0 ? notes[activeIndex].title : ""}
        placeholder="Title"
        className="mdc-typography--subtitle2"
        onInput={handleInput}
      />
      <textarea
        name="textarea"
        ref={content}
        placeholder="..."
        className="mdc-typography--subtitle1"
        onInput={handleInput}
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
