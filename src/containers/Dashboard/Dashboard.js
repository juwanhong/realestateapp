import React, { Component } from "react";

import Aux from "../../hoc/Hoc";
import PropertiesOverview from "../../components/PropertiesOverview/PropertiesOverview";
import axios from "../../axios-db";
import classes from "./Dashboard.module.css";

class Dashboard extends Component {
  state = {
    properties: [
      {
        address: null,
        mortgage: null,
        montlyPayment: null,
        payments: {
          principal: [],
          interest: [],
        },
      },
    ],
  };

  componentDidMount() {
    axios
      .get("/property.json")
      .then((res) => {
        const fetchedProperties = [];
        for (let key in res.data) {
          fetchedProperties.push({ ...res.data[key], id: key });
        }
        this.setState({ properties: fetchedProperties });
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        console.log(this.state);
        for (let index in this.state.properties) {
          console.log(this.state.properties[index]);
          this.updatePayments(index);
          // payments, monthlyPayment = this.calculateMonthly(property.mortgage)
          // this.setState({
          //   properties: {

          //   }
          // })
        }
      })
      .then(() => {
        console.log(this.state);
      });
  }

  updatePayments = (index) => {
    let tempProperties = { ...this.state.properties };
    let { payments, monthlyPayment } = this.calculateMonthly(
      tempProperties[index].mortgage
    );
    console.log(payments);
    console.log(monthlyPayment);
    tempProperties[index].payments = payments;
    tempProperties[index].monthlyPayment = monthlyPayment;

    this.setState({ properties: tempProperties });
  };

  calculateMonthly = (mortgageValues) => {
    console.log(mortgageValues);
    const amountBorrowed = mortgageValues.price - mortgageValues.downPayment;
    let monthlyPayment =
      ((mortgageValues.interestRate / 100 / 12) * amountBorrowed) /
      (1 -
        Math.pow(
          1 + mortgageValues.interestRate / 100 / 12,
          -mortgageValues.loanLength
        ));
    let principal = [];
    let interest = [];

    let outstandingBalance = amountBorrowed;

    for (let i = 0; i < mortgageValues.loanLength; i++) {
      interest.push({
        x: i,
        y: (
          (outstandingBalance * mortgageValues.interestRate) /
          100 /
          12
        ).toFixed(2),
      });
      principal.push({ x: i, y: (monthlyPayment - interest[i].y).toFixed(2) });
      outstandingBalance -= principal[i].y;
    }

    let payments = {
      principal: principal,
      interest: interest,
    };

    monthlyPayment = monthlyPayment.toFixed(2);

    return { payments, monthlyPayment };

    // this.setState({
    //   monthlyPayment: monthlyPayment.toFixed(2),
    //   payments: {
    //     principal: principal,
    //     interest: interest,
    //   },
    // });
  };

  render() {
    return <Aux>Dashboard</Aux>;
  }
}

export default Dashboard;
