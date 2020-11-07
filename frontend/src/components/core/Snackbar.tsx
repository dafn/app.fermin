import { h } from "preact";
import cn from "src/utils/cn";

interface Props extends h.JSX.HTMLAttributes<HTMLElement> {
  message: string;
  show: boolean;
  severity: "alert" | "error" | "info" | "success";
}

const Snackbar = ({ message, show, severity, ...rest }: Props) => {
  return (
    <aside
      className={`${css["snackbar"]} ${cn({
        [css["visible"]]: show,
      })}`}
      {...rest}
      aria-hidden={!show}
    >
      <div className={css[severity]}>
        <p className="mdc-typography--subtitle2"> {message} </p>
      </div>
    </aside>
  );
};

export default Snackbar;

css`
  .snackbar {
    position: absolute;
    left: 50%;
    bottom: 1.5rem;
    transition: all 0.1s;
    cursor: default;
    pointer-events: none;
    opacity: 0;
    &.visible {
      pointer-events: all;
      opacity: 1;
    }
    div {
      position: relative;
      left: -50%;
      padding: 0.6rem 1rem;
      border-radius: 4px;
      box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
        0px 6px 10px 0px rgba(0, 0, 0, 0.14),
        0px 1px 18px 0px rgba(0, 0, 0, 0.12);
      p {
        margin: 0;
      }
      &.alert {
        background-color: var(--fermin-alert-medium);
        p {
          color: var(--fermin-alert-medium-contrast);
        }
      }
      &.error {
        background-color: var(--fermin-error-medium);
        p {
          color: var(--fermin-error-medium-contrast);
        }
      }
      &.info {
        background-color: var(--fermin-info-medium);
        p {
          color: var(--fermin-info-medium-contrast);
        }
      }
      &.success {
        background-color: var(--fermin-positive-medium);
        p {
          color: var(--fermin-positive-medium-contrast);
        }
      }
    }
  }
`;
