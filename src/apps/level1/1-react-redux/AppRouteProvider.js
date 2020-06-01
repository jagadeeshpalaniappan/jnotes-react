import React from "react";
// import { BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./store/app.store";

/*
const AppRouteProvider = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
*/

const AppRouteProvider = ({ children }) => {
  return <ConnectedRouter history={history}>{children}</ConnectedRouter>;
};

export default AppRouteProvider;
