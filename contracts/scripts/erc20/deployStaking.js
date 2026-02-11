const hre = require("hardhat");
require("dotenv").config();

async function main() {

    const tokenAddress = process.env.CONTRACT_ADDRESS;

    const Staking = await hre.ethers.getContractFactory("TokenStaking");

    const staking = await Staking.deploy(tokenAddress);

    await staking.waitForDeployment();

    console.log("Staking contract:", await staking.getAddress());
}

main().catch(console.error);
