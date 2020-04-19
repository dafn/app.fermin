import { h } from "preact";

import style from "./notelist.module.scss";
import Card from "preact-material-components/Card";
import Fab from "preact-material-components/Fab";

const Notelist = () => {
  return (
    <section class={style.notelist}>
      <Card class={style.card}>
        <h2 class="mdc-typography--subtitle2"> title </h2>
        <p class="mdc-typography--body2"> My beautifuly made note </p>
      </Card>
      <Card class={style.card}>
        <h2 class="mdc-typography--subtitle2"> title </h2>
        <p class="mdc-typography--body2"> My beautifuly made note </p>
      </Card>
      <Fab ripple mini>
        <Fab.Icon>add</Fab.Icon>
      </Fab>
    </section>
  );
};

export default Notelist;
