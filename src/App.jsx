import React, { Component } from 'react';
import InputField from './components/InputField';
import AcidBaseField from './components/AcidBaseField';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {};

  algebra = (c1, c2) => {
    /*
      Example:
      c1 = 0.05
      c2 = 0.061

      HA + A = 0.05
      A / HA = 0.061

      A = 0.061 * HA
      HA + ( 0.061 * HA ) = 0.05
      1.061 * HA = 0.05

      ** HA = 0.05 / 1.061
      ** A = 0.061 * (0.05 / 1.061)

      A = c2 * (c1 / (1+c2))
      HA = c1 / (1+c2)
    */

    var acid = c2 * (c1 / (1+c2));
    var base = c1 / (1+c2);
    return [acid, base];
  }

  hendersonHasselbalch = () => {
    var diff = parseFloat(this.state.ph) - parseFloat(this.state.pka)
    var pot = Math.pow(10, diff)
    return this.algebra(this.state.concentration, pot)
  }

  render() {
    var data = this.hendersonHasselbalch()
    var acidMole = data[0] || 0, baseMole = data[1] || 0

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Buffy!</h1>
        </header>
        <InputField label="pH" onChange={(data) => this.setState({ ph: data })}/>
        <InputField label="pKa" onChange={(data) => this.setState({ pka: data })}/>
        <InputField label="Concentration" onChange={(data) => this.setState({ concentration: data })}/>
        <AcidBaseField mole={acidMole} label="Acid"/>
        <AcidBaseField mole={baseMole} label="Base"/>
      </div>
    );
  }
}

export default App;
