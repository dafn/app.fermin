import { h } from "preact";
import cn from "src/utils/cn";

interface Props extends Omit<h.JSX.HTMLAttributes<HTMLImageElement>, "class"> {
  className?: string;
  circle?: boolean;
  frame?: boolean;
}

const Image = ({ className, circle, frame, ...rest }: Props) => {
  return (
    <img
      className={cn({
        [css["circle"]]: circle,
        [css["frame"]]: frame,
        [className]: !!className,
      })}
      {...rest}
    />
  );
};

export default Image;

css`
  .circle {
    border-radius: 50%;
  }
  .frame {
    padding: 0.1rem;
    background-color: var(--fermin-primary-medium-contrast);
  }
`;
