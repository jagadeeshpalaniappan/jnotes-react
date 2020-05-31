import React from "react";
import { Switch, Route, useRouteMatch } from "react-router-dom";

import UsersView from "../views/Users";
import CreateUserView from "../views/CreateUser";
import EditUserView from "../views/EditUser";
import UserDetailsView from "../views/UserDetails";

const AppRoutes = () => {
  // The `path` lets us build <Route> paths that are relative to the parent route, while the `url` lets us build relative links.
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route exact path={path}>
        <UsersView />
      </Route>
      <Route path={`${path}/create`}>
        <CreateUserView />
      </Route>
      <Route path={`${path}/edit/:id`}>
        <EditUserView />
      </Route>
      <Route path={`${path}/:id`}>
        <UserDetailsView />
      </Route>
    </Switch>
  );
};

export default AppRoutes;
