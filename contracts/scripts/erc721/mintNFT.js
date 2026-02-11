const hre = require("hardhat");
require("dotenv").config();


async function main() {

    const nftAddress = process.env.NFT_CONTRACT_ADDRESS;

    const nft = await hre.ethers.getContractAt(
        "AchievementNFT",
        nftAddress
    );

    const [owner] = await hre.ethers.getSigners();

    const tx = await nft.mint(owner.address);

    await tx.wait();

    console.log("NFT Minted to:", owner.address);
}

main().catch(console.error);
