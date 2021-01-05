import React, { Component } from "react";

import Aux from "../../hoc/Aux";
import PropertiesOverview from "../../components/PropertiesOverview/PropertiesOverview";

import classes from "./Dashboard.module.css";

class Dashboard extends Component {
  render() {
    return (
      <Aux>
        Dashboard
        <PropertiesOverview />
      </Aux>
    );
  }
}

export default Dashboard;
