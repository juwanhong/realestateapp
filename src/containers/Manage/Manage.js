import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

import axios from "../../axios-db";

import PropertyInfo from "../../components/PropertyInfo/PropertyInfo";
import EditProperty from "./EditProperty/EditProperty";
import Aux from "../../hoc/Hoc";
import Button from "../../components/UI/Button/Button";
import Modal from "../../components/UI/Modal/Modal";
import NewData from "../AddNew/NewData/NewData";

class Manage extends Component {
  state = {
    properties: [],
    editing: [],
  };
  componentDidMount() {
    axios
      .get("/property.json")
      .then((res) => {
        const fetchedProperties = [];
        const editing = [];
        for (let key in res.data) {
          fetchedProperties.push({ ...res.data[key], id: key });
          editing.push(false);
        }
        this.setState({ properties: fetchedProperties });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  editHandler = (index) => {
    let newEditing = [...this.state.editing];
    newEditing[index] = true;
    this.setState({ editing: newEditing });
  };

  editCancelHandler = (index) => {
    let newEditing = [...this.state.editing];
    newEditing[index] = false;
    this.setState({ editing: newEditing });
  };

  editSubmitHandler = () => {
    let newEditing = [...this.state.editing];
    newEditing = newEditing.map((x) => false);
    this.setState({ editing: newEditing });
  };

  render() {
    return (
      <div>
        {this.state.properties.map((property, index) => (
          <div>
            <PropertyInfo
              key={property.id}
              id={property.id}
              address={property.address}
              mortgage={property.mortgage}
              pathname={this.props.location.pathname}
            />
            <Button
              btnType="Success"
              clicked={this.editHandler.bind(this, index)}
            >
              Manage
            </Button>
            <Button btnType="Danger">Delete</Button>
            <Aux>
              <Modal
                show={this.state.editing[index]}
                modalClosed={this.editCancelHandler.bind(this, index)}
              >
                <EditProperty
                  property={property}
                  editSubmitHandler={this.editSubmitHandler}
                />
              </Modal>
            </Aux>
          </div>
        ))}
      </div>
    );
  }
}

export default Manage;
