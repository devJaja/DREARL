// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IERC721NFT.sol"; // Note: This file contains `interface INFT`

contract MockERC1155 is ERC1155, Ownable, INFT {
    constructor() ERC1155("") Ownable(msg.sender) {}

    // INFT interface implementations
    function mint(address account, uint256 id, uint256 amount, bytes memory data) public override returns (uint256) {
        _mint(account, id, amount, data);
        return id; // Return the minted id, consistent with ERC1155 minting
    }

    function mintBatch(address to, uint256[] memory ids, uint256[] memory amounts, bytes memory data) public override {
        _mintBatch(to, ids, amounts, data);
    }

    function balanceOf(address account, uint256 id) public view override returns (uint256) {
        return super.balanceOf(account, id);
    }

    function setURI(string memory newuri) public override {
        _setURI(newuri);
    }

    function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes calldata data) public override(ERC1155, INFT) {
        // ERC1155's safeTransferFrom takes 'value' as amount, and 'data'
        // The INFT interface's safeTransferFrom signature matches ERC1155's primary one.
        super.safeTransferFrom(from, to, id, value, data);
    }

    function transferToken(address from, address to, uint256 id, uint256 amount) public override {
        // This function from INFT is implemented using ERC1155's _transfer
        _transfer(from, to, id, amount, "");
    }
    
    // ERC1155 already has setApprovalForAll, no need to re-implement if its signature matches INFT's
    // function setApprovalForAll(address operator, bool approved) public override(ERC1155, INFT) {
    //     super.setApprovalForAll(operator, approved);
    // }
}
