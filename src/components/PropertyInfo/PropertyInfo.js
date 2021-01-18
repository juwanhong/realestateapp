import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import Button from "../UI/Button/Button";

import classes from "./PropertyInfo.module.css";

class Property extends Component {
  state = {
    id: null,
    property: {
      address: [],
      mortgage: []
    }
  };
  componentDidMount() {
    let address = [];
    for (let field in this.props.address) {
      address.push({
        name: field,
        value: this.props.address[field],
      });
    }
    let mortgage = [];
    for (let field in this.props.mortgage) {
      mortgage.push({
        name: field,
        value: this.props.mortgage[field],
      });
    }
    this.setState({ property: {address: address, mortgage: mortgage}, id: this.props.id });
    console.log(this.props);
  }

  manageHandler = () => {
    console.log(this.props);
    // <Route
    //   path={this.props.pathname + "manage-property"}
    //   render={(props) => <ManageProperty {...props} key={this.state.id} />}
    // />;
    <Redirect
      to={{ pathname: "manage/manage-property", state: { id: this.state.id } }}
    />;
  };

  render() {
    const addressOutput = this.state.property.address.map((field) => {
      return (
        <span key={field.key}>
          {field.name} : {field.value} <br />
        </span>
      );
    });
    const mortgageOutput = this.state.property.mortgage.map((field) => {
      return (
        <span key={field.key}>
          {field.name} : {field.value} <br />
        </span>
      );
    });

    return (
      <div className={classes.PropertyInfo}>
        <p>
          Address: <br />
          {addressOutput}
        </p>
        <p>
          Mortgage: <br/>
          {mortgageOutput}
        </p>
      </div>
    );
  }
}

export default Property;
