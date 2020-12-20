import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import ListSectionHeader from "src/components/ListSectionHeader";
import cn from "src/utils/cn";

interface Props {
  header?: string;
  className?: string;
  children?: h.JSX.Element | h.JSX.Element[];
}

const ListSection = ({ header, className, children }: Props) => {
  const [visible, setVisible] = useState(true);

  const elementContainer = useRef(null);

  useEffect(() => {
    if (visible) {
      elementContainer.current.style.height = "min-content";
      elementContainer.current.style.height =
        elementContainer.current.scrollHeight + "px";
    }
  }, [children]);

  const containsNonNull = (array: any[]) =>
    array.filter((item) => item !== null).length !== 0;

  return (
    <section
      className={`${css["list-section"]} ${cn({
        [className]: !!className,
      })}`}
    >
      {header && (
        <ListSectionHeader
          text={header}
          onToggle={(toggled) => {
            if (toggled) {
              elementContainer.current.style.height =
                elementContainer.current.scrollHeight + "px";
            } else {
              elementContainer.current.style.height = 0 + "px";
            }

            setVisible(toggled);
          }}
        />
      )}
      <div
        className={` ${css["list-elements"]} ${cn({
          [css["hidden"]]: !visible,
        })}`}
        ref={elementContainer}
        aria-hidden={!visible}
      >
        {children !== null && containsNonNull(children as any[]) ? (
          children
        ) : (
          <section className={css["empty-list"]}>
            <h2 className="fermin-typography-subtitle">Empty list</h2>
          </section>
        )}
      </div>
    </section>
  );
};

export default ListSection;

css`
  .list-section {
    background-color: inherit;
    .list-elements {
      transition: height 0.3s, visibility 0.3s;
      visibility: visible;
      overflow: hidden;
      &.hidden {
        visibility: hidden;
      }
    }
    .empty-list {
      display: grid;
      position: relative;
      height: 3rem;
      width: 18rem;
      margin: 0 1rem 1rem 1rem;
      grid-row: 1fr;
      h2 {
        align-self: center;
        justify-self: center;
        margin: 0;
      }
    }
  }
`;
