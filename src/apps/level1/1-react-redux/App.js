import React, { Component } from "react";
import AppStateProvider from "./AppStateProvider";
import AppNav from "./AppNav";
import AppRoutes from "./AppRoutes";
import AppContainer from "./AppContainer";
import AppRouteProvider from "./AppRouteProvider";

export default class App extends Component {
  render() {
    return (
      <AppStateProvider>
        <AppRouteProvider>
          <AppContainer nav={<AppNav />} main={<AppRoutes />} />
        </AppRouteProvider>
      </AppStateProvider>
    );
  }
}
