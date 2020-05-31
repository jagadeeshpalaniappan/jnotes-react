import React from "react";
import { Provider } from "react-redux";
import store from "./state/app.store";
const AppStateProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppStateProvider;
