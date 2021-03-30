import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
//firebase
import { AuthService, db } from "fbConfig";
//context
import { UserContextProvider } from "components/Context";

const authService = new AuthService();

ReactDOM.render(
  <UserContextProvider>
    <App authService={authService} db={db} />
  </UserContextProvider>,
  document.getElementById("root")
);
