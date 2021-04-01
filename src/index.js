import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
//firebase
import { AuthService, db } from "fbConfig";

const authService = new AuthService();

ReactDOM.render(
  <App authService={authService} db={db} />,
  document.getElementById("root")
);
