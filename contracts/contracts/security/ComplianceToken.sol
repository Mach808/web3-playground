// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IIdentityRegistry {
    function isVerified(address user) external view returns(bool);
}

contract ComplianceToken is ERC20, Ownable {

    IIdentityRegistry public registry;
    mapping(address => bool) public frozen;

    constructor(address registryAddress)
        ERC20("Regulated Asset Token", "RAT")
        Ownable(msg.sender)
    {
        registry = IIdentityRegistry(registryAddress);
        _mint(msg.sender, 1000 * 10**18);
    }
    function _update(address from, address to, uint256 amount) internal override {

        // Apply compliance ONLY for real transfers
        // Not minting (from == 0) and not burning (to == 0)

        if (from != address(0) && to != address(0)) {
            require(registry.isVerified(to), "Receiver not KYC verified");
        }

        super._update(from, to, amount);
    }




    function freeze(address user) public onlyOwner {
        frozen[user] = true;
    }

    function unfreeze(address user) public onlyOwner {
        frozen[user] = false;
    }

}
