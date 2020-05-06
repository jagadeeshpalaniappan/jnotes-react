import { createStore, combineReducers } from "redux";
import undoable, { includeAction } from "redux-undo";

import { userReducer, UNDO_USER, REDO_USER } from "./user.state";
import { postReducer } from "./post.state";

//--------------------------------- Redux: Store -----------------------------------

const UNDO_ALL = "UNDO_ALL";
const REDO_ALL = "REDO_ALL";

const rootReducer = combineReducers({
  userState: undoable(userReducer, {
    filter: includeAction([UNDO_ALL, REDO_ALL, UNDO_USER, REDO_USER])
  }),
  postState: undoable(postReducer, {
    filter: includeAction([UNDO_ALL, REDO_ALL])
  })
});
const store = createStore(rootReducer);

export default store;
