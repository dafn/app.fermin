import { h } from "preact";

import style from "./index.module.scss";

const Dashboard = () => {
  return (
    <main class={style.dashboard}>
      <iframe src="https://bors.e24.no/#!/market/world"></iframe>
      <iframe src="https://finansavisen.no"></iframe>
    </main>
  );
};

export default Dashboard;
