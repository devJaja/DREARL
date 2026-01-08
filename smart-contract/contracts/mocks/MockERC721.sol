// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/IERC721NFT.sol"; // Adjusted path to interface

contract MockERC721 is ERC721, ERC721URIStorage, Ownable, INFT {
    uint256 public nextTokenId;

    constructor() ERC721("MockNFT", "MNFT") Ownable(msg.sender) {
        nextTokenId = 1;
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        _safeMint(to, nextTokenId);
        _setTokenURI(nextTokenId, uri);
        nextTokenId++;
    }

    // Implementing the IERC721NFT interface methods
    function mint(address to, uint256, uint256, string memory uri) public override returns (uint256) {
        _safeMint(to, nextTokenId);
        _setTokenURI(nextTokenId, uri);
        uint256 mintedTokenId = nextTokenId;
        nextTokenId++;
        return mintedTokenId;
    }

    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public virtual override {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: caller is not token owner or approved");
        _transfer(from, to, tokenId);
    }

    function approve(address to, uint256 tokenId) public virtual override {
        address owner = ERC721.ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");
        require(msg.sender == owner || isApprovedForAll(owner, msg.sender), "ERC721: approve caller is not owner nor approved for all");
        _approve(to, tokenId);
    }

    function setApprovalForAll(address operator, bool approved) public virtual override {
        _setApprovalForAll(msg.sender, operator, approved);
    }

    function getApproved(uint256 tokenId) public view virtual override returns (address) {
        return ERC721.getApproved(tokenId);
    }

    function isApprovedForAll(address owner, address operator) public view virtual override returns (bool) {
        return ERC721.isApprovedForAll(owner, operator);
    }


    // The following functions are overrides required by Solidity.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes memory data
    ) public override(ERC721, INFT) {
        ERC721.safeTransferFrom(from, to, tokenId, data);
    }

    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public override(ERC721, INFT) {
        ERC721.safeTransferFrom(from, to, tokenId);
    }

    function transferToken(address from, address to, uint256 id, uint256 amount) public override {
        // Assuming amount is 1 for ERC721-like transfer
        _transfer(from, to, id);
    }
}
