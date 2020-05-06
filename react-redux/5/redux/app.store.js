import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import undoable, { includeAction } from "redux-undo";
import logger from "redux-logger";

import { userReducer, UNDO_USER, REDO_USER } from "./user.state";
import { postReducer } from "./post.state";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//--------------------------------- Redux: Store -----------------------------------

const UNDO_ALL = "UNDO_ALL";
const REDO_ALL = "REDO_ALL";

const rootReducer = combineReducers({
  userState: undoable(userReducer, {
    undoType: "UNDO_USER",
    redoType: "REDO_USER"
    // filter: includeAction([UNDO_ALL, REDO_ALL, UNDO_USER, REDO_USER])
  }),
  postState: undoable(postReducer, {
    // filter: includeAction([UNDO_ALL, REDO_ALL])
  })
});

const middleware = [logger];
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));

export default store;
