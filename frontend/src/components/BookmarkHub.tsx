import { h } from "preact";
import cn from "src/utils/cn";

import Bookmark from "src/components/core/Bookmark";
import Card from "./core/Card";

interface Props extends Omit<h.JSX.HTMLAttributes<HTMLDivElement>, "class"> {
  className?: string;
}

const BookmarkHub = ({ children, className }: Props) => {
  return (
    <Card
      className={`${css["bookmark-hub"]} ${cn({
        [className]: !!className,
      })}`}
    >
      <Bookmark
        title={"Fiken"}
        href={"https://fiken.no/"}
        src={
          "https://fiken.no/resources/fiken/29a2917ae7d7035ad27ef1b5398d798f/illustrasjoner/landingsside/superenkelt-regnskap.svg"
        }
      />
      <Bookmark
        title={"DB"}
        href={"https://danskebank.no/"}
        src={
          "https://upload.wikimedia.org/wikipedia/commons/9/9f/Danske_Bank_logo.svg"
        }
      />
      <Bookmark
        title={"Nordnet"}
        href={"https://www.nordnet.no/overview"}
        src={
          "https://mk0corpsitebkr4w0d4u.kinstacdn.com/wp-content/uploads/2020/10/Nordnet_logo-504x55.png"
        }
      />
      <Bookmark
        title={"E24"}
        href={"https://e24.no/"}
        src={"https://e24.no/apple-touch-icon.png"}
      />
      <Bookmark
        title={"1 Password"}
        href={"https://1password.com/"}
        src={"https://1password.com/img/redesign/logo-light-bg.svg"}
      />
      <Bookmark
        title={"Mega"}
        href={"https://mega.nz/"}
        src={"https://cdn.worldvectorlogo.com/logos/mega-icon.svg"}
      />
      <Bookmark
        title={"日本語"}
        href={"https://www.japanesepod101.com/"}
        src={
          "https://biblionyan.files.wordpress.com/2018/12/japanesepod101_300x300.png"
        }
      />
      <Bookmark
        title={"Reddit"}
        href={"https://www.reddit.com/"}
        src={
          "https://www.redditstatic.com/desktop2x/img/id-cards/snoo-home@2x.png"
        }
      />
    </Card>
  );
};

export default BookmarkHub;

css`
  .bookmark-hub {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-evenly;
  }
`;
