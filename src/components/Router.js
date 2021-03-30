import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Profile from "routes/Profile";
import EditProfile from "routes/EditProfile";
import { Context } from "./Context";

const Router = ({ authService, db }) => {
  const {
    state: { user },
  } = Context();

  return (
    <>
      <HashRouter>
        {user.status && <Nav authService={authService} />}
        <Switch>
          {user.status ? (
            <>
              <Route exact path="/">
                <Home db={db} />
              </Route>
              <Route path="/profile">
                <Profile />
              </Route>
              <Route path="/edit">
                <EditProfile />
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
