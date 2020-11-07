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
      if (cvs[index].id) {
        removeById({ id: cvs[index].id }).then(() => {
          cvs.splice(index, 1);
          activeIndex
            ? setActiveIndex(Math.max(0, activeIndex - 1))
            : forceUpdate(!update);
        });
      } else {
        cvs.splice(index, 1);
        activeIndex
          ? setActiveIndex(Math.max(0, activeIndex - 1))
          : forceUpdate(!update);
      }
    },
    setCvs: (cvs: CV[], newCV?: boolean) => {
      if (!cvs[activeIndex]) {
        setCvs([...cvs, {}]);
      }

      let save: Promise<void | Response>;

      if (newCV) {
        cvs.push({});
        save = post(cvs[cvs.length - 1]);
      } else {
        save = put(cvs[activeIndex]);
      }

      save
        .then((response: Response) => response.json())
        .then((cv: CV) => {
          cvs[cvs.length - 1].id = cv[0].id;
          setActiveIndex(cvs.length - 1);
          setCvs(cvs);
        })
        .catch(() => forceUpdate(!update))
        .finally(() => {
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
      <main className={css["cv"]}>
        <CVList />
        <div className={css["editor-container"]}>
          <Button variant="positive" className={css["generate-pdf-button"]}>
            Generer PDF
          </Button>
          <CVEditor />
        </div>
        <Snackbar message="Saved!" show={snackbar} severity="info" />
      </main>
    </Provider>
  );
};

export default CV;

css`
  .cv {
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100%;
    background-color: var(--fermin-background);
    .editor-container {
      display: grid;
      grid-template-rows: auto 1fr;
      grid-row-gap: 2rem;
      padding: 2rem 8rem 3rem;
      .generate-pdf-button {
        width: max-content;
        justify-self: end;
      }
    }
    .snackbar {
      background-color: var(--fermin-positive-medium);
      min-width: 0;
      div {
        padding: 0;
      }
    }
  }
`;
