import { h } from "preact";
import { Ref, useEffect, useRef, useState } from "preact/hooks";
import cn from "src/utils/cn";
import Card from "./Card";

interface Props {
  title?: string;
  items: string[];
  className?: string;
  onChange?: (chosenIndex: number) => void;
}

const DropDown = ({ title, items, className, onChange }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(false);

  const dropdown = useRef(null);

  const clickListener = (e: any, ref: Ref<HTMLElement>) => {
    if (!ref.current?.contains(e.target)) {
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
      className={`${css["drop-down"]} ${css["positive"]} ${cn({
        [className]: !!className,
      })}`}
    >
      <div
        ref={dropdown}
        role="select"
        onClick={() => {
          setShowMenu(!showMenu);
        }}
      >
        <div
          className={`${css["select"]} ${cn({
            [css["open"]]: showMenu,
          })}`}
        >
          <span>{title ? title : items[activeIndex]}</span>
          <i class="icon-angle-down"></i>
        </div>
      </div>
      <Card
        className={`${css["menu"]} ${cn({
          [css["open"]]: showMenu,
        })}`}
      >
        {items.map((item, index) => (
          <div
            className={`${css["menu-item"]} ${cn({
              [css["chosen"]]: activeIndex === index,
            })}`}
            role="option"
            key={index}
            onClick={() => {
              setActiveIndex(index);
              onChange(index);
            }}
          >
            <p>{item}</p>
          </div>
        ))}
      </Card>
    </div>
  );
};

export default DropDown;

css`
  .drop-down {
    position: relative;
    height: min-content;
    user-select: none;
    .select {
      display: flex;
      background-color: var(--fermin-background);
      transition: border-color 0.15s, box-shadow 0.15s;
      border-radius: 2px;
      padding: 0.8rem;
      cursor: pointer;
      span {
        color: var(--fermin-background-contrast);
        pointer-events: none;
        font-family: roboto, sans-serif;
        margin-right: 1rem;
      }
      i {
        transition: transform 0.3s;
      }
      &.open {
        i {
          transform: rotate(-180deg);
        }
      }
    }
    .menu {
      display: none;
      opacity: 0;
      position: absolute;
      width: min-content;
      transition: opacity 0.3s;
      z-index: 1000;
      top: 35px;
      left: 12px;
      &.open {
        display: block;
        opacity: 1;
      }
      .menu-item {
        &.chosen {
          p {
            background-color: var(--fermin-background);
          }
        }
        p {
          cursor: pointer;
          padding: 0.6rem;
          &:hover {
            background-color: var(--fermin-background);
          }
        }
      }
    }
  }
`;
