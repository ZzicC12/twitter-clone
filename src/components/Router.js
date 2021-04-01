import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
//components
import Nav from "./Nav";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";

const Router = ({ authService, db, isLoggedIn }) => {
  return (
    <>
      <HashRouter>
        {isLoggedIn && <Nav authService={authService} />}
        <Switch>
          {isLoggedIn ? (
            <>
              <Route exact path="/">
                <Home authService={authService} db={db} />
              </Route>
              <Route path="/profile">
                <Profile authService={authService} />
              </Route>
            </>
          ) : (
            <>
              <Route exact path="/">
                <Auth title="Log In" authService={authService} />
              </Route>
              <Route exact path="/register">
                <Auth title="Sign Up" authService={authService} />
              </Route>
            </>
          )}
        </Switch>
      </HashRouter>
    </>
  );
};

export default Router;
