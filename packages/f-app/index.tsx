import React from "react";
import reactDom from "react-dom";

import Header from "f-app-core/components/Header";
import Hub from "f-app-hub";
import Notes from "f-app-notes";

import { HashRouter, Route } from "react-router-dom";

import "./index.sass";

const App = () => {
  return (
    <>
      <Header />
      <HashRouter>
        <>
          <Route exact path="/" component={Hub} />
          <Route exact path="/app/notes" component={Notes} />
        </>
      </HashRouter>
    </>
  );
};

reactDom.render(<App />, document.getElementById("app"));
