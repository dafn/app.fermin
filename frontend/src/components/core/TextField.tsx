import { h } from "preact";

interface Props extends h.JSX.HTMLAttributes<HTMLInputElement> {}

const TextField = ({ label, ...rest }: Props) => {
  return (
    <div className={css["textfield"]}>
      <label htmlFor="textfield"> {label} </label>
      <input {...rest} />
    </div>
  );
};

export default TextField;

css`
  .textfield {
    position: relative;
    width: 100%;
    label {
      font-size: 10pt;
      top: -0.8rem;
      left: 0.4rem;
      padding: 0 0.4rem;
      color: var(--fermin-theme-label);
      position: absolute;
      pointer-events: none;
      background: var(--fermin-theme-surface);
      transition: top 0.15s;
    }
    input {
      border: solid 1px var(--fermin-theme-input);
      border-radius: 2px;
      padding: 0.8rem;
      background: var(--fermin-theme-surface);
      transition: border-color 0.15s, box-shadow 0.15s;
      width: -webkit-fill-available;
      font-size: 1rem;
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
