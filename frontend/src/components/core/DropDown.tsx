import { h } from "preact";
import { Ref, useEffect, useRef, useState } from "preact/hooks";
import cn from "src/utils/cn";

interface Props {
  className?: string;
  title?: string;
  items: string[];
  onClick?: (event: h.JSX.TargetedEvent<HTMLElement, MouseEvent>) => void;
}

const DropDown = ({ title, items, className }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const dropdown = useRef(null);

  const clickListener = (e: any, ref: Ref<HTMLElement>) => {
    if (!ref.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", (e) => clickListener(e, dropdown));
  }, []);

  useEffect(() => {
    return window.removeEventListener("click", (e) =>
      clickListener(e, dropdown)
    );
  }, []);

  return (
    <div className={css["drop-down-container"]}>
      <div
        className={`${css["drop-down"]} ${cn({
          [css["open"]]: showMenu,
          [className]: !!className,
        })}`}
        ref={dropdown}
        role="select"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <p>{title ? title : items[activeIndex]}</p>
        <div
          className={`${css["menu"]} ${cn({
            [css["open"]]: showMenu,
          })}`}
        >
          {items.map((item, index) => (
            <div
              className={css["menu-item"]}
              role="option"
              key={index}
              onClick={() => {
                setActiveIndex(index);
              }}
            >
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDown;

css`
  .drop-down {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 0;
    width: 80px;
    cursor: pointer;
    user-select: none;
    border: 1px solid var(--fermin-background-contrast);
    border-radius: 4px;
    padding: 1rem 0;
    &.open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom: unset;
    }
    .menu {
      display: none;
      position: absolute;
      top: 30px;
      text-overflow: ellipsis;
      overflow: visible;
      border: 1px solid var(--fermin-background-contrast);
      border-top: unset;
      border-radius: 0 0 4px 4px;
      width: inherit;
      &.open {
        display: flex;
        flex-direction: column;
      }
      .menu-item {
        &:hover {
          background-color: var(--fermin-error-dark);
        }
      }
    }
  }
`;
