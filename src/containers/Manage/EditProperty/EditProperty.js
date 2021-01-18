import React, { Component } from "react";
import axios from "../../../axios-db";

import Button from "../../../components/UI/Button/Button";
import Input from "../../../components/UI/Input/Input";

class EditProperty extends Component {
  state = {
    editForm: {
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

  componentDidMount = () => {
    const formData = this.state.editForm;
    for (let formElementIdentifier in formData.address) {
      // console.log(formData.address);
      // console.log(this.props)
      formData.address[formElementIdentifier].value = this.props.property.address[
        formElementIdentifier
      ];
    }

    // for (let formElementIdentifier in formData.mortgage) {
    //   console.log(formElementIdentifier)
    //   console.log(formData.mortgage[formElementIdentifier]);
    //   console.log(formData.mortgage[formElementIdentifier].value);
    //   console.log(this.props.property.mortgage[
    //     formElementIdentifier
    //   ])
    //   // console.log(this.props.property.mortgage[formElementIdentifier])
    //   formData.mortgage[formElementIdentifier].value = this.props.property.mortgage[
    //     formElementIdentifier
    //   ];
    // }
    console.log('this got called')

    this.setState({ editForm: formData });

    console.log(this.state)
  };

  submitHandler = (event) => {
    event.preventDefault();

    const addressData = {};
    for (let formElementIdentifier in this.state.editForm.address) {
      addressData[formElementIdentifier] = this.state.editForm.address[
        formElementIdentifier
      ].value;
    }

    const mortgageData = {};
    for (let formElementIdentifier in this.state.editForm.mortgage) {
      mortgageData[formElementIdentifier] = this.state.editForm.mortgage[
        formElementIdentifier
      ].value;
    }

    const newProperty = {
      address: addressData,
      mortgage: mortgageData,
    };

    const id = this.props.property.id;

    axios
      .put("/property/" + id + ".json", newProperty)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    this.props.editSubmitHandler();
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
    let updatedEditForm = {
      ...this.state.editForm,
    };

    const updatedFormElement = {
      ...updatedEditForm[type][inputIdentifier],
    };
    updatedFormElement.value = event.target.value;

    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedEditForm[type][inputIdentifier] = updatedFormElement;

    let formValid = true;
    for (let inputIdentifier in updatedEditForm[type]) {
      formValid = updatedEditForm[type][inputIdentifier].valid && formValid;
    }

    this.setState({
      editForm: updatedEditForm,
      formValid: formValid,
    });
  };

  render() {
    const addressElementsArray = [];
    for (let key in this.state.editForm.address) {
      addressElementsArray.push({
        id: key,
        config: this.state.editForm.address[key],
      });
    }

    const mortgageElementsArray = [];
    for (let key in this.state.editForm.mortgage) {
      mortgageElementsArray.push({
        id: key,
        config: this.state.editForm.mortgage[key],
      });
    }

    // console.log(this.state.editForm);

    let form = (
      <form onSubmit={this.submitHandler}>
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
            changed={(event) => this.inputChangedHandler(event, 'address', formElement.id)}
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
            changed={(event) => this.inputChangedHandler(event, 'mortgage', formElement.id)}
          />
        ))}
        <Button
          btnType="Success"
          clicked={this.submitHandler}
          disabled={!this.state.formValid}
        >
          Submit
        </Button>
      </form>
    );

    return <div>{form}</div>;
  }
}

export default EditProperty;
