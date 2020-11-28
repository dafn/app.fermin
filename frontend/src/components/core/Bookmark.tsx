import { h } from "preact";
import cn from "src/utils/cn";

interface Props extends Omit<h.JSX.HTMLAttributes<HTMLDivElement>, "class"> {
  title: string;
  href: string;
  src: string;
  className?: string;
}

const Bookmark = ({ title, href, src, className }: Props) => {
  return (
    <a
      className={`${css["bookmark"]} ${cn({
        [className]: !!className,
      })}`}
      href={href}
      target="_blank"
    >
      <div>
        <img src={src} alt={title} />
      </div>
      <div className={css["title-container"]}>
        <p>{title}</p>
      </div>
    </a>
  );
};

export default Bookmark;

css`
  .bookmark {
    text-decoration: none;
    transition: all 0.1s;
    &:hover {
      transform: scale(0.9);
      cursor: pointer;
    }
    display: flex;
    height: 5rem;
    width: 4rem;
    padding: 1rem;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      width: -webkit-fill-available;
      height: 100%;
      img {
        position: relative;
        display: inline-block;
        border-radius: 0.8rem;
        box-sizing: border-box;
        height: auto;
        max-height: 3rem;
        max-width: 3rem;
      }
    }
    .title-container {
      align-items: flex-end;
      height: auto;
      p {
        overflow: hidden;
        font-size: 11pt;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
      }
    }
  }
`;
