import { h } from "preact";

import { useContext, useState } from "preact/hooks";

import Fab from "src/components/core/Fab";
import ChoiceDialog from "src/components/ChoiceDialog";
import ListElement from "src/components/ListElement";
import context from "src/pages/context/cvContext";

const CVList = () => {
  const { cvs, setCvs, activeIndex, setActiveIndex, deleteCv } = useContext(
    context
  );

  const [dialog, showDialog] = useState(false);

  return (
    <section className={css["notelist"]}>
      {cvs.length ? (
        cvs.map((cv, index) => (
          <ListElement
            className={css["list-element"]}
            title={cv.title}
            content={cv.content}
            active={index === activeIndex}
            src={cv.src || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"}
            toggle="+"
            onClick={() => index !== activeIndex && setActiveIndex(index)}
            onDelete={() => {
              showDialog(true);
            }}
          />
        ))
      ) : (
        <section className={css["empty-list"]}>
          <h2 className="fermin-typography-subtitle">Empty list</h2>
        </section>
      )}
      <Fab className={css["fab"]} onClick={() => setCvs(cvs, true)}>
        <i className="icon-plus" />
      </Fab>
      <ChoiceDialog
        message="Er du sikker på at vil slette cv-posten?"
        show={dialog}
        onAccept={() => {
          deleteCv(activeIndex);
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
    padding-top: 1rem;
    overflow-y: scroll;
    min-width: 22rem;
    .list-element {
      margin-bottom: 1rem;
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
        margin: 0;
      }
    }
  }
`;
