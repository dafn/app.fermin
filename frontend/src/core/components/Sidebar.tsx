import { h } from "preact";
import { useState } from "preact/hooks";

import style from "./sidebar.module.scss";

import Icon from "preact-material-components/Icon";
import Button from "preact-material-components/Button";

import { navigate } from "src/core/router/navigate";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState<number>(1);

  const handleButtonClick = (index: number, route: Route) => {
    setActiveIndex(index);
    navigate(route);
  };

  return (
    <nav class={`${style.sidebar}`}>
      <Button
        secondary={activeIndex == 0}
        onClick={() => handleButtonClick(0, "/")}
      >
        <Icon>account_circle</Icon>
      </Button>
      <Button
        secondary={activeIndex == 1}
        onClick={() => handleButtonClick(1, "/")}
      >
        <Icon>dashboard</Icon>
      </Button>
      <Button
        secondary={activeIndex == 2}
        onClick={() => handleButtonClick(2, "notepad")}
      >
        <Icon>create</Icon>
      </Button>
    </nav>
  );
};

export default Sidebar;
