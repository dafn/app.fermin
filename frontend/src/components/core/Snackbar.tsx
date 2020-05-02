import { h } from "preact";
import style from "./snackbar.module.scss";
import cn from "src/utils/cn";
import Icon from "preact-material-components/Icon";

interface Props extends h.JSX.HTMLAttributes<HTMLElement> {
  message: string;
  show: boolean;
  severity: "alert" | "error" | "info" | "success";
}

const Snackbar = ({ message, show, severity, ...rest }: Props) => {
  return (
    <aside
      class={`${style.snackbar} ${cn({
        [style["visible"]]: show,
      })}`}
      {...rest}
      aria-hidden={!show}
    >
      <div class={style[severity]}>
        <Icon></Icon>
        <p class="mdc-typography--subtitle2"> {message} </p>
      </div>
    </aside>
  );
};

export default Snackbar;
