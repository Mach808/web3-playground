const hre = require("hardhat");
require("dotenv").config();
const fs = require("fs");

async function main() {

    const baseURI = "ipfs://bd3961f8-4fdd-45b8-b465-90351e1a031a/";

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
