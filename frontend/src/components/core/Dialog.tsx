import { h } from "preact";

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

const style = `
  .dialog {
    position: fixed;
    display: grid;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background-color: var(--fermin-theme-overlay);
    pointer-events: none;
    opacity: 0;
    transition: all 0.2s;
    padding: 0;
    border: none;
    &.visible {
      pointer-events: all;
      opacity: 1;
    }
    section {
      background-color: var(--fermin-theme-surface);
      justify-self: center;
      align-self: center;
      display: grid;
      grid-template-rows: auto auto;
      border-radius: 4px;
      box-shadow: 0px 11px 15px -7px rgba(0, 0, 0, 0.2),
        0px 24px 38px 3px rgba(0, 0, 0, 0.14),
        0px 9px 46px 8px rgba(0, 0, 0, 0.12);
      h1 {
        padding: 0.6rem 2rem;
      }
      div {
        display: grid;
        grid-template-columns: 1fr auto;
        column-gap: 0.5rem;
        padding: 0.3rem;
        :first-child {
          width: min-content;
          justify-self: end;
        }
      }
    }
  }
`;
