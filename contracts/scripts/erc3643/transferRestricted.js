const hre = require("hardhat");
require("dotenv").config();

async function main() {

    const tokenAddress = process.env.COMPLIANCE_TOKEN_ADDRESS;
    const receiver = process.env.ACCOUNT2;

    const token = await hre.ethers.getContractAt(
        "ComplianceToken",
        tokenAddress
    );

    const amount = hre.ethers.parseUnits("10", 18);

    const tx = await token.transfer(receiver, amount);

    await tx.wait();

    console.log("Transfer complete");
}

main().catch(console.error);
