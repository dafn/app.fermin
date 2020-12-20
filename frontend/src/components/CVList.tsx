import { h } from "preact";

import { useContext, useState } from "preact/hooks";

import Fab from "src/components/core/Fab";
import ChoiceDialog from "src/components/ChoiceDialog";
import ListElement from "src/components/ListElement";
import context from "src/pages/context/cvContext";
import ListSection from "src/components/ListSection";
import DropDown from "src/components/core/DropDown";

const CVList = () => {
  const { cvs, setCvs, activeIndex, setActiveIndex, deleteCv } = useContext(
    context
  );

  const [dialog, showDialog] = useState(false);

  return (
    <section className={css["notelist"]}>
      <ListSection header="Prosjekter">
        {cvs.map((cv, index) =>
          typeof cv.category !== "string" ? (
            <ListElement
              className={css["list-element"]}
              title={cv.title}
              content={cv.content}
              active={index === activeIndex}
              src={
                cv.src ||
                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png"
              }
              toggle="+"
              onClick={() => index !== activeIndex && setActiveIndex(index)}
              onDelete={() => {
                showDialog(true);
              }}
            />
          ) : null
        )}
      </ListSection>
      <DropDown title="Legg til" items={["test", "test2"]} />
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
  }
`;
