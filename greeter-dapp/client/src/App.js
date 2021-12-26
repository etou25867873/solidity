import React, { Component } from "react";
import GreeterContract from "./contracts/Greeter.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { greeting: '', web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = GreeterContract.networks[networkId];
      const instance = new web3.eth.Contract(
        GreeterContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response = await contract.methods.greet().call();

    // Update state with the result.
    this.setState({ greeting: response });
  };

  handleGreetingChange = (e) => {
    this.setState({greeting: e.target.value});
  };

  formSubmitHandle = async() => {
    const {accounts, contract, greeting } = this.state;
    const updateGreeting = await contract.methods.setGreeting(greeting).send({ from: accounts[0] });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Greeter</h1>
        {this.state.greeting}

        <form>
          <label>
            New Greeting
            <input type="text" value={this.state.greeting} onChange={this.handleGreetingChange}></input>
          </label>
        </form>
        <button onClick={this.formSubmitHandle}>Submit</button>
      </div>
    );
  }
}

export default App;
