import { h } from "preact";
import cn from "src/utils/cn";

interface Props {
  text: string;
  className?: string;
}

const ListSectionHeader = ({ text, className }: Props) => {
  return (
    <header
      className={`${css["list-section-header"]} ${cn({
        [className]: !!className,
      })}`}
    >
      <p>{text}</p>
    </header>
  );
};

export default ListSectionHeader;

css`
  .list-section-header {
    width: 100%;
    padding: 0 1rem 0.5rem;
    box-sizing: border-box;
    p {
      color: var(--fermin-background-contrast);
      opacity: 0.6;
      margin: 0;
      font-size: 10pt;
    }
  }
`;
