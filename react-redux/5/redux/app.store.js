

import { createStore, combineReducers } from "redux";
import undoable from "redux-undo";

import { userReducer } from "./user.state";
import { postReducer } from "./post.state";


//--------------------------------- Redux: Store -----------------------------------


const undoableTodos = undoable(userReducer)

const rootReducer = combineReducers({
  userState: undoableTodos,
  // userState: undoable(userReducer),
  postState: postReducer
});
const store = createStore(rootReducer);

export default store;

