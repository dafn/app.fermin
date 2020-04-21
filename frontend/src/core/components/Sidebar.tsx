import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

import style from "./sidebar.module.scss";

import Icon from "preact-material-components/Icon";
import Button from "preact-material-components/Button";

import {
  navigate,
  onNavigation,
  getCurrentRoute,
} from "src/core/router/navigator";

const Sidebar = () => {
  const [route, setRoute] = useState<Route>(getCurrentRoute());

  const handleButtonClick = (route: Route) => {
    navigate(route);
  };

  useEffect(() => {
    onNavigation((route: Route) => {
      setRoute(route);
    });
  }, []);

  return (
    <nav class={`${style.sidebar}`}>
      <Button>
        <Icon>vpn_key</Icon>
      </Button>
      <Button secondary={route == "/"} onClick={() => handleButtonClick("/")}>
        <Icon>dashboard</Icon>
      </Button>
      <Button
        secondary={route == "/notepad"}
        onClick={() => handleButtonClick("/notepad")}
      >
        <Icon>create</Icon>
      </Button>
    </nav>
  );
};

export default Sidebar;
