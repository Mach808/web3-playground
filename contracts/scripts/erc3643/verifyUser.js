const hre = require("hardhat");
require("dotenv").config();

async function main() {

    const registryAddress = process.env.REGISTRY_ADDRESS;
    const user = process.env.ACCOUNT2;

    const registry = await hre.ethers.getContractAt(
        "IdentityRegistry",
        registryAddress
    );

    const tx = await registry.verifyUser(user);

    await tx.wait();

    console.log("User verified!");
}

main().catch(console.error);
