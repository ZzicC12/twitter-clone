import React, { useContext, useEffect } from "react";
import { UserContext } from "./Context";
import GlobalStyles from "./GlobalStyles";
import Router from "./Router";

const App = ({ authService, db }) => {
  const { actions } = useContext(UserContext);

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
