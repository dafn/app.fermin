import { h, render } from "preact";

import Dashboard from "src/pages/dashboard";
import Login from "src/pages/login";
import Notebook from "src/pages/notebook";
import Calculator from "src/pages/calculator";
import VideoCutter from "src/pages/videoCutter";

import Switch from "src/router/Switch";
import Route from "src/router/Route";

import Sidebar from "src/components/Sidebar";

import ThemeContext from "src/theme/themeContext";
import languageContext from "src/i18n/languageContext";
import authContext from "src/auth/authContext";

import { useState } from "preact/hooks";

import "./index.scss";

const App = () => {
  const [theme, setTheme] = useState<Theme>("fermin-theme-dark");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    env.initialAuthState.isLoggedIn
  );
  const [lang, setLang] = useState<Language>("no");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <section className={theme}>
        <authContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
          <languageContext.Provider value={{ lang, setLang }}>
            <Sidebar />
            <Switch>
              <Route match="/">
                <Dashboard />
              </Route>
              <Route match={["/login", "/logout"]}>
                <Login />
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
            </Switch>
          </languageContext.Provider>
        </authContext.Provider>
      </section>
    </ThemeContext.Provider>
  );
};

render(<App />, document.body);
