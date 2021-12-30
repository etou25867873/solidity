const FundraiserFactoryContract = artifacts.require("./FundraiserFactory.sol");
const SimpleStorageContract = artifacts.require("./SimpleStorage.sol");

module.exports = function(deployer) {
  deployer.deploy(FundraiserFactoryContract);
  deployer.deploy(SimpleStorageContract);
};
