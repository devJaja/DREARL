// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

interface IERC20 {
    function balanceOf(address tokenHolder) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external;

    function transferFrom(
        address owner,
        address spender,
        uint256 amount
    ) external;

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function approve(address spender, uint256 amount) external;

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);

    function mint(address reciever, uint256 amount) external;
}
