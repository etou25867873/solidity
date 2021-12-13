const FundraiserFactoryContract = artifacts.require("./FundraiserFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(FundraiserFactoryContract);
};
