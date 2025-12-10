// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

library Events {
     // Transfer Events
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    // Approval Events
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    //on receive
    event Received(address operator, address from, uint256 tokenId, bytes data);

}
