const hre = require("hardhat");
require("dotenv").config();


async function main() {

    const nftAddress = process.env.NFT_CONTRACT_ADDRESS;
    const receiver = process.env.ACCOUNT2;

    const nft = await hre.ethers.getContractAt(
        "AchievementNFT",
        nftAddress
    );

    // transfer tokenId 0
    const tx = await nft.transferFrom(
        (await hre.ethers.getSigners())[0].address,
        receiver,
        0
    );

    console.log("Transferring NFT...");
    await tx.wait();

    console.log("NFT transferred to:", receiver);
}

main().catch(console.error);
