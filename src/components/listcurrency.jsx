import React, { Component } from "react";
import AddCurrency from "./addcurrency";

class ListCurrency extends Component {
  constructor(props) {
    super(props);
    this.removeCurrency = this.removeCurrency.bind(this);
    this.handleChanges = this.handleChanges.bind(this);
    this.state = {
      activeCurrency: []
    };
  }

  removeCurrency(e) {
    this.state.activeCurrency.splice(e.target.value, 1);
    this.setState(this.state);
  }

  handleChanges(name, details, baseRate, exchangeRate) {
    this.state.activeCurrency.push({
      // name: name,
      // details: details,
      // baseRate: baseRate,
      name,
      details,
      baseRate,
      exchangeRate
    });
    this.setState(this.state);
  }

  render() {
    const { currencyData } = this.props;
    const { defaultCurrencyData } = this.props;
    const { rateData } = this.props;
    const { baseIndex } = this.props;
    const { activeCurrency } = this.state;

    return (
      <div className="cc-top ml-2">
        {activeCurrency.map((value, index) => {
          return (
            <div
              className="row m-2"
              style={{ border: "1px solid" }}
              key={index}
            >
              <div className="column" style={{ width: "90%" }}>
                <div className="ml-1">
                  {value.name}
                  <div style={{ float: "right", marginRight: "5px" }}>
                    {value.exchangeRate}
                  </div>
                </div>
                <div className="font-italic ml-1 font-weight-bold">
                  {value.name} - {value.details}
                </div>
                <div className="font-italic ml-1">
                  1 {this.props.defaultCurrencyData[this.props.baseIndex].name}{" "}
                  = {value.name} {value.baseRate}
                </div>
              </div>
              <div className="column" style={{ width: "10%" }}>
                <button
                  style={{ height: "80px", width: "100%" }}
                  value={index}
                  onClick={this.removeCurrency}
                >
                  (-)
                </button>
              </div>
            </div>
          );
        })}
        <AddCurrency
          currencyData={currencyData}
          onHandleChanges={this.handleChanges}
          defaultCurrencyData={defaultCurrencyData}
          rateData={rateData}
          baseIndex={baseIndex}
        />
      </div>
    );
  }
}

export default ListCurrency;
