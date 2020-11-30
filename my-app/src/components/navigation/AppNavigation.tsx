import * as React from "react";
import {routes} from "../config/routes";
import Navigation from "./Navigation";
import NavigationItem from "./NavigationItem";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'

function AppNavigation() {
  return (
    <Navigation>
      <NavigationItem href={routes.start.href}><FontAwesomeIcon size={"2x"} icon={faHome}/></NavigationItem>
      <NavigationItem href={routes.projects.href}>{routes.projects.title}</NavigationItem>
      <NavigationItem href={routes.blog.href}>{routes.blog.title}</NavigationItem>
      <NavigationItem href={routes.kontakt.href}>{routes.kontakt.title}</NavigationItem>
    </Navigation>
  );
}

export default AppNavigation;