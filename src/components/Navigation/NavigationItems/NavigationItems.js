import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Dashboard
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/addnew">Add</NavigationItem>
    ) : (
      <NavigationItem link="/addnew">Add</NavigationItem>
    )}
    {props.isAuthenticated ? (
      <NavigationItem link="/manage">Manage</NavigationItem>
    ) : (
      <NavigationItem link="/manage">Manage</NavigationItem>
    )}
    {props.isAuthenticated ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
