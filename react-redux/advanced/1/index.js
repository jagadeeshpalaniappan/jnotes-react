import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { v4 as uuidv4 } from "uuid";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Apollo:
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import store from "./redux/app.store";
import UserContainer from "./containers/UserContainer11";
import PostContainer from "./containers/PostContainer";

import { AppHeaderWithRoutes, AppContainer } from "../common/components";

// Example: Blog App (BlogPosts, Users)

//--------------------------------- React -----------------------------------

const client = new ApolloClient({
  uri: "https://48p1r2roz4.sse.codesandbox.io"
});


const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <AppHeaderWithRoutes
            title="My App 1"
            secondaryTitle="(React / Redux / REST App)"
          />
          <AppContainer>
            <Switch>
              <Redirect exact from="/" to="/users" />
              <Route path="/users">
                <UserContainer />
              </Route>
              <Route path="/posts">
                <PostContainer />
              </Route>
              <Redirect to="/users" />
            </Switch>
          </AppContainer>
        </BrowserRouter>
      </Provider>
    </ApolloProvider>
  );
};
render(<App />, document.getElementById("root"));
