import React, { Component } from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  ChartLabel,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeries,
  LinesSeriesCanvas,
} from "react-vis";

import classes from "./MortgageCalculator.module.css";
import "../../../../node_modules/react-vis/dist/style.css";

class MortgageCalculator extends Component {
  state = {
    amountBorrowed: null,
    monthlyPayment: null,
    payments: {
      principal: [
        {
          x: null,
          y: null,
        },
      ],
      interest: [
        {
          x: null,
          y: null,
        },
      ],
    },
  };

  componentDidMount() {
    this.calculateMonthly(this.props.mortgageValues);
  }

  calculateMonthly = (mortgageValues) => {
    console.log(mortgageValues);
    const amountBorrowed =
      mortgageValues.totalPrice - mortgageValues.downPayment;
    const monthlyPayment =
      ((mortgageValues.interestRate / 100 / 12) * amountBorrowed) /
      (1 -
        Math.pow(
          1 + mortgageValues.interestRate / 100 / 12,
          -mortgageValues.months
        ));
    let principal = [];
    let interest = [];

    let outstandingBalance = amountBorrowed;
    console.log(mortgageValues.totalPrice);

    for (let i = 0; i < mortgageValues.months; i++) {
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

    this.setState({
      amountBorrowed: amountBorrowed.toFixed(2),
      monthlyPayment: monthlyPayment.toFixed(2),
      payments: {
        principal: principal,
        interest: interest,
      },
    });
  };

  render() {
    console.log(this.state);
    return (
      <div>
        <XYPlot width={1000} height={800} margin={100}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis />
          <YAxis title="$" />
          <LineSeries
            className="first-series"
            data={this.state.payments.principal}
            style={{
              strokeLinejoin: "round",
              strokeWidth: 4,
            }}
          />
          <LineSeries
            data={this.state.payments.interest}
            className="third-series"
            curve={"curveMonotoneX"}
            strokeDasharray="7, 3"
          />
        </XYPlot>
      </div>
    );
  }
}

export default MortgageCalculator;
