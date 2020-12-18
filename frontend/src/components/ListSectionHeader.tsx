import { h } from "preact";
import { useState } from "preact/hooks";
import useTranslate from "src/i18n/useTranslate";
import cn from "src/utils/cn";

interface Props {
  text: string;
  toggled?: boolean;
  className?: string;
  onToggle?: (toggled: boolean) => void;
}

const ListSectionHeader = ({ text, className, toggled, onToggle }: Props) => {
  const [toggleState, setToggleState] = useState(toggled);
  const { t } = useTranslate();

  return (
    <header
      className={`${css["list-section-header"]} ${cn({
        [className]: !!className,
      })}`}
    >
      <p className={css["title"]}>{text}</p>
      <p
        className={css["section-visibility-toggle"]}
        onClick={() => {
          setToggleState(!toggleState);
          onToggle && onToggle(toggleState);
        }}
      >
        {toggleState ? t("hide") : t("show")}
      </p>
    </header>
  );
};

export default ListSectionHeader;

css`
  .list-section-header {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-column-gap: 2rem;
    width: 100%;
    padding: 0 1rem 0.5rem;
    box-sizing: border-box;
    &:hover {
      .section-visibility-toggle {
        display: block;
        opacity: 1;
      }
    }
    p {
      color: var(--fermin-background-contrast);
      opacity: 0.6;
      margin: 0;
      font-size: 10pt;
      cursor: default;
    }
    .section-visibility-toggle {
      display: none;
      cursor: pointer;
      justify-self: end;
      width: min-content;
      user-select: none;
      opacity: 0;
    }
  }
`;
