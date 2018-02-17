import React, { Component } from 'react';
import PhField from './components/PhField';
import PkaField from './components/PkaField';
import ConcField from './components/ConcField';
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

  henderson = (ph, pka, conc) => {
    var diff = parseFloat(ph) - parseFloat(pka)
    var pot = Math.pow(10, diff)
    return this.algebra(conc, pot)
  }

  acidMole = (ph, pka, concentration) => {
    return this.henderson(ph, pka, concentration)[0] || 0
  }

  baseMole = (ph, pka, concentration) => {
    return this.henderson(ph, pka, concentration)[1] || 0
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Buffy!</h1>
        </header>
        <PhField callbackFromParent={(data) => this.setState({ ph: data })}/>
        <PkaField callbackFromParent={(data) => this.setState({ pka: data })}/>
        <ConcField callbackFromParent={(data) => this.setState({ concentration: data })}/>
        <AcidBaseField mole={this.acidMole(this.state.ph, this.state.pka, this.state.concentration)} label="Acid"/>
        <AcidBaseField mole={this.baseMole(this.state.ph, this.state.pka, this.state.concentration)} label="Base"/>
      </div>
    );
  }
}

export default App;
