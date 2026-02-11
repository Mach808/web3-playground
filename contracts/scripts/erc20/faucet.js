const hre = require("hardhat");
require("dotenv").config();
async function main() {

    // deployed contract address (PUT YOURS HERE)
    const tokenAddress = process.env.CONTRACT_ADDRESS;

    // get contract instance
    const token = await hre.ethers.getContractAt(
        "PlatformToken",
        tokenAddress
    );

    // receiver wallet (Account #1)
    const receiver = process.env.ACCOUNT2;

    // mint 100 tokens
    const amount = hre.ethers.parseUnits("100", 18);

    const tx = await token.faucet(receiver, amount);

    console.log("Transaction sent:", tx.hash);

    await tx.wait();

    console.log("Tokens minted!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
