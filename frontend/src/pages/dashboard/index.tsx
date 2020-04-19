import { h } from "preact";

import style from "./index.module.scss";

import BookmarksCard from "src/core/components/BookmarksCard";
import Bookmark from "src/core/components/Bookmark";

const Dashboard = () => {
  return (
    <main class={style.dashboard}>
      <BookmarksCard>
        <Bookmark
          img="https://material-components-web.appspot.com/images/16-9.jpg"
          href="https://www.fermin.no/"
        />
      </BookmarksCard>
    </main>
  );
};

export default Dashboard;
