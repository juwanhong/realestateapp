import React, { Component } from "react";

import MortgageCalculator from "../Mortgage/MortgageCalculator/MortgageCalculator";

class PropertiesOverview extends Component {
  mortgageValues = {
    totalPrice: 1000000,
    downPayment: 200000,
    interestRate: 3.5,
    months: 360,
    taxRate: 1.5,
    insuranceRate: 0.5,
    mortgageInsuranceEnabled: false,
    additionalPrincipalPayment: 0,
  };
  render() {
    return (
      <div>
        <MortgageCalculator mortgageValues={this.mortgageValues} />
      </div>
    );
  }
}

export default PropertiesOverview;
