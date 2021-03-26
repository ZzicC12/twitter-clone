import React, { useState } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import EditProfile from "../routes/EditProfile";
import Home from "../routes/Home";
import Profile from "../routes/Profile";

const Router = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <HashRouter>
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route>
              <Profile />
            </Route>
            <Route>
              <EditProfile />
            </Route>
          </>
        ) : (
          <Route exact path="/">
            <Auth />
          </Route>
        )}
      </Switch>
    </HashRouter>
  );
};

export default Router;
