const hre = require("hardhat");
require("dotenv").config();

async function main() {

    const nftAddress = process.env.NFT_CONTRACT_ADDRESS;

    const newCID = "bafybeieaca3bpnw3vmgd5gejbegc2npzpayxqtcyqstyobj43wwqvv552i";

    const newURI = `ipfs://${newCID}/`;

    const nft = await hre.ethers.getContractAt(
        "AchievementNFT",
        nftAddress
    );

    const tx = await nft.setBaseURI(newURI);
    await tx.wait();

    console.log("Base URI updated to:", newURI);
}

main().catch(console.error);
