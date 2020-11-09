import { h, render } from "preact";

import Dashboard from "src/pages/dashboard";
import Login from "src/pages/login";
import Profile from "src/pages/profile";
import Notebook from "src/pages/notebook";
import Calculator from "src/pages/calculator";
import VideoCutter from "src/pages/videoCutter";
import CV from "src/pages/cv";

import Switch from "src/router/Switch";
import Route from "src/router/Route";

import Sidebar from "src/components/Sidebar";

import themeContext from "src/theme/themeContext";
import languageContext from "src/i18n/languageContext";
import authContext from "src/auth/authContext";
import { getOne } from "src/api/user";

import { useEffect, useState } from "preact/hooks";

import "./index.scss";

const App = () => {
  const [theme, setTheme] = useState<Theme>("fermin-theme-dark");
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    env.initialAuthState.isLoggedIn
  );
  const [lang, setLang] = useState<Language>("no");

  useEffect(() => {
    if (isLoggedIn) {
      user || getOne({ username: "dafn" }).then((json) => {
        setUser(json);
      });
    } else {
      setUser(null);
    }
  }, [isLoggedIn]);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      <section className={theme}>
        <authContext.Provider
          value={{ user, setUser, isLoggedIn, setIsLoggedIn }}
        >
          <languageContext.Provider value={{ lang, setLang }}>
            <Sidebar />
            <Switch>
              <Route match="/">
                <Dashboard />
              </Route>
              <Route match={["/login", "/logout"]}>
                <Login />
              </Route>
              <Route match={"/profile"}>
                <Profile />
              </Route>
              <Route match="/notepad">
                <Notebook />
              </Route>
              <Route match="/calculator">
                <Calculator />
              </Route>
              <Route match="/video-cutter">
                <VideoCutter />
              </Route>
              <Route match="/cv">
                <CV />
              </Route>
            </Switch>
          </languageContext.Provider>
        </authContext.Provider>
      </section>
    </themeContext.Provider>
  );
};

render(<App />, document.body);
