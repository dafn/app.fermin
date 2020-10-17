import { h } from "preact";

import CVList from "src/components/CVList";
import CVEditor from "src/components/CVEditor";
import Button from "src/components/core/Button";
import { useEffect, useState } from "preact/hooks";
import { getAll, post, put, removeById } from "src/api/cv";
import Snackbar from "src/components/core/Snackbar";

import { Provider } from "./context/cvContext";

const CV = () => {
  const [cvs, setCvs] = useState<CV[]>([]);
  const [init, setInit] = useState<boolean>(true);
  const [update, forceUpdate] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [snackbar, showSnackbar] = useState<boolean>(false);

  useEffect(() => {
    if (init) {
      getAll().then((cvs) => {
        setCvs(cvs);
      });

      setInit(false);
    }
  }, [update]);

  const actions = {
    setActiveIndex,
    deleteCv: (index: number) => {
      if (cvs[index].id)
        removeById({ id: cvs[index].id }).then(() => {
          cvs.splice(index, 1);
          activeIndex ? setActiveIndex(0) : forceUpdate(!update);
        });
      else {
        cvs.splice(index, 1);
        activeIndex ? setActiveIndex(0) : forceUpdate(!update);
      }
    },
    setCvs: (cvs: CV[]) => {
      setCvs(cvs);

      const index = activeIndex;
      const { id, title, content, start_date, end_date, src, tags } = cvs[
        index
      ];

      if (!title && !content) return forceUpdate(!update);

      const save = cvs[index].id
        ? put({ id, title, content, start_date, end_date, src, tags })
        : post({ title, content, start_date, end_date, src, tags });

      save
        .then((cv) => (cv: CV) => {
          cv.id = cv[0].id;
          setCvs(cvs);
        })
        .catch(() => {})
        .finally(() => {
          forceUpdate(!update);
          showSnackbar(true);
          setTimeout(() => {
            showSnackbar(false);
          }, 2000);
        });
    },
  };

  return (
    <Provider
      value={{
        cvs,
        activeIndex,
        ...actions,
      }}
    >
      <section className={css["cv"]}>
        <CVList />
        <CVEditor />
        <Button variant="positive" className={css["generate-pdf-button"]}>
          Generer PDF
        </Button>
        <Snackbar message="Saved!" show={snackbar} severity="info" />
      </section>
    </Provider>
  );
};

export default CV;

css`
  .cv {
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    background-color: var(--fermin-theme-background);
    .generate-pdf-button {
      position: absolute;
      right: 1rem;
      top: 1rem;
    }
    .snackbar {
      background-color: var(--fermin-theme-positive);
      min-width: 0;
      div {
        padding: 0;
      }
    }
  }
`;
