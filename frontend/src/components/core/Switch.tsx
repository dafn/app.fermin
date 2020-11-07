import { h } from "preact";
import { useState } from "preact/hooks";
import cn from "src/utils/cn";

interface Props {
  className?: string;
  onClick?: (state: boolean) => void;
}

const Switch = ({ className, onClick }: Props) => {
  const [state, setState] = useState(false);

  return (
    <label class={`${css["switch"]} ${cn({ [className]: !!className })}`}>
      <input
        type="checkbox"
        onClick={() => {
          onClick && onClick(!state);
          setState(!state);
        }}
      />
      <span class={`${css["slider"]} ${css["round"]}`}></span>
    </label>
  );
};

export default Switch;

css`
  .switch {
    position: relative;
    display: inline-block;
    width: 3rem;
    height: 1rem;
    input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    input:checked + .slider {
      background-color: var(--fermin-primary-dark);
    }
    input:checked + .slider:before {
      transform: translateX(1.4rem);
    }
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 2.125rem;
      background-color: var(--fermin-primary-dark);
      transition: 0.1s;
      &:before {
        position: absolute;
        content: "";
        height: 1.625rem;
        width: 1.625rem;
        bottom: -0.3rem;
        background-color: var(--fermin-primary-dark-contrast);
        transition: 0.1s;
        border-radius: 50%;
      }
    }
  }
`;
