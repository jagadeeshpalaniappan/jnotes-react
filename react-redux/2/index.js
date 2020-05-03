import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

import { userReducer, postReducer } from "./redux";
import UserContainer from "./containers/UserContainer";
import PostContainer from "./containers/PostContainer";

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
      <div>
        <h2 style={{ textAlign: "center", borderBottom: "1px solid gray" }}>
          My App 2
        </h2>
        <UserContainer />
        <PostContainer />
      </div>
    </Provider>
  );
};
render(<App />, document.getElementById("root"));
