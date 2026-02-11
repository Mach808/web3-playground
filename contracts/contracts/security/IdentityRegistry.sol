// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";

contract IdentityRegistry is Ownable {

    mapping(address => bool) public verified;

    constructor() Ownable(msg.sender) {}

    function verifyUser(address user) public onlyOwner {
        verified[user] = true;
    }

    function revokeUser(address user) public onlyOwner {
        verified[user] = false;
    }

    function isVerified(address user) public view returns(bool) {
        return verified[user];
    }
}
