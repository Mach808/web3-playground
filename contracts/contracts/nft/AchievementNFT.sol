// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AchievementNFT is ERC721Burnable, Ownable {

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

    function setBaseURI(string memory newURI) public onlyOwner {
        baseURIValue = newURI;
    }

    function burn(uint256 tokenId) public override {
        require(ownerOf(tokenId) == msg.sender, "You are not the NFT owner");
        super.burn(tokenId);
    }

}
