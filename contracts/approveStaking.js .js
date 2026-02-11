const hre = require("hardhat");

async function main() {

    const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const stakingAddress = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";

    const token = await hre.ethers.getContractAt(
        "PlatformToken",
        tokenAddress
    );

    const amount = hre.ethers.parseUnits("200", 18);

    const tx = await token.approve(stakingAddress, amount);

    console.log("Approving...");
    await tx.wait();

    console.log("Approved staking contract!");
}

main().catch(console.error);
