
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

import UserContainer from "./containers/UserContainer";
import PostContainer from "./containers/PostContainer";

import { AppHeader, AppContainer } from "../common/components";


import { userReducer, postReducer } from "./redux";

// Example: Blog App (BlogPosts, Users)

//--------------------------------- Redux: Store -----------------------------------

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postReducer
});
const store = createStore(rootReducer);

//--------------------------------- React -----------------------------------

const App = () => {
  return (
    <Provider store={store}>
      <AppHeader title="My App 2" />
      <AppContainer>
        <UserContainer />
        <PostContainer />
      </AppContainer>
    </Provider>
  );
};
render(<App />, document.getElementById("root"));

