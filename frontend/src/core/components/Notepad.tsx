import { h } from "preact";

import style from "./notepad.module.scss";

const Notepad = () => {
  return (
    <section class={style.notepad}>
      <input type="text" placeholder="Title"/>
      <textarea
        name="textarea"
        placeholder="..."
      ></textarea>
    </section>
  );
};

export default Notepad;
