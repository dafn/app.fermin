import { h, render, Fragment } from "preact";

import Dashboard from "src/pages/dashboard";
import Login from "src/pages/login";
import Notebook from "src/pages/notebook";
import Calculator from "src/pages/calculator";

import Switch from "src/router/Switch";
import Route from "src/router/Route";

import Sidebar from "src/components/Sidebar";

import languageContext from "src/i18n/languageContext";
import authContext from "src/auth/authContext";

import { useState } from "preact/hooks";

import "./index.scss";

const App = () => {
  const [lang, setLang] = useState<Language>("no");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(env.initialAuthState.isLoggedIn);

  return (
    <Fragment>
      <authContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
        }}
      >
        <languageContext.Provider
          value={{
            lang,
            setLang,
          }}
        >
          <Sidebar />
          <Switch>
            <Route path="/">
              <Dashboard />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout">
              <Login />
            </Route>
            <Route path="/notepad">
              <Notebook />
            </Route>
            <Route path="/calculator">
              <Calculator />
            </Route>
          </Switch>
        </languageContext.Provider>
      </authContext.Provider>
    </Fragment>
  );
};

render(<App />, document.body);
