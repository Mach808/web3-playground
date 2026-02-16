const hre = require("hardhat");
require("dotenv").config();

async function main() {
    try{
        const nftAddress = process.env.NFT_CONTRACT_ADDRESS;
        const nft = await hre.ethers.getContractAt(
            "AchievementNFT",
            nftAddress
        );

        const owner = await nft.ownerOf(1);

        console.log("Owner of NFT #1:", owner);
    }catch(err){
        console.log("No NFT found");
    }
}

main().catch(console.error);
