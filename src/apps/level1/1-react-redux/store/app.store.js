import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { userReducer } from "../modules/user/state/user.reducer";
// import { postReducer } from "./post/post.reducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//--------------------------------- Redux: Store -----------------------------------

const rootReducer = combineReducers({
  userState: userReducer,
  //   postState: postReducer,
});

const middleware = [logger, thunk];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
