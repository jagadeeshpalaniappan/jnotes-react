import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import UserModule from "./modules/user";
import PostModule from "./modules/post";
import NotFoundView from "./modules/common/views/NotFound";
// import PostsView from "./views/Posts";
// import NotFoundView from "./views/Users";

const AppRoutes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/users" />
      <Route path="/users">
        <UserModule />
      </Route>
      <Route path="/posts">
        <PostModule />
      </Route>
      <Route path="/404">
        <NotFoundView />
      </Route>
      <Redirect to="/404" />
    </Switch>
  );
};

export default AppRoutes;
