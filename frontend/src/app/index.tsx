import { h, render, Fragment } from "preact";

import Dashboard from "src/pages/dashboard";
import Notebook from "src/pages/notebook";
import Calculator from "src/pages/calculator";

import Switch from "src/core/router/Switch";
import Route from "src/core/router/Route";

import Sidebar from "src/core/components/Sidebar";

import languageContext from "src/i18n/languageContext";

import { useState } from "preact/hooks";

import "./index.scss";

const App = () => {
  const [lang, setLang] = useState<Language>("no");

  return (
    <Fragment>
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
          <Route path="/notepad">
            <Notebook />
          </Route>
          <Route path="/calculator">
            <Calculator />
          </Route>
        </Switch>
      </languageContext.Provider>
    </Fragment>
  );
};

render(<App />, document.body);
