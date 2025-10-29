// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

library Errors {
    error InvalidNumberOfPlots();
    error InvalidTitleNumber();
    error InvalidLandLocationDetails();
    error TitleExistAlready();
    error LandIsNotVerified();
    error PropertyNotVerified();
    error InsufficientDelarTokens();
    error InsufficientAllowanceToTransferDelarTokens();
    error InvalidSender(address sender);
    error InvalidReceiver(address receiver);
    error InsufficientBalance(address sender, uint256 balance, uint256 amount);
    error InsufficientAllowance(address spender, uint256 allowance, uint256 amount);
    error InvalidApprover(address owner);
    error InvalidSpender(address spender);
    error TotalSupplyMustBeGreaterThanZero();
    error InvalidAmount();
}