import { h } from "preact";

import style from "./index.module.scss";

import Notepad from "src/core/components/Notepad";
import Notelist from "src/core/components/NoteList";

const Page = () => {
  return (
    <main class={style.notebook}>
      <Notelist />
      <Notepad />
    </main>
  );
};

export default Page;
