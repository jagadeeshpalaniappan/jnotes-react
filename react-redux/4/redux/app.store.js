

import { createStore, combineReducers } from "redux";

import { userReducer } from "./user.state";
import { postReducer } from "./post.state";

//--------------------------------- Redux: Store -----------------------------------

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postReducer
});
const store = createStore(rootReducer);

export default store;

