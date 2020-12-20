import { h, Fragment } from "preact";
import { useState, useContext } from "preact/hooks";

import Button from "src/components/core/Button";
import Switch from "src/components/core/Switch";
import Image from "src/components/core/Image";

import { navigate, onNavigation, getCurrentRoute } from "src/router/navigator";
import authContext from "src/auth/authContext";
import cn from "src/utils/cn";
import themeContext from "src/theme/themeContext";

const Sidebar = () => {
  const [route, setRoute] = useState<Route>(getCurrentRoute());
  const { isLoggedIn, user } = useContext(authContext);

  const { theme, setTheme } = useContext(themeContext);

  const handleThemeSwitch = () => {
    if (theme === "fermin-theme-dark") setTheme("fermin-theme-light");
    else setTheme("fermin-theme-dark");
  };

  const handleButtonClick = (route: Route) => {
    navigate(route);
  };

  onNavigation((route) => {
    setRoute(route);
  });

  return (
    <nav className={`${css["sidebar"]}`}>
      <section className={css["top"]}>
        <Button
          variant="primary"
          flat
          active={
            route === "/login" || route === "/logout" || route === "/profile"
          }
          onClick={() => handleButtonClick(isLoggedIn ? "/profile" : "/login")}
        >
          {isLoggedIn && user ? (
            <Image
              className={`${css["profile-pic"]}`}
              src={user.src}
              alt="profilbilde"
              circle
              frame
            />
          ) : (
            <i className="icon-user" />
          )}
        </Button>
        {isLoggedIn && (
          <Fragment>
            <Button
              variant="primary"
              flat
              active={route === "/"}
              onClick={() => handleButtonClick("/")}
            >
              <i className="icon-layout" />
            </Button>
            <Button
              variant="primary"
              flat
              active={route === "/notepad"}
              onClick={() => handleButtonClick("/notepad")}
            >
              <i className="icon-pencil" />
            </Button>
            <Button
              variant="primary"
              flat
              active={route === "/calculator"}
              onClick={() => handleButtonClick("/calculator")}
            >
              <i className="icon-calc" />
            </Button>
            <Button
              variant="primary"
              flat
              active={route === "/video-cutter"}
              onClick={() => handleButtonClick("/video-cutter")}
            >
              <i className="icon-movie" />
            </Button>
            <Button
              variant="primary"
              flat
              active={route === "/cv"}
              onClick={() => handleButtonClick("/cv")}
            >
              <i className="icon-doc-text-inv" />
            </Button>
          </Fragment>
        )}
      </section>
      <section className={css["bottom"]}>
        <div>
          <i
            className={cn({
              "icon-sun-inv": theme === "fermin-theme-light",
              "icon-moon-inv": theme === "fermin-theme-dark",
            })}
          />
          <Switch className={css["switch"]} onClick={handleThemeSwitch} />
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
    background-color: var(--fermin-primary-medium);
    width: 4rem;
    button {
      display: grid;
      height: 4rem;
      > * {
        align-self: center;
        justify-self: center;
      }
      i {
        font-size: 1.2rem;
      }
      .profile-pic {
        height: 1.9rem;
        width: 1.9rem;
        object-fit: cover;
      }
    }
    .top {
      display: grid;
    }
    .bottom {
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        i {
          text-align: center;
          color: var(--fermin-primary-medium-contrast);
          margin: 1rem;
        }
        .switch {
          transform: scale(0.8);
          margin-bottom: 2rem;
        }
      }
    }
  }
`;
