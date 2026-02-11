const hre = require("hardhat");
require("dotenv").config();

async function main() {

    const nftAddress =process.env.NFT_CONTRACT_ADDRESS;

    const nft = await hre.ethers.getContractAt(
        "AchievementNFT",
        nftAddress
    );

    const owner = await nft.ownerOf(0);

    console.log("Owner of NFT #0:", owner);
}

main().catch(console.error);
