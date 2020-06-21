import { h } from "preact";

interface Props extends h.JSX.HTMLAttributes<HTMLInputElement> {}

const TextField = (props: Props) => {
  return (
    <div class={css["textfield"]}>
      <label htmlFor=""> Nåværende Formue </label>
      <input {...props} />
    </div>
  );
};

export default TextField;

css`
  .textfield {
    display: grid;
    grid-template-rows: auto 1fr;
    label {
      font-size: 10pt;
      margin: 0.2rem 0.5rem;
      color: var(--fermin-theme-label);
    }
    input {
      border: solid 1px var(--fermin-theme-input);
      border-radius: 2px;
      padding: 0.5rem;
      background: var(--fermin-theme-surface);
      transition: border-color 0.15s, box-shadow 0.15s;
      &:hover,
      &:focus {
        outline: none;
        border: solid 1px var(--fermin-theme-info);
      }
      &:focus {
        box-shadow: 0 0 0 1px var(--fermin-theme-info);
      }
    }
  }
`;
