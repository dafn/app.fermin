import { h } from "preact";
import cn from "src/utils/cn";

interface Props extends h.JSX.HTMLAttributes<HTMLButtonElement> {
  children: h.JSX.Element | h.JSX.Element[];
}

const Card = ({ children, className, ...rest }: Props) => {
  return (
    <section
      className={`${css["card"]} ${cn({ className: !!className })}`}
      {...rest}
    >
      {children}
    </section>
  );
};

export default Card;

css`
  .card {
    display: block;
    border-radius: 0.2rem;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }
`;
