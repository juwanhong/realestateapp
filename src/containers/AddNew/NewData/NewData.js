import React, { Component } from "react";
import axios from "../../../axios-db";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";

class NewData extends Component {
  state = {
    addForm: {
      nickname: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Nickname",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "City",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zipcode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      state: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "State",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      revenueMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "cashflow", displayValue: "Cashflow" },
            { value: "appreciation", displayValue: "Appreciation" },
          ],
        },
        value: "cashflow",
        validation: {},
        touched: false,
        valid: true,
      },
    },
    formValid: false,
  };

  addHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.addForm) {
      formData[formElementIdentifier] = this.state.addForm[
        formElementIdentifier
      ].value;
    }

    const newProperty = {
      address: formData,
    };

    axios
      .post("/property.json", newProperty)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedAddForm = {
      ...this.state.addForm,
    };
    const updatedFormElement = {
      ...updatedAddForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedAddForm[inputIdentifier] = updatedFormElement;

    let formValid = true;
    for (let inputIdentifier in updatedAddForm) {
      formValid = updatedAddForm[inputIdentifier].valid && formValid;
    }

    this.setState({
      addForm: updatedAddForm,
      formValid: formValid,
    });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.addForm) {
      formElementsArray.push({
        id: key,
        config: this.state.addForm[key],
      });
    }

    let form = (
      <form onSubmit={this.addHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.addHandler}
          disabled={!this.state.formValid}
        >
          Add
        </Button>
      </form>
    );

    return <div>{form}</div>;
  }
}

export default NewData;
