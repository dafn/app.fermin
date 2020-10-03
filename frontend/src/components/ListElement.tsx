import { h } from "preact";
import cn from "src/utils/cn";
import Card from "./core/Card";
import { isKeyboardTrigger } from "src/utils/keyboard";
import { useState } from "preact/hooks";

interface Props {
  active: boolean;
  title: string;
  content: string;
  src?: string;
  className?: string;
  toggle?: string;
  onToggle?: (toggleState: boolean) => void;
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
  toggle,
  src,
  onToggle = () => {},
  onClick = () => {},
  onDelete = () => {},
}: Props) => {
  const [toggleState, setToggleState] = useState(true);

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
        {src && <img src={src} />}
        <div>
          <h2 className="mdc-typography--subtitle2"> {title} </h2>
          <p className="mdc-typography--body2"> {content} </p>
        </div>
        {toggle && (
          <button
            className={cn({
              [css["toggle"]]: true,
              [css["toggled-on"]]: toggleState,
            })}
            onClick={() => {
              onToggle(!toggleState);
              setToggleState(!toggleState);
            }}
          >
            {toggle}
          </button>
        )}
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
      display: flex;
      position: relative;
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
      img {
        height: 48px;
        width: auto;
        margin-right: 1rem;
      }
      div {
        flex: 1;
        display: grid;
        grid-template-rows: 1fr 1fr;
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
      }
      button {
        position: absolute;
        top: 0rem;
        right: 2rem;
        padding-top: .3rem;
        padding-bottom: .2rem;
        background: var(--fermin-theme-surface);
        color: var(--fermin-theme-text);
        border: 1px dotted var(--fermin-theme-text);
        border-radius: 0 0px .25rem .25rem;
        &.toggled-on {
          background: var(--fermin-theme-positive);
          color: var(--fermin-light-on-dark);
          border: solid 1px var(--fermin-theme-positive);
        }
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
