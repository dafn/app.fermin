import { h } from "preact";

import Card from "preact-material-components/Card";

import style from "./portalCard.module.scss";

const LinkCard = () => {
  return (
    <Card class={style.portalCard}>
      <iframe src="https://e24.no/" />
    </Card>
  );
};

export default LinkCard;
