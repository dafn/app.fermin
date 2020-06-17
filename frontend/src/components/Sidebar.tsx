import { h, Fragment } from "preact";
import { useState, useContext } from "preact/hooks";

import Button from "preact-material-components/Button";
import Switch from "preact-material-components/Switch";

import { navigate, onNavigation, getCurrentRoute } from "src/router/navigator";
import authContext from "src/auth/authContext";
import cn from "src/utils/cn";
import themeContext from "src/theme/themeContext";

const Sidebar = () => {
  const [route, setRoute] = useState<Route>(getCurrentRoute());
  const { isLoggedIn } = useContext(authContext);

  const { theme, setTheme } = useContext(themeContext);

  const handleThemeSwitch = () => {
    if (theme === "fermin-theme-light") setTheme("fermin-theme-dark");
    else setTheme("fermin-theme-light");
  };

  const handleButtonClick = (route: Route) => {
    navigate(route);
  };

  onNavigation((route) => {
    setRoute(route);
  });

  return (
    <nav class={`${css["sidebar"]}`}>
      <section class={css["top"]}>
        <Button
          secondary={route === "/login" || route === "/logout"}
          onClick={() => handleButtonClick(isLoggedIn ? "/logout" : "/login")}
          class={cn({
            "fermin-button--alert": isLoggedIn,
          })}
        >
          <i class="icon-user" />
        </Button>
        {isLoggedIn && (
          <Fragment>
            <Button
              secondary={route === "/"}
              onClick={() => handleButtonClick("/")}
            >
              <i class="icon-layout" />
            </Button>
            <Button
              secondary={route === "/notepad"}
              onClick={() => handleButtonClick("/notepad")}
            >
              <i class="icon-pencil" />
            </Button>
            <Button
              secondary={route === "/calculator"}
              onClick={() => handleButtonClick("/calculator")}
            >
              <i class="icon-math" />
            </Button>
          </Fragment>
        )}
      </section>
      <section class={css["bottom"]}>
        <div>
          <i
            class={cn({
              "icon-sun-inv": theme === "fermin-theme-light",
              "icon-moon-inv": theme === "fermin-theme-dark",
            })}
          />
          <Switch class={css["switch"]} onClick={handleThemeSwitch} />
        </div>
      </section>
    </nav>
  );
};

export default Sidebar;

css`
  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: var(--fermin-theme-primary);
    width: 4rem;
    button {
      height: 4rem;
      i {
        color: var(--fermin-theme-icon-on-dark);
        font-size: 1.2rem;
      }
    }
    .top {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .bottom {
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        i {
          text-align: center;
          color: var(--fermin-theme-icon-on-dark);
          margin: 1rem;
        }
        .switch {
          height: 3rem;
        }
      }
    }
  }
`;
