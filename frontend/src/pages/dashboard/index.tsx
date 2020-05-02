import { h } from "preact";

import style from "./index.module.scss";

import BookmarksCard from "src/components/BookmarksCard";
import Bookmark from "src/components/Bookmark";
const Dashboard = () => {
  return (
    <main class={style.dashboard}>
      <BookmarksCard>
        <Bookmark
          img="https://www.fermin.no/favicon.71affc08.png"
          href="https://www.fermin.no/"
        />
      </BookmarksCard>
      <iframe src="https://bors.e24.no/#!/market/world"></iframe>
    </main>
  );
};

export default Dashboard;
