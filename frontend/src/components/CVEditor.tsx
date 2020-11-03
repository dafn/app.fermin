import { h } from "preact";

import { useContext } from "preact/hooks";
import ImageInput from "./core/ImageInput";

import context from "src/pages/context/cvContext";

let timer;

const CVEditor = () => {
  const { cvs, setCvs, activeIndex } = useContext(context);

  const saveCv = (cv?: CV) => {
    cvs[activeIndex] = {
      ...cvs[activeIndex],
      ...cv,
    };

    setCvs(cvs);
  };

  const handleInput = (cv?: CV) => {
    clearTimeout(timer);
    timer = setTimeout(() => saveCv(cv), 500);
  };

  return (
    <section className={css["cv-editor"]}>
      <div className={css["title-image-container"]}>
        <ImageInput
          src={!cvs.length || cvs.length < 1 ? null : cvs[activeIndex].src}
          className={css["cv-editor-image-input"]}
          onChange={(_, file) => {
            handleInput({
              src: file,
            });
          }}
        />
        <input
          type="text"
          placeholder="Title"
          className="mdc-typography--subtitle2"
          onInput={(event) => {
            handleInput({
              title: event.target["value"],
            });
          }}
          value={!cvs.length || cvs.length < 1 ? null : cvs[activeIndex].title}
        />
      </div>
      <textarea
        name="textarea"
        placeholder="Description"
        className="mdc-typography--subtitle1"
        onInput={(event) => {
          handleInput({
            content: event.target["value"],
          });
        }}
        value={!cvs.length || cvs.length < 1 ? null : cvs[activeIndex].content}
      ></textarea>
      <div className={css["details-container"]}>
        <input
          type="text"
          placeholder="Tags"
          className="mdc-typography--subtitle1"
          onInput={(event) => {
            handleInput({
              tags: event.target["value"],
            });
          }}
          value={!cvs.length || cvs.length < 1 ? null : cvs[activeIndex].tags}
        />
        <input
          type="date"
          placeholder="From"
          className="mdc-typography--subtitle1"
          onInput={(event) => {
            handleInput({
              start_date: event.target["value"],
            });
          }}
          value={
            !cvs.length || cvs.length < 1
              ? null
              : cvs[activeIndex].start_date?.toString()
          }
        />
        <input
          type="date"
          placeholder="To"
          className="mdc-typography--subtitle1"
          onInput={(event) => {
            handleInput({
              end_date: event.target["value"],
            });
          }}
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
  .cv-editor {
    display: grid;
    grid-template-rows: auto 1fr;
    background-color: var(--fermin-theme-background);
    margin: 6rem;
    .title-image-container {
      display: grid;
      grid-template-columns: auto 1fr;
    }
    .details-container {
      display: grid;
      grid-template-columns: 1fr auto auto;
      input {
        font-size: 11pt;
      }
    }
    input,
    textarea {
      padding: 1rem;
      border: 1px solid var(--fermin-light-on-dark);
      background-color: var(--fermin-theme-background);
      &:focus {
        outline: none;
      }
    }
    input {
      font-size: 14pt;
    }
    textarea {
      resize: none;
      font-size: 11pt;
    }
  }
`;
