import { h } from "preact";

import Card from "preact-material-components/Card";

import style from "./bookmark.module.scss";

interface Props {
  img: string;
  href: string;
}

const Bookmark = ({ img, href }: Props) => {
  return (
    <a class={style.bookmark} href={href}>
      <Card class={style.card}>
        <img src={img} alt="bookmark" />
      </Card>
    </a>
  );
};

export default Bookmark;
