import { h, render, Fragment } from "preact";

import Dashboard from "src/pages/dashboard";
import Notebook from "src/pages/notebook";
import Calculator from "src/pages/calculator";

import Switch from "src/core/router/Switch";
import Route from "src/core/router/Route";

import Sidebar from "src/core/components/Sidebar";

import t from "src/utils/i18n";

import { contexts } from "./context";

import "./index.scss";
import { useState } from "preact/hooks";

const App = () => {
  const [lang, setLang] = useState<Language>("en");

  return (
    <Fragment>
      <contexts.languageContext.Provider
        value={{
          lang,
          setLang,
        }}
      >
        <contexts.languageContext.Consumer>
          {({ lang }) => (
            <contexts.translateContext.Provider
              value={{ t: (key: string) => t(key, lang) }}
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
            </contexts.translateContext.Provider>
          )}
        </contexts.languageContext.Consumer>
      </contexts.languageContext.Provider>
    </Fragment>
  );
};

render(<App />, document.body);
