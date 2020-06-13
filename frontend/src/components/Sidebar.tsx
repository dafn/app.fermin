import { h, Fragment } from "preact";
import { useState, useContext } from "preact/hooks";

import Icon from "preact-material-components/Icon";
import Button from "preact-material-components/Button";

import { navigate, onNavigation, getCurrentRoute } from "src/router/navigator";
import authContext from "src/auth/authContext";
import cn from "src/utils/cn";

const Sidebar = () => {
  const [route, setRoute] = useState<Route>(getCurrentRoute());
  const { isLoggedIn } = useContext(authContext);

  const handleButtonClick = (route: Route) => {
    navigate(route);
  };

  onNavigation((route) => {
    setRoute(route);
  });

  return (
    <nav class={`${css["sidebar"]}`}>
      <Button
        secondary={route === "/login" || route === "/logout"}
        onClick={() => handleButtonClick(isLoggedIn ? "/logout" : "/login")}
        class={cn({
          "fermin-button--alert": isLoggedIn,
        })}
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

css`
  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--fermin-theme-primary);
    width: 4rem;
    button {
      height: 4rem;
      i {
        color: var(--fermin-theme-icon);
      }
    }
  }
`;
