import React from "react";

import { BrowserRouter as Router } from "react-router-dom";
import { Link, Switch, Route } from "react-router-dom";
import { useState } from "react";

// import { MpgContext } from "./context";
import { createContext } from "react";

export type GlobalContent = {
  id: string | undefined;
  set_id: (c: string) => void;
};

export const MpgContext = createContext<GlobalContent>({
  id: "no idea",
  set_id: () => {},
});

import { Home } from "./pages/home";
import { Detail } from "./pages/detail";

export function Main() {
  const [id, set_id] = useState<string>();
  return (
    <MpgContext.Provider value={{ id, set_id }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/detail">
            <Detail />
          </Route>
        </Switch>
      </Router>
    </MpgContext.Provider>
  );
}
