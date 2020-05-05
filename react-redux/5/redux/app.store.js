

import { createStore, combineReducers } from "redux";
import undoable from "redux-undo";

import { userReducer } from "./user.state";
import { postReducer } from "./post.state";


//--------------------------------- Redux: Store -----------------------------------

const rootReducer = combineReducers({
  userState: undoable(userReducer),
  postState: undoable(postReducer)
});
const store = createStore(rootReducer);

export default store;

