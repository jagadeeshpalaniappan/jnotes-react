import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";

import { userReducer } from "../redux";
import UserContainer from "./containers/UserContainer";


// Example: Blog App (BlogPosts, Users)

//---------------------------------/ Redux -----------------------------------

const rootReducer = combineReducers({
  userState: userReducer,
  // postState: postReducer
});
const store = createStore(rootReducer);

//---------------------------------/ Redux -----------------------------------

//--------------------------------- React -----------------------------------


// --------------------------------

const App = () => {
  return (
    <Provider store={store}>
      <div>
        My App
        <UserContainer />
      </div>
    </Provider>
  );
};
render(<App />, document.getElementById("root"));

//--------------------------------- /React -----------------------------------
