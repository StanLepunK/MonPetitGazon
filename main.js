import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Link, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { createContext } from "react";

import { Home } from "./pages/home";
import { Detail } from "./pages/detail";

export const MpgContext = createContext(null);

export function Main() {
  const [id, set_id] = useState();
  return (
    <MpgContext.Provider value={{ id, set_id }}>
      <Router>
        {/* <Home /> */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/details">
            <Detail />
          </Route>
        </Switch>
      </Router>
    </MpgContext.Provider>
  );
}
