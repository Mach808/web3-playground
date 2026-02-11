const hre = require("hardhat");
require("dotenv").config();
const fs = require("fs");

async function main() {

    const baseURI = "http://127.0.0.1:5000/metadata/";

    const NFT = await hre.ethers.getContractFactory("AchievementNFT");

    const nft = await NFT.deploy(baseURI);

    await nft.waitForDeployment();

    const address = await nft.getAddress();
    console.log("NFT deployed:", address);

    // save to .env
    let env = fs.readFileSync(".env", "utf8");
    env = env.replace(/NFT_CONTRACT_ADDRESS=.*/g, `NFT_CONTRACT_ADDRESS=${address}`);
    fs.writeFileSync(".env", env);
}

main().catch(console.error);
