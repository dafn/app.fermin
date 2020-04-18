import { h, render, Fragment } from "preact";

import Dashboard from "src/pages/dashboard";
import Notebook from "src/pages/notebook";
import Switch from "src/core/router/Switch";
import Route from "src/core/router/Route";

import Sidebar from "src/core/components/Sidebar";

import "./index.scss";

const App = () => {
  return (
    <Fragment>
      <Sidebar />
      <Switch>
        <Route path="#">
          <Dashboard />
        </Route>
        <Route path="/notepad">
          <Notebook />
        </Route>
      </Switch>
    </Fragment>
  );
};

render(<App />, document.body);
