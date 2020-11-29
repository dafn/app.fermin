import { h } from "preact";

interface Props {
  label: string;
}

const ListSection = ({ label }: Props) => {
  return (
    <section className={css["list-section"]}>
      <label>{label}</label>
    </section>
  );
};

export default ListSection;

css`
  .list-section {
    font-size: 10pt;
    width: -webkit-fill-available;
    margin: 0 1rem 0.1rem 1rem;
    padding-bottom: 0.3rem;
    opacity: 0.5;
    label {
      color: var(--fermin-surface-contrast);
    }
  }
`;
