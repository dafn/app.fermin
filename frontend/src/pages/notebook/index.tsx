import { h } from "preact";
import { useState, useEffect, StateUpdater } from "preact/hooks";

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
        },
      }}
    >
      <main class={style.notebook}>
        <Notelist />
        <Notepad />
      </main>
    </Provider>
  );
};

export default Notebook;
