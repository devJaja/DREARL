// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DrearlToken is ERC20 {
    address public owner;

    constructor() ERC20("Drearl Token", "DLR") {
        owner = msg.sender;
        _mint(msg.sender, 100000 * 10**18);
    }

    function mint(uint256 _amount) external {
        require(msg.sender == owner, "you are not owner");
        _mint(msg.sender, _amount * 10**18);
    }
}