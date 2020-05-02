import { h } from "preact";

import style from "./dialog.module.scss";
import cn from "src/utils/cn";

interface Props extends h.JSX.HTMLAttributes<HTMLDialogElement> {
  message: string;
  children: h.JSX.Element | h.JSX.Element[];
  show: boolean;
}

const Dialog = ({ children, message, show, ...rest }: Props) => {
  return (
    <dialog
      class={`${style["dialog"]} ${cn({
        [style["visible"]]: show,
      })}`}
      aria-hidden={!show}
      {...rest}
    >
      <section>
        <h1 class="mdc-typography--subtitle1">{message}</h1>
        <div>{children}</div>
      </section>
    </dialog>
  );
};

export default Dialog;
