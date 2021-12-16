// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Fundraiser.sol";

contract FundraiserFactory {
  Fundraiser[] private _fundraisers;
  uint256 constant maxLimit = 20;

  event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);

  function fundraisersCount() public view returns(uint256) {
    return _fundraisers.length;
  }

  function createFundrasier(
    string memory name,
    string memory url,
    string memory imageURL,
    string memory description,
    address payable beneficiary
  ) public {
    Fundraiser fundraiser = new Fundraiser(
      name,
      url,
      imageURL,
      description,
      beneficiary,
      msg.sender
    );
    _fundraisers.push(fundraiser);
    emit FundraiserCreated(fundraiser, fundraiser.owner());
  }

  function fundraisers(uint256 limit, uint256 offset)
    public
    view
    returns(Fundraiser[] memory collection)
  {
    uint256 size = fundraisersCount() < limit ? fundraisersCount() : limit;
    size = size < maxLimit ? size : maxLimit;
    collection = new Fundraiser[](size);
    for(uint256 i = 0; i < size; i++){
      collection[i] = _fundraisers[offset + i];
    }
    return collection;
  }
}
