import { h, render } from "preact";

import Dashboard from "src/pages/dashboard";
import Notebook from "src/pages/notebook";
import Switch from "src/core/router/Switch";
import Route from "src/core/router/Route";

import "./index.scss";

const App = () => {
  return (
    <Switch>
      <Route path="#">
        <Dashboard />
      </Route>
      <Route path="/note">
        <Notebook />
      </Route>
    </Switch>
  );
};

render(<App />, document.body);
