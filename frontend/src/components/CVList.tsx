import { h } from "preact";

import { useState } from "preact/hooks";

import Fab from "src/components/core/Fab";
import ChoiceDialog from "src/components/ChoiceDialog";
import ListElement from "src/components/ListElement";

const CVList = () => {
  const [dialog, showDialog] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const cvs = [
    {
      title: "Telia",
      content: "Telia er et telekomselskap som oppererer i hhele norden",
      src: "https://fomantic-ui.com/images/avatar2/large/kristy.png",
    },
    {
      title: "Buypass",
      content:
        "Buypass er nordens største TLS utgiver og har kontorer i 4 land",
      src: "https://fomantic-ui.com/images/avatar2/large/molly.png",
    },
  ];

  const addCV = () => {
    cvs.push({
      title: `${new Date().getTime()}`,
      content: `${new Date().getTime()}${new Date().getTime()}`,
      src: "https://fomantic-ui.com/images/wireframe/image.png",
    });
  };

  const deleteCV = (index) => {
    delete cvs[index];
  };

  return (
    <section className={css["notelist"]}>
      {cvs.length ? (
        cvs.map((cv, index) => (
          <ListElement
            className={css["list-element"]}
            title={cv.title}
            content={cv.content}
            active={index === activeIndex}
            src={cv.src}
            toggle="Inkluder"
            onClick={() => index !== activeIndex && setActiveIndex(index)}
            onDelete={() => {
              showDialog(true);
            }}
          />
        ))
      ) : (
        <section className={css["empty-list"]}>
          <h2 className="mdc-typography--subtitle2">Empty list</h2>
        </section>
      )}
      <Fab className={css["fab"]} onClick={addCV}>
        <i className="icon-plus" />
      </Fab>
      <ChoiceDialog
        message="Er du sikker på at vil slette cv-posten?"
        show={dialog}
        onAccept={() => {
          deleteCV(activeIndex);
          showDialog(false);
        }}
        onDecline={() => showDialog(false)}
      />
    </section>
  );
};

export default CVList;

css`
  .notelist {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--fermin-theme-tertiary);
    padding-top: 1rem;
    overflow-y: scroll;
    min-width: 22rem;
    .list-element {
      margin-bottom: 1rem;
    }
    .fab {
      background-color: var(--fermin-theme-positive);
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
        color: var(--fermin-theme-placeholder);
        margin: 0;
      }
    }
  }
`;
