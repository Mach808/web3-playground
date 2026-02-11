// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PlatformToken is ERC20, Ownable {

    constructor() ERC20("Web3 Playground Token", "WPT") Ownable(msg.sender) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    // faucet (users can request tokens)
    function faucet(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
