const hre = require("hardhat");
require("dotenv").config();

async function main() {

    const tokenAddress = process.env.CONTRACT_ADDRESS;

    const spender = process.env.ACCOUNT2;

    const token = await hre.ethers.getContractAt(
        "PlatformToken",
        tokenAddress
    );

    const amount = hre.ethers.parseUnits("50", 18);

    const tx = await token.approve(spender, amount);

    console.log("Approval tx:", tx.hash);

    await tx.wait();

    console.log("Approved!");
}

main().catch(console.error);
