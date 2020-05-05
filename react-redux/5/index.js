import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

import store from "./redux/app.store";
import UserContainer from "./containers/UserContainer";
import PostContainer from "./containers/PostContainer";

import { AppHeader, AppContainer } from "../common/components";

// Example: Blog App (BlogPosts, Users)

//--------------------------------- React -----------------------------------

const App = () => {
  return (
    <Provider store={store}>
      <AppHeader title="My App 5" />
      <AppContainer>
        <UserContainer />
        <PostContainer />
      </AppContainer>
    </Provider>
  );
};
render(<App />, document.getElementById("root"));
