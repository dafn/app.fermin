import React, { useState, useEffect, useContext } from "react";
import update from "immutability-helper";
import ReactQuill from "react-quill";

import Context from "../../context";

import { NoteProps } from "./types";

import "./Note.sass";

let timer;

const Note = (props: NoteProps) => {
  const [note, setNote] = useState<Note>(),
    { state, actions } = useContext(Context),
    [activeKey, setActiveKey] = useState<number>();

  useEffect(() => {
    setNote(props.Note);
  }, [props.Note]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      ["clean"],
    ],
  };

  const handleOnSaveClick = (value = state.notes[state.activeKey].content) =>
    !state.saving &&
    !state.saved &&
    actions.upsertNote(state.notes[state.activeKey].id, value);

  const handleOnQuillChange = (value) => {
    if (value === note.content) return;
    setNote({ ...note, id: props.Note.id, content: value });
    actions.setState(
      update(state, {
        notes: { [state.activeKey]: { content: { $set: value } } },
      })
    );
    if (activeKey === state.activeKey) {
      clearTimeout(timer);
      timer = setTimeout(() => handleOnSaveClick(value), 1000);
    } else {
      setActiveKey(state.activeKey);
    }
  };

  state.saved && window.setTimeout(() => actions.endAlert(), 1000);

  return (
    <section id="Note_main_container">
      <button
        id="Note_save_button_button"
        className={`${state.saving ? "saving" : ""} ${
          state.saved ? "saved" : ""
        }`}
        onClick={() => handleOnSaveClick()}
      >
        {state.saved ? "Saved" : "Save"}
      </button>
      {note && (
        <ReactQuill
          id="editor"
          value={note.content}
          onChange={handleOnQuillChange}
          modules={modules}
        />
      )}
    </section>
  );
};

export default Note;
