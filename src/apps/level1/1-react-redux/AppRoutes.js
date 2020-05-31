import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import UserRoutes from "./modules/user/routes";
import NotFoundView from "./modules/common/views/NotFound";
// import PostsView from "./views/Posts";
// import NotFoundView from "./views/Users";

const AppRoutes = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/users" />
      <Route path="/users">
        <UserRoutes />
      </Route>
      {/* 
      <Route path="/posts">
        <PostsView />
      </Route>
       */}
      <Route path="/404">
        <NotFoundView />
      </Route>
      <Redirect to="/404" />
    </Switch>
  );
};

export default AppRoutes;
