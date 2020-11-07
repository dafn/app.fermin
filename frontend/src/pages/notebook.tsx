import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import Notepad from "src/components/Notepad";
import Notelist from "src/components/NoteList";
import Snackbar from "src/components/core/Snackbar";

import { getAll, post, put, removeById } from "src/api/notes";
import { Provider } from "./context/notebookContext";

const Notebook = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [init, setInit] = useState<boolean>(true);
  const [update, forceUpdate] = useState<boolean>(true);
  const [snackbar, showSnackbar] = useState<boolean>(false);

  useEffect(() => {
    if (init) {
      getAll().then((notes) => {
        setNotes(notes);
      });

      setInit(false);
    }
  }, [update]);

  const actions = {
    setActiveIndex,
    deleteNote: (index: number) => {
      if (notes[index].id)
        removeById({ id: notes[index].id }).then(() => {
          notes.splice(index, 1);
          activeIndex ? setActiveIndex(0) : forceUpdate(!update);
        });
      else {
        notes.splice(index, 1);
        activeIndex ? setActiveIndex(0) : forceUpdate(!update);
      }
    },
    setNotes: (notes: Note[]) => {
      setNotes(notes);

      const index = activeIndex;
      const { id, title, content } = notes[index];

      if (!title && !content) return forceUpdate(!update);

      const save = notes[index].id
        ? put({ id, title, content })
        : post({ title, content });

      save
        .then((response: Response) => response.json())
        .then((note: Note[]) => {
          notes[index].id = note[0].id;
          setNotes(notes);
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
        notes,
        activeIndex,
        ...actions,
      }}
    >
      <main className={css["notebook"]}>
        <Notelist />
        <Notepad />
      </main>
      <Snackbar message="Saved!" show={snackbar} severity="info" />
    </Provider>
  );
};

export default Notebook;

css`
  .notebook {
    display: grid;
    grid-template-columns: auto 1fr;
    width: 100vw;
    background-color: var(--fermin-background);
    .snackbar {
      background-color: var(--fermin-positive-medium);
      min-width: 0;
      div {
        padding: 0;
      }
    }
  }
`;
