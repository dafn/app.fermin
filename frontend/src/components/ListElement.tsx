import { h } from "preact";
import cn from "src/utils/cn";
import Card from "./core/Card";
import { isKeyboardTrigger } from "src/utils/keyboard";

interface Props extends h.JSX.HTMLAttributes<HTMLDivElement> {
  active: boolean;
  title: string;
  content: string;
  onClick?: (
    event: h.JSX.TargetedEvent<HTMLElement, MouseEvent | KeyboardEvent>
  ) => void;
  onDelete?: () => void;
}

const ListElement = ({
  active,
  title,
  content,
  className,
  onClick = () => {},
  onDelete = () => {},
}: Props) => {
  return (
    <div
      className={`${css["card-container"]} ${cn({ [className]: !!className })}`}
    >
      <Card
        className={`${css["card"]} ${cn({
          [css["active"]]: active,
        })}`}
        onClick={onClick}
        onKeyUp={onClick}
      >
        <h2 className="mdc-typography--subtitle2"> {title} </h2>
        <p className="mdc-typography--body2"> {content} </p>
        <i
          className={`${cn({
            [css["show"]]: active,
          })} icon-trash`}
          tabIndex={0}
          onClick={onDelete}
          onKeyUp={(event) => {
            isKeyboardTrigger(event.code) && onDelete();
          }}
        />
      </Card>
    </div>
  );
};

export default ListElement;

css`
  .card-container {
    .card {
      display: grid;
      position: relative;
      grid-template-rows: 1fr 1fr;
      border-right: solid 2px var(--fermin-theme-surface);
      background-color: var(--fermin-theme-surface);
      height: 3rem;
      width: 18rem;
      padding: 1rem;
      transition: all 0.05s;
      cursor: pointer;
      &:hover,
      &:focus {
        outline: none;
        transform: scale(0.98);
      }
      h2,
      p {
        margin: 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      h2 {
        align-self: baseline;
      }
      p {
        align-self: end;
      }
      i {
        display: none;
        position: absolute;
        margin: 0.3rem;
        font-size: 12pt;
        transition: color 0.05s;
        color: var(--fermin-theme-icon-on-light);
        top: 0;
        right: 0;
        cursor: pointer;
        &.show {
          display: block;
        }
        &:hover,
        &:focus {
          outline: none;
          color: var(--fermin-theme-negative);
        }
      }
      &.active {
        border-right: solid 2px var(--fermin-theme-positive);
      }
    }
  }
`;
