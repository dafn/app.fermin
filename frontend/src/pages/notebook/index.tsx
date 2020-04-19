import { h } from "preact";

import style from "./index.module.scss";

import Notepad from "src/core/components/Notepad";

const Page = () => {
  return (
    <main class={style.notebook}>
      <section class={style.notes}>
        Notes
      </section>
      <Notepad />
    </main>
  );
};

export default Page;
