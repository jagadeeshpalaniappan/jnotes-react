import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import undoable, { includeAction, excludeAction } from "redux-undo";
import logger from "redux-logger";

import { userReducer, UNDO_USER, REDO_USER, DELETE_USER } from "./user.state";
import {
  postReducer,
  UNDO_POST,
  REDO_POST,
  ADD_POST,
  DELETE_POST
} from "./post.state";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//--------------------------------- Redux: Reducer -----------------------------------

// Default Undo Config: if we wanted to do undo/redo everything
/*
const rootReducer = combineReducers({
  userState: undoable(userReducer),
  postState: undoable(postReducer)
});
*/

// Advanced Undo Config: if we wanted to do specific undo/redo, use: 'undoType' & 'redoType'
const rootReducer = combineReducers({
  userState: undoable(userReducer, {
    undoType: UNDO_USER,
    redoType: REDO_USER,
    // filter: excludeAction([DELETE_USER]) // deleted 'users' cannot be undo/redo back (deleted items cannot undo/redo)
  }),
  postState: undoable(postReducer, {
    undoType: UNDO_POST,
    redoType: REDO_POST,
    // filter: includeAction([ADD_POST, DELETE_POST]) // only 'added' & 'deleted' posts can undo/redo back (updated items cannot undo/redo)
  })
});

//--------------------------------- Redux: Store -----------------------------------

const middleware = [logger];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
