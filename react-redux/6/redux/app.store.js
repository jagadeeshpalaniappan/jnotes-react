import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import { undoable } from "./undoable-jag-impl.js";
import logger from "redux-logger";

import { userReducer } from "./user.state";
import { postReducer } from "./post.state";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//--------------------------------- Redux: Reducer -----------------------------------

// custom: 'undoable' reducer

const rootReducer = combineReducers({
  userState: undoable(userReducer),
  postState: undoable(postReducer)
});

//--------------------------------- Redux: Store -----------------------------------

const middleware = [logger];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
