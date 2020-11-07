import { h } from "preact";
import { useRef } from "preact/hooks";
import cn from "src/utils/cn";

interface Props {
  children: h.JSX.Element | h.JSX.Element[] | string;
  variant: "default" | "primary" | "positive" | "warning" | "error";
  active?: boolean;
  disabled?: boolean;
  className?: string;
  outlined?: boolean;
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
  outlined,
}: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <button
      type="button"
      ref={buttonRef}
      className={`${css["button"]} ${css[variant]} ${cn({
        [css["active"]]: active,
        [css["flat"]]: flat,
        [css["disabled"]]: disabled,
        [css["outlined"]]: outlined,
        [className]: !!className,
      })}`}
      disabled={disabled}
      onClick={(event) => {
        buttonRef.current.blur();
        onClick(event);
      }}
    >
      {children}
    </button>
  );
};

export default Button;

css`
  @mixin button(
    $color-base,
    $color-base-contrast,
    $color-dark,
    $color-dark-contrast
  ) {
    background-color: var($color-base);
    border: solid 1px var($color-base);
    color: var($color-base-contrast);
    &.outlined {
      background-color: unset;
      color: var($color-base);
      &:hover {
        color: var($color-base-contrast);
      }
    }
    &:hover,
    &:focus,
    &.active {
      background-color: var($color-dark);
      border-color: var($color-dark);
      outline: none;
    }
  }

  .button {
    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
      0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    font-size: 0.875rem;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 0.1s, color 0.1s, border 0.1s;
    font-family: "Roboto", sans-serif;
    font-weight: 500;
    line-height: 1.75;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    padding: 0.4rem 1rem;
  }
  .disabled {
    cursor: default;
    pointer-events: none;
  }
  .outlined {
    border: none;
    background: none;
    box-shadow: none;
  }
  .flat {
    box-shadow: none;
    border-radius: 0;
  }
  .default {
    @include button(
      --fermin-primary-medium,
      --fermin-primary-medium-contrast,
      --fermin-primary-dark,
      --fermin-primary-dark-contrast
    );
  }
  .primary {
    @include button(
      --fermin-primary-medium,
      --fermin-primary-medium-contrast,
      --fermin-primary-dark,
      --fermin-primary-dark-contrast
    );
  }
  .positive {
    @include button(
      --fermin-positive-medium,
      --fermin-positive-medium-contrast,
      --fermin-positive-dark,
      --fermin-positive-dark-contrast
    );
  }
  .warning {
    @include button(
      --fermin-warning-medium,
      --fermin-warning-medium-contrast,
      --fermin-warning-dark,
      --fermin-warning-dark-contrast
    );
  }
  .error {
    @include button(
      --fermin-error-medium,
      --fermin-error-medium-contrast,
      --fermin-error-dark,
      --fermin-error-dark-contrast
    );
  }
`;
