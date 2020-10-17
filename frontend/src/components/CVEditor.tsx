import { h } from "preact";

import { useContext, useEffect, useRef } from "preact/hooks";
import ImageInput from "./core/ImageInput";

import context from "src/pages/context/cvContext";

let timer;

const CVEditor = () => {
  const { cvs, setCvs, activeIndex } = useContext(context);

  const title = useRef(null);
  const content = useRef(null);

  useEffect(() => {
    if (cvs.length) {
      title.current["value"] = cvs[activeIndex].title;
      content.current["value"] = cvs[activeIndex].content;
    }
  }, [cvs, activeIndex]);

  useEffect(() => {
    if (cvs.length < 1) {
      title.current["value"] = "";
      content.current["value"] = "";
    }
  });

  const saveNote = () => {
    cvs[activeIndex] = {
      ...cvs[activeIndex],
      title: title.current["value"],
      content: content.current["value"],
    };

    setCvs(cvs);
  };

  const handleInput = () => {
    clearTimeout(timer);
    timer = setTimeout(() => saveNote(), 500);
  };

  return (
    <section className={css["notepad"]}>
      <div className={css["title-image-container"]}>
        <ImageInput
          src="https://fomantic-ui.com/images/wireframe/image.png"
          className={css["cv-editor-image-input"]}
          onChange={(name, file) => {
            console.log(name, file);
          }}
        />
        <input
          type="text"
          ref={title}
          value={cvs.length > 0 ? cvs[activeIndex].title : ""}
          placeholder="Title"
          className="mdc-typography--subtitle2"
          onInput={handleInput}
        />
      </div>
      <textarea
        name="textarea"
        ref={content}
        placeholder="Description"
        className="mdc-typography--subtitle1"
        onInput={handleInput}
      ></textarea>
      <div className={css["details-container"]}>
        <input
          type="text"
          placeholder="Tags"
          className="mdc-typography--subtitle1"
        />
        <input
          type="text"
          placeholder="From"
          className="mdc-typography--subtitle1"
        />
        <input
          type="text"
          placeholder="To"
          className="mdc-typography--subtitle1"
        />
      </div>
    </section>
  );
};

export default CVEditor;

css`
  .notepad {
    display: grid;
    grid-template-rows: auto 1fr;
    background-color: var(--fermin-theme-background);
    margin: 6rem;
    .title-image-container {
      display: grid;
      grid-template-columns: auto 1fr;
      .cv-editor-image-input {
        margin-right: 2rem;
      }
    }
    .details-container {
      display: grid;
      grid-template-columns: 1fr auto auto;
      grid-column-gap: 1rem;
      input {
        font-size: 11pt;
      }
    }
    input,
    textarea {
      padding: 1rem;
      border: 1px dashed var(--fermin-light-on-dark);
      background-color: var(--fermin-theme-background);
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
