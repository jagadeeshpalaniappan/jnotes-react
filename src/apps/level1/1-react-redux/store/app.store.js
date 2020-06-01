import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

// After successfull (redux action) --redirectTo--> (some-route)
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import { userReducer } from "../modules/user/state/user.reducer";
// import { postReducer } from "./post/post.reducer";

//--------------------------------- Redux: Reducer -----------------------------------

const createRootReducer = (history) => {
  return combineReducers({
    router: connectRouter(history),
    userState: userReducer,
    //   postState: postReducer,
  });
};

// const rootReducer = combineReducers({...});

//--------------------------------- Redux: Store -----------------------------------

export const history = createBrowserHistory();
const rootReducer = createRootReducer(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [logger, routerMiddleware(history), thunk];
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
