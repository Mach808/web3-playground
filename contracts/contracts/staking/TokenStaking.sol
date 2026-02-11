// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TokenStaking {

    IERC20 public stakingToken;

    mapping(address => uint256) public stakedBalance;

    constructor(address _token) {
        stakingToken = IERC20(_token);
    }

    function stake(uint256 amount) public {

        require(amount > 0, "Amount must be > 0");

        // THIS IS THE MAGIC LINE
        stakingToken.transferFrom(msg.sender, address(this), amount);

        stakedBalance[msg.sender] += amount;
    }

    function withdraw(uint256 amount) public {

        require(stakedBalance[msg.sender] >= amount, "Not enough staked");

        stakedBalance[msg.sender] -= amount;

        stakingToken.transfer(msg.sender, amount);
    }
}
