import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  }
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
  const [ open, setOpen] = React.useState(false);

  const { fundraiser } = props
  const classes = useStyles();

  useEffect(() => {
    if (fundraiser) {
      init(fundraiser)
    }
  }, [fundraiser]);

  const init = async (fundraiser) => {
    try {
      const fund = fundraiser
      const provider = await detectEthereumProvider();
      const web3 = new Web3(provider);
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FundraiserContract.networks[networkId];
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
        FundraiserContract.abi,
        fund
      );
      setContract(instance)
      setAccounts(accounts)

      const name = await instance.methods.name().call()
      const description = await instance.methods.description().call()
      const totalDonations = await instance.methods.totalDonations().call()
      const imageURL = await instance.methods.imageURL().call()
      const url = await instance.methods.url().call()

      setFundname(name)
      setDescription(description)
      setImageURL(imageURL)
      setTotalDonations(totalDonations)
      setURL(url)
    }
    catch(error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="fundraiser-card-container">
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          Donate to {fundName}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <img src={imageURL} width='200px' height='200px' />
            <p>{description}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Card className={classes.card} onClick={handleOpen}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={imageURL}
            title="Fundraiser Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {fundName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <p>{description}</p>
              <p>Total Donations: ${totalDonations}</p>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            onClick={handleOpen}
            variant="contained"
            className={classes.button}>
            View More
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}

export default FundraiserCard;