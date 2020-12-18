import { h } from "preact";
import { useState } from "preact/hooks";
import ListSectionHeader from "src/components/ListSectionHeader";
import cn from "src/utils/cn";

interface Props {
  header?: string;
  children?: h.JSX.Element | h.JSX.Element[];
}

const ListSection = ({ header, children }: Props) => {
  const [visible, setVisible] = useState(true);

  return (
    <section className={css["list-section"]}>
      {header && (
        <ListSectionHeader
          text={header}
          onToggle={(toggled) => {
            setVisible(toggled);
          }}
        />
      )}
      <div
        className={` ${css["list-elements"]} ${cn({
          [css["hidden"]]: !visible,
        })}`}
      >
        {children}
      </div>
    </section>
  );
};

export default ListSection;

css`
  .list-section {
    background-color: inherit;
    .list-elements {
      opacity: 1;
      visibility: visible;
      overflow: hidden;
      max-height: min-content;
      &.hidden {
        opacity: 0;
        visibility: hidden;
        max-height: 0;
      }
    }
  }
`;
