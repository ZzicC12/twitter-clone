import React, { useEffect, useState } from "react";
import GlobalStyles from "./GlobalStyles";
import Router from "./Router";
import { AuthService } from "fbConfig";

const authService = new AuthService();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(
    () =>
      authService.onStateChange((user) =>
        user ? setIsLoggedIn(true) : setIsLoggedIn(false)
      ),
    []
  );

  return (
    <>
      <GlobalStyles />
      <Router authService={authService} isLoggedIn={isLoggedIn} />
    </>
  );
};

export default App;
