import React, { Component } from "react";

class AddCurrency extends Component {
  constructor(props) {
    super(props);
    this.addCurrency = this.addCurrency.bind(this);
    this.storedCurrency = this.storedCurrency.bind(this);
    this.getSelectedCurrency = this.getSelectedCurrency.bind(this);
    this.state = {
      isHidden: false,
      targetRate: null,
      targetRateDetails: null,
      valueRate: null,
      data: null
    };
  }

  addCurrency() {
    let { isHidden } = this.state;
    this.setState({ isHidden: !isHidden });
  }

  storedCurrency() {
    fetch(
      `https://api.exchangeratesapi.io/latest?base=${
        this.props.defaultCurrencyData[this.props.baseIndex].name
      }&symbols=${this.state.targetRate}`
    )
      .then(res => res.json())
      .then(resJSON => {
        this.setState({ data: resJSON });
        this.props.onHandleChanges(
          this.state.targetRate,
          this.state.targetRateDetails,

          parseFloat(
            this.state.data.rates[this.state.targetRate]
              .toString()
              .match(/^-?\d+(?:\.\d{0,2})?/)[0]
          )
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
          parseFloat(
            (this.props.rateData * this.state.data.rates[this.state.targetRate])
              .toString()
              .match(/^-?\d+(?:\.\d{0,2})?/)[0]
          )
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
        let { isHidden } = this.state;
        this.setState({ isHidden: !isHidden });
        // console.log(
        //   "base rate = ",
        //   this.state.data.rates[this.state.targetRate]
        // );
        // console.log(
        //   "calculation = ",
        //   this.props.rateData * this.state.data.rates[this.state.targetRate]
        // );
      });
  }

  getSelectedCurrency(e) {
    this.setState({
      targetRate: e.target.value.substring(0, e.target.value.indexOf(",")),
      targetRateDetails: e.target.value.substring(
        e.target.value.indexOf(",") + 1,
        e.target.value.length
      )
    });
  }

  componentWillMount() {
    let { currencyData } = this.props;
    this.setState({
      targetRate: currencyData[0].name,
      targetRateDetails: currencyData[0].details
    });
  }

  render() {
    let { currencyData } = this.props;
    return (
      <div className="cc-inner m-2">
        <button
          style={{ width: "100%", textAlign: "left" }}
          hidden={this.state.isHidden}
          onClick={this.addCurrency}
        >
          (+) Add More Currencies
        </button>
        <table className="cc-inner" hidden={!this.state.isHidden}>
          <tbody>
            <tr>
              <td style={{ width: "80%" }}>
                <select
                  style={{ height: "100%", width: "100%" }}
                  onChange={this.getSelectedCurrency}
                >
                  {currencyData.map((value, index) => {
                    return (
                      <option
                        key={index}
                        value={value.name + "," + value.details}
                      >
                        {value.name}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td style={{ width: "20%" }}>
                <button style={{ width: "100%" }} onClick={this.storedCurrency}>
                  Submit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default AddCurrency;
