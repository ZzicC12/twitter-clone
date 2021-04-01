import React, { useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import Router from "./Router";

const App = ({ authService, db }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(
    () =>
      authService.onStateChange((user) => {
        user ? setIsLoggedIn(true) : setIsLoggedIn(false);
      }),
    [authService]
  );

  return (
    <>
      <GlobalStyles />
      <Router authService={authService} db={db} isLoggedIn={isLoggedIn} />
    </>
  );
};

export default App;
