import { h } from "preact";

import { useContext, useRef } from "preact/hooks";
import ImageInput from "./core/ImageInput";

import context from "src/pages/context/cvContext";

let timer;

const CVEditor = () => {
  const { cvs, setCvs, activeIndex } = useContext(context);

  const title = useRef(null);
  const content = useRef(null);
  const start_date = useRef(null);
  const end_date = useRef(null);
  const tags = useRef(null);

  const saveCv = () => {
    cvs[activeIndex] = {
      ...cvs[activeIndex],
      title: title.current["value"],
      content: content.current["value"],
      start_date: start_date.current["value"],
      end_date: end_date.current["value"],
      tags: tags.current["value"],
    };

    setCvs(cvs);
  };

  const handleInput = () => {
    clearTimeout(timer);
    timer = setTimeout(() => saveCv(), 500);
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
          placeholder="Title"
          className="mdc-typography--subtitle2"
          onInput={handleInput}
          value={!cvs.length || cvs.length < 1 ? null : cvs[activeIndex].title}
        />
      </div>
      <textarea
        name="textarea"
        ref={content}
        placeholder="Description"
        className="mdc-typography--subtitle1"
        onInput={handleInput}
        value={!cvs.length || cvs.length < 1 ? null : cvs[activeIndex].content}
      ></textarea>
      <div className={css["details-container"]}>
        <input
          type="text"
          ref={tags}
          placeholder="Tags"
          className="mdc-typography--subtitle1"
          onInput={handleInput}
          value={!cvs.length || cvs.length < 1 ? null : cvs[activeIndex].tags}
        />
        <input
          type="date"
          ref={start_date}
          placeholder="From"
          className="mdc-typography--subtitle1"
          onInput={handleInput}
          value={
            !cvs.length || cvs.length < 1
              ? null
              : cvs[activeIndex].start_date?.toString()
          }
        />
        <input
          type="date"
          ref={end_date}
          placeholder="To"
          className="mdc-typography--subtitle1"
          onInput={handleInput}
          value={
            !cvs.length || cvs.length < 1
              ? null
              : cvs[activeIndex].end_date?.toString()
          }
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
