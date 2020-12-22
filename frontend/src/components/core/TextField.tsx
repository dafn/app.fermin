import { h } from "preact";
import cn from "src/utils/cn";

interface Props extends Omit<h.JSX.HTMLAttributes<HTMLInputElement>, "class"> {
  className?: string;
}

const TextField = ({ label, className, ...rest }: Props) => {
  return (
    <div className={cn({
      [css["textfield"]]: true,
      [className]: !!className
    })}>
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
      color: var(--fermin-background-contrast);
      background-color: var(--fermin-background);
      position: absolute;
      border-radius: 6px;
    }
    input {
      border: solid 1px var(--fermin-background-contrast);
      background-color: var(--fermin-background);
      border-radius: 2px;
      padding: 0.8rem;
      transition: border-color 0.15s, box-shadow 0.15s;
      width: -webkit-fill-available;
      width: -moz-available;
      font-size: 1rem;
      &:hover,
      &:focus {
        outline: none;
        border: solid 1px var(--fermin-info-medium);
      }
      &:focus {
        box-shadow: 0 0 0 1px var(--fermin-info-medium);
      }
    }
  }
`;
