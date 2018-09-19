import React, { Component } from "react";

class ConvertCurrency extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.state = {
      value: parseFloat(this.props.rateData).toFixed(4)
    };
  }

  render() {
    return (
      <div className="cc-top mt-2 ml-2">
        <div className="ml-2">
          <label className="font-italic">
            {this.props.defaultCurrencyData[this.props.baseIndex].name} -{" "}
            {this.props.defaultCurrencyData[this.props.baseIndex].details}
          </label>
          <br />
          <label className="font-weight-bold">
            {this.props.defaultCurrencyData[this.props.baseIndex].name}
          </label>
          <input
            className="float-right mr-2 font-weight-bold"
            name="rate"
            value={this.state.value}
            type="number"
            step="0.1"
            style={{ textAlign: "right" }}
            onBlur={this.handleNumberChange}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }

  handleNumberChange(e) {
    this.setState({
      value: parseFloat(e.target.value).toFixed(4)
    });
    this.props.onHandleChanges(this.state.value);
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }
}

export default ConvertCurrency;
