import { h } from "preact";

import style from "./notepad.module.scss";
import { useContext, useEffect, useRef } from "preact/hooks";

import context from "src/pages/notebook/context";

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
  }, [activeIndex]);

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
    <section class={style.notepad}>
      <input
        type="text"
        ref={title}
        value={notes.length > 0 ? notes[activeIndex].title : ""}
        placeholder="Title"
        class="mdc-typography--subtitle2"
        onInput={handleInput}
      />
      <textarea
        name="textarea"
        ref={content}
        placeholder="..."
        class="mdc-typography--subtitle1"
        onInput={handleInput}
      ></textarea>
    </section>
  );
};

export default Notepad;
