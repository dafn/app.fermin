import { h } from "preact";
import cn from "src/utils/cn";

import Bookmark from "src/components/core/Bookmark";
import Card from "src/components/core/Card";

interface Props {
  className?: string;
}

const BookmarkHub = ({ className }: Props) => {
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
          "/assets/images/fiken.png"
        }
      />
      <Bookmark
        title={"DB"}
        href={"https://danskebank.no/"}
        src={
          "/assets/images/dn.png"
        }
      />
      <Bookmark
        title={"Nordnet"}
        href={"https://www.nordnet.no/overview"}
        src={
          "/assets/images/nordnet.jpg"
        }
      />
      <Bookmark
        title={"E24"}
        href={"https://e24.no/"}
        src={"/assets/images/e24.png"}
      />
      <Bookmark
        title={"1 Password"}
        href={"https://1password.com/"}
        src={"/assets/images/1password.jpg"}
      />
      <Bookmark
        title={"Mega"}
        href={"https://mega.nz/"}
        src={"/assets/images/mega.jpg"}
      />
      <Bookmark
        title={"日本語"}
        href={"https://www.japanesepod101.com/"}
        src={
          "/assets/images/japanese101.webp"
        }
      />
      <Bookmark
        title={"Reddit"}
        href={"https://www.reddit.com/"}
        src={
          "/assets/images/reddit.webp"
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
