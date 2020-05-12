import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import store from "./redux/app.store";
import UserContainer from "./containers/UserContainer";
import PostContainer from "./containers/PostContainer";

import { AppHeaderWithRoutes, AppContainer } from "../common/components";

// Example: Blog App (BlogPosts, Users)

//--------------------------------- React -----------------------------------

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppHeaderWithRoutes title="My App 1" />
        <AppContainer>
          <Switch>
            <Redirect exact from="/" to="/users" />
            <Route path="/users">
              <UserContainer />
            </Route>
            <Route path="/posts">
              <PostContainer />
            </Route>
            <Redirect to="/users" />
          </Switch>
        </AppContainer>
      </BrowserRouter>
    </Provider>
  );
};
render(<App />, document.getElementById("root"));
