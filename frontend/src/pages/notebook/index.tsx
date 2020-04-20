import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

import Snackbar from "preact-material-components/Snackbar";

import style from "./index.module.scss";

import Notepad from "src/core/components/Notepad";
import Notelist from "src/core/components/NoteList";

import { get_all } from "src/api/notes";
import { Provider } from "./context";

const Notebook = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [init, setInit] = useState<boolean>(true);
  const [update, forceUpdate] = useState<boolean>(true);

  let snackbar = useRef(null);

  useEffect(() => {
    if (init) {
      get_all().then((notes) => {
        setNotes(notes);
      });

      setInit(false);
    }
  }, [update]);

  return (
    <Provider
      value={{
        notes,
        activeIndex,
        setActiveIndex,
        setNotes: (notes: Note[]) => {
          setNotes(notes);
          forceUpdate(!update);
          snackbar["MDComponent"].show({
            message: "Saved",
          });
        },
      }}
    >
      <main class={style.notebook}>
        <Notelist />
        <Notepad />
        <Snackbar
          class={style.snackbar}
          ref={(bar) => {
            snackbar = bar;
          }}
        />
      </main>
    </Provider>
  );
};

export default Notebook;
