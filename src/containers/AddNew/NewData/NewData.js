import React, { Component } from "react";
import axios from "../../../axios-db";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";

class NewData extends Component {
  state = {
    addForm: {
      address: {
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
      mortgage: {
        price: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Principal",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        downPayment: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Down Payment",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        interestRate: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Interest Rate (%)",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        loanLength: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Loan Length (months)",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        taxRate: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Tax Rate (%)",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        additionalCost: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Additional Costs",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        additionalPrincipalPayment: {
          elementType: "input",
          elementConfig: {
            type: "text",
            placeholder: "Additional Principal Payment",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
      },
    },
    formValid: false,
  };

  addHandler = (event) => {
    event.preventDefault();

    const addressData = {};
    for (let formElementIdentifier in this.state.addForm.address) {
      addressData[formElementIdentifier] = this.state.addForm.address[
        formElementIdentifier
      ].value;
    }

    const mortgageData = {};
    for (let formElementIdentifier in this.state.addForm.mortgage) {
      mortgageData[formElementIdentifier] = this.state.addForm.mortgage[
        formElementIdentifier
      ].value;
    }

    const newProperty = {
      address: addressData,
      mortgage: mortgageData,
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

  inputChangedHandler = (event, type, inputIdentifier) => {
    let updatedAddForm = {
      ...this.state.addForm,
    };

    const updatedFormElement = {
      ...updatedAddForm[type][inputIdentifier],
    };
    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedAddForm[type][inputIdentifier] = updatedFormElement;

    let formValid = true;
    for (let inputIdentifier in updatedAddForm[type]) {
      formValid = updatedAddForm[type][inputIdentifier].valid && formValid;
    }

    this.setState({
      addForm: updatedAddForm,
      formValid: formValid,
    });
  };

  render() {
    const addressElementsArray = [];
    for (let key in this.state.addForm.address) {
      addressElementsArray.push({
        id: key,
        config: this.state.addForm.address[key],
      });
    }

    const mortgageElementsArray = [];
    for (let key in this.state.addForm.mortgage) {
      mortgageElementsArray.push({
        id: key,
        config: this.state.addForm.mortgage[key],
      });
    }

    let form = (
      <form onSubmit={this.addHandler}>
        <p>Address</p>
        {addressElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) =>
              this.inputChangedHandler(event, "address", formElement.id)
            }
          />
        ))}
        <p>Mortgage</p>
        {mortgageElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) =>
              this.inputChangedHandler(event, "mortgage", formElement.id)
            }
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
