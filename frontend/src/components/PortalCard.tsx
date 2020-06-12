import { h } from "preact";

import Card from "preact-material-components/Card";

const LinkCard = () => {
  return (
    <Card class={style["portalCard"]}>
      <iframe src="https://e24.no/" />
    </Card>
  );
};

export default LinkCard;

const style = `
  .portalCard {
    height: 45vh;
    iframe {
      height: 100%;
      width: 100%;
      border: none;
      border-radius: initial;
    }
  }
`;
