import { h } from "preact";

import style from "./index.module.scss";

import BookmarksCard from "src/core/components/BookmarksCard";
import Bookmark from "src/core/components/Bookmark";

const Dashboard = () => {
  return (
    <main class={style.dashboard}>
      <BookmarksCard>
        <Bookmark
          img="https://www.fermin.no/favicon.71affc08.png"
          href="https://www.fermin.no/"
        />
      </BookmarksCard>
    </main>
  );
};

export default Dashboard;
