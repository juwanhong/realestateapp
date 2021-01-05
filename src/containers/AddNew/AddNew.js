import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import NewData from "./NewData/NewData";
import Aux from "../../hoc/Aux";

import classes from "./AddNew.module.css";

class AddNew extends Component {
  render() {
    const form = <NewData />;
    console.log(form);
    return { NewData };
  }
}

export default AddNew;
