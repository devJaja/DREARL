// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;


library Events {
    event LandRegistered(address indexed owner, uint indexed landIndex, string state, string lga, string city);
    event LandSold(address indexed from, address indexed to, uint256 amount);
    event PropertyRegistered(address indexed owner, uint indexed propertyIndex);
    event PropertySold(address indexed from, address indexed to, uint256 amount);
    event Transfer(address indexed sender, address indexed reciepient, uint256 indexed amount);
    event Approve(address indexed owner, address indexed spender, uint256 amount);
    event TransferFrom(address indexed owner, address indexed spender, uint256 amount);

}