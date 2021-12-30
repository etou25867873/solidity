import React, { useState, useEffect } from "react";
import FundraiserFactoryContract from "./contracts/FundraiserFactory.json";
import getWeb3 from "./getWeb3";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import NewFundraiser from './NewFundraiser';
import Home from './Home';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import "./App.css";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

const App = () => {
  const [state, setState] = useState({web3: null, accounts: null, contract: null});
  const classes = useStyles();
  useEffect(() => {
    const init = async() => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FundraiserFactoryContract.networks[networkId];
        const instance = new web3.eth.Contract(
          FundraiserFactoryContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        setState({web3, accounts, contract: instance});

      } catch(error) {
        // Catch any errors for any of the above operations.
        alert(
          `App.js: Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    init();
  }, []);

  const runExample = async () => {
    const { accounts, contract } = this.state;
  };

  return (
    <Router>
      <div>
        <AppBar position="static" color="default" style={{ margin: 0 }}>
          <Toolbar>
          <Typography variant="h6" color="inherit">
            <Link className="nav-link" to="/">Home</Link>
          </Typography>
          <Link className="nav-link" to="/new">New</Link>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/new" element={<NewFundraiser/>}>
          </Route>
          <Route path="/" element={<Home/>}>
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
