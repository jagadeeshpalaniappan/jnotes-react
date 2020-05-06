import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk'

import { userReducer } from "./user.state";
import { postReducer } from "./post.state";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//--------------------------------- Redux: Store -----------------------------------

const rootReducer = combineReducers({
  userState: userReducer,
  postState: postReducer
});

const middleware = [logger, thunk];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
