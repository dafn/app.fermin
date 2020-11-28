import { h } from "preact";

import { useContext, useEffect, useState } from "preact/hooks";

import ImageInput from "src/components/core/ImageInput";
import Card from "src/components/core/Card";

import context from "src/pages/context/cvContext";

let timer;

const CVEditor = () => {
  const { cvs, setCvs, activeIndex } = useContext(context);

  const [cv, setCv] = useState<CV>({});

  useEffect(() => {
    cvs[activeIndex] && setCv(cvs[activeIndex]);
  }, [activeIndex]);

  const saveCv = (cv?: CV) => {
    cvs[activeIndex] = {
      ...cvs[activeIndex],
      ...cv,
    };

    setCv(cvs[activeIndex]);
    setCvs(cvs);
  };

  const handleInput = (cv?: CV) => {
    clearTimeout(timer);
    timer = setTimeout(() => saveCv(cv), 500);
  };

  return (
    <Card className={css["cv-editor"]}>
      <div className={css["title-image-container"]}>
        <ImageInput
          src={cv.src}
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
          className="fermin-typography-headline"
          onInput={(event) => {
            handleInput({
              title: event.target["value"],
            });
          }}
          value={cv.title}
        />
      </div>
      <textarea
        name="textarea"
        placeholder="Description"
        className="fermin-typography-body"
        onInput={(event) => {
          handleInput({
            content: event.target["value"],
          });
        }}
        value={cv.content}
      ></textarea>
      <div className={css["details-container"]}>
        <input
          type="text"
          placeholder="Tags"
          className="fermin-typography-body"
          onInput={(event) => {
            handleInput({
              tags: event.target["value"],
            });
          }}
          value={cv.tags}
        />
        <input
          type="date"
          placeholder="From"
          className="fermin-typography-body"
          onInput={(event) => {
            handleInput({
              start_date: event.target["value"],
            });
          }}
          value={cv.start_date?.toString() || 0}
        />
        <input
          type="date"
          placeholder="To"
          className="fermin-typography-body"
          onInput={(event) => {
            handleInput({
              end_date: event.target["value"],
            });
          }}
          value={cv.end_date?.toString() || 0}
        />
      </div>
    </Card>
  );
};

export default CVEditor;

css`
  .cv-editor {
    display: grid;
    grid-template-rows: auto 1fr;
    background-color: var(--fermin-surface);
    padding: 1rem;
    .title-image-container {
      display: grid;
      grid-template-columns: auto 1fr;
      .cv-editor-image-input {
        height: 4rem;
        width: 4rem;
        img {
          max-height: 3rem;
          max-width: 3rem;
          height: auto;
          width: auto;
        }
      }
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
      background-color: inherit;
      border: none;
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
