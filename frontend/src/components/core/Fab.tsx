import { h } from "preact";

interface Props extends h.JSX.HTMLAttributes<HTMLButtonElement> {
  children: h.JSX.Element | h.JSX.Element[];
}

const Fab = ({ children, ...rest }: Props) => {
  return (
    <button className={css["fab"]} {...rest}>
      {children}
    </button>
  );
};

export default Fab;

css`
  .fab {
    display: flex;
    height: 2.5rem;
    width: 2.5rem;
    background: var(--fermin-theme-positive);
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    will-change: transform, opacity;
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2),
      0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);
    border: none;
    outline: none;
    transition: all 0.15s;
    &:hover {
      cursor: pointer;
      filter: brightness(85%);
    }
    i {
      color: var(--fermin-theme-icon-on-dark);
    }
  }
`;
