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
      <i class="icon-angle-down"></i>
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
  );
};

export default DropDown;

css`
  .drop-down {
    display: grid;
    grid-template-columns: 1fr min-content;
    column-gap: 1rem;
    position: relative;
    cursor: pointer;
    user-select: none;
    background-color: var(--fermin-surface);
    border: 1px solid var(--fermin-surface-contrast);
    border-radius: 4px;
    padding: 0.4rem 1rem;
    p, i {
      align-self: center;
      margin: 0;
    }
    &.open {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      i {
        transform: rotate(-180deg);
      }
    }
    .menu {
      display: none;
      position: absolute;
      top: 32px;
      left: -1px;
      right: -1px;
      text-overflow: ellipsis;
      overflow: visible;
      background-color: inherit;
      border: 1px solid var(--fermin-surface-contrast);
      border-radius: 0 0 4px 4px;
      transition: opacity 0.3s;
      opacity: 0;
      &.open {
        display: flex;
        flex-direction: column;
        opacity: 1;
        z-index: 1000;
      }
      .menu-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 28px;
        p {
          margin: 0;
        }
        &:hover {
          background-color: var(--fermin-error-dark);
        }
      }
    }
  }
`;
