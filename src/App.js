import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import ListCurrency from "./components/listcurrency";
import ConvertCurrency from "./components/convertcurrency";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChanges = this.handleChanges.bind(this);
    this.state = {
      rateInput: 1.0,
      baseIndex: 0
    };
  }

  handleChanges(rateInput) {
    this.setState({ rateInput });
  }

  render() {
    const currencyDictionary = [
      { name: "IDR", details: "Indonesian Rupiah" },
      { name: "GBP", details: "British Pound" },
      { name: "SGD", details: "Singapore Dollar" },
      { name: "EUR", details: "Euro" },
      { name: "CAD", details: "Canadian Dollar" },
      { name: "CHF", details: "Swiss Franc" },
      { name: "INR", details: "Indian Rupee" },
      { name: "MYR", details: "Malaysian Ringgit" },
      { name: "JPY", details: "Japanese Yen" },
      { name: "KRW", details: "South Korea Won" }
    ];
    const defaultCurrencyDictionary = [
      { name: "USD", details: "United States Dollars" }
    ];

    const { rateInput } = this.state;
    const { baseIndex } = this.state;
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     To get started, edit <code>src/App.js</code> and save to reload.
      //   </p>
      // </div>
      <React.Fragment>
        <ConvertCurrency
          defaultCurrencyData={defaultCurrencyDictionary}
          rateData={rateInput}
          baseIndex={baseIndex}
          onHandleChanges={this.handleChanges}
        />
        <ListCurrency
          currencyData={currencyDictionary}
          defaultCurrencyData={defaultCurrencyDictionary}
          rateData={rateInput}
          baseIndex={baseIndex}
        />
      </React.Fragment>
    );
  }
}

export default App;
