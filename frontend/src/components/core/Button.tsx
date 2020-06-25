import { h } from "preact";
import cn from "src/utils/cn";

interface Props {
  children: h.JSX.Element | h.JSX.Element[] | string;
  variant: "default" | "primary" | "alert";
  active?: boolean;
  disabled?: boolean;
  className?: string;
  contained?: boolean;
  flat?: boolean;
  onClick?: (event: h.JSX.TargetedEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button = ({
  children,
  className,
  active,
  variant,
  flat,
  disabled,
  onClick,
  contained,
}: Props) => {
  return (
    <button
      type="button"
      className={`${css["button"]} ${css[variant]} ${cn({
        [css["active"]]: active,
        [css["flat"]]: flat,
        [css["disabled"]]: disabled,
        [css["contained"]]: contained,
        className: !!className,
      })}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

css`
  @mixin button($color-base, $color-dark) {
    background-color: var($color-base);
    border: solid 1px var($color-base);
    color: var(--fermin-theme-text-inverted);
    &.contained {
      color: var(--fermin-theme-text);
      &:hover {
        color: var(--fermin-theme-text-inverted);
      }
    }
    &:hover,
    &:focus {
      background-color: var($color-dark);
      border-color: var($color-dark);
    }
    &.active {
      background-color: var($color-dark);
      border-color: var($color-dark);
    }
  }

  .button {
    color: var(--fermin-theme-text);
    background-color: var(--fermin-theme-neutral);
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    border: solid 1px var(--fermin-theme-neutral);
    font-size: 0.875rem;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 0.1s;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    padding: 6px 16px;
    &:hover,
    &:focus {
      background-color: gray;
      border-color: gray;
      outline: none;
    }
  }
  .primary {
    @include button(--fermin-theme-primary, --fermin-theme-primary-dark);
  }
  .alert {
    @include button(--fermin-theme-alert, --fermin-theme-alert-dark);
  }
  .disabled {
    cursor: default;
    pointer-events: none;
  }
  .contained {
    border: none;
    background: none;
    box-shadow: none;
  }
  .flat {
    box-shadow: none;
    border-radius: 0;
  }
`;
