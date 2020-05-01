import { h, Fragment } from "preact";
import { useState, useEffect, useContext } from "preact/hooks";

import style from "./sidebar.module.scss";

import Icon from "preact-material-components/Icon";
import Button from "preact-material-components/Button";

import { navigate, onNavigation, getCurrentRoute } from "src/router/navigator";
import authContext from "src/auth/authContext";

const Sidebar = () => {
  const [route, setRoute] = useState<Route>(getCurrentRoute());
  const { isLoggedIn } = useContext(authContext);

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
      <Button
        secondary={route === "/login" || route === "/logout"}
        onClick={() => handleButtonClick(isLoggedIn ? "/logout" : "/login")}
        class={`${isLoggedIn ? "fermin-button--alert" : ""}`}
      >
        <Icon>vpn_key</Icon>
      </Button>
      {isLoggedIn && (
        <Fragment>
          <Button
            secondary={route === "/"}
            onClick={() => handleButtonClick("/")}
          >
            <Icon>dashboard</Icon>
          </Button>
          <Button
            secondary={route === "/notepad"}
            onClick={() => handleButtonClick("/notepad")}
          >
            <Icon>create</Icon>
          </Button>
          <Button
            secondary={route === "/calculator"}
            onClick={() => handleButtonClick("/calculator")}
          >
            <Icon>functions</Icon>
          </Button>
        </Fragment>
      )}
    </nav>
  );
};

export default Sidebar;
