import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import AppStateProvider from "./AppStateProvider";
import AppNav from "./AppNav";
import AppRoutes from "./AppRoutes";
import AppContainer from "./AppContainer";

export default class App extends Component {
  render() {
    return (
      <AppStateProvider>
        <BrowserRouter>
          <AppContainer nav={<AppNav />} main={<AppRoutes />} />
        </BrowserRouter>
      </AppStateProvider>
    );
  }
}
