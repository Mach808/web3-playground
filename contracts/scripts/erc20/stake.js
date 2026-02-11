const hre = require("hardhat");
require("dotenv").config();

async function main() {

    const stakingAddress = process.env.ACCOUNT2;

    const staking = await hre.ethers.getContractAt(
        "TokenStaking",
        stakingAddress
    );

    const amount = hre.ethers.parseUnits("200", 18);

    const tx = await staking.stake(amount);

    console.log("Staking...");
    await tx.wait();

    console.log("Tokens staked!");
}

main().catch(console.error);
