// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AchievementNFT is ERC721, Ownable {

    uint256 public nextTokenId;
    string private baseURIValue;

    constructor(string memory baseURI_)
        ERC721("Web3 Playground Achievement", "WPA")
        Ownable(msg.sender)
    {
        baseURIValue = baseURI_;
    }

    function mint(address to) public onlyOwner {
        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _safeMint(to, tokenId);
    }

    // THIS is what wallets call
    function _baseURI() internal view override returns (string memory) {
        return baseURIValue;
    }
}
