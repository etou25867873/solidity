import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import FundraiserContract from "./contracts/Fundraiser.json";
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3'


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 450,
    height: 400
  },
  media: {
    height: 140,
  },
}));

const FundraiserCard = (props) => {
  const [ web3, setWeb3] = useState(null)
  const [ contract, setContract] = useState(null)
  const [ accounts, setAccounts ] = useState(null)
  const [ fundName, setFundname ] = useState(null)
  const [ description, setDescription ] = useState(null)
  const [ totalDonations, setTotalDonations ] = useState(null)
  const [ imageURL, setImageURL ] = useState(null)
  const [ url, setURL ] = useState(null)
  const [ donationAmount, setDonationAmount] = useState(null)

  useEffect(() => {
  }, []);

  return (
    <div className="fundraiser-card-container">
    </div>
  )
}

export default FundraiserCard;
