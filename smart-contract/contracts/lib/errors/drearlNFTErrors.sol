// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.30;

library Errors {
    error NotAdmin();
    error ReceiverNotImplemented();
    error InvalidAddress();
    error NotOwner();
    error NotAuthorized();
    error TokenDoesNotExist();
}
