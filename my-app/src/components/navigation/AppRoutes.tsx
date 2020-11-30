import * as React from "react";
import {routes} from "../config/routes";
import {Route, Switch} from "react-router-ts";

function AppRoutes() {
  return (
    <Switch>
      <Route path={routes.start.href} component={routes.start.component}/>
      <Route path={routes.projects.href} component={routes.projects.component}/>
      <Route path={routes.projectEntry.href} component={routes.projectEntry.component}/>
      <Route path={routes.blog.href} component={routes.blog.component}/>
      <Route path={routes.blogEntry.href} component={routes.blogEntry.component}/>
      <Route path={routes.kontakt.href} component={routes.kontakt.component}/>
      <Route path={routes.default.href} component={routes.default.component}/>
    </Switch>
  );
}

export default AppRoutes;
