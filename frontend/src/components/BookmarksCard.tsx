import { h } from "preact";

import Card from "preact-material-components/Card";

import style from "./bookmarksCard.module.scss";

interface Props {
  children: h.JSX.Element | h.JSX.Element[];
}

const BookmarksCard = ({ children }: Props) => {
  return (
    <Card class={style.bookmarksCard}>
      <h2 class="mdc-typography--headline5">Bookmarks</h2>
      <section>
        {children}
      </section>
    </Card>
  );
};

export default BookmarksCard;
