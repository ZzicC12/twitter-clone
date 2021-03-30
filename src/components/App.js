import React, { useEffect } from "react";
import { Context } from "./Context";
import GlobalStyles from "./GlobalStyles";
import Router from "./Router";

const App = ({ authService, db }) => {
  const { actions } = Context();

  useEffect(
    () =>
      authService.onStateChange((user) => {
        user
          ? actions.setUser({ info: user, status: true })
          : actions.setUser({ info: null, status: false });
      }),
    []
  );

  return (
    <>
      <GlobalStyles />
      <Router authService={authService} db={db} />
    </>
  );
};

export default App;
