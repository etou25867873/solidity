// SPDX-License-Identifier: MIT
pragma solidity >= 0.4.22 <0.9.0;

import "openzeppelin-solidity/contracts/access/Ownable.sol";

contract Greeter is Ownable {
  string private _greeting = "Hello, World!!!!!";

  function greet() external view returns(string memory) {
    return _greeting;
  }

  function setGreeting(string calldata greeting) external onlyOwner {
    _greeting = greeting;
  }
}
