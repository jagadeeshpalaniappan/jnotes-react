import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

import store from "./redux/app.store";
import UserContainer from "./containers/UserContainer";
import PostContainer from "./containers/PostContainer";

// Example: Blog App (BlogPosts, Users)

//--------------------------------- React -----------------------------------

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h2 style={{ textAlign: "center", borderBottom: "1px solid gray" }}> My App 3</h2>
        <UserContainer />
        <PostContainer />
      </div>
    </Provider>
  );
};
render(<App />, document.getElementById("root"));
