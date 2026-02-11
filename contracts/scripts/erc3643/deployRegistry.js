const hre = require("hardhat");
require("dotenv").config();
const fs = require("fs");

async function main() {

    const Registry = await hre.ethers.getContractFactory("IdentityRegistry");
    const registry = await Registry.deploy();

    await registry.waitForDeployment();

    const address = await registry.getAddress();
    console.log("Registry deployed:", address);

    // save to env
    let env = fs.readFileSync(".env", "utf8");
    env = env.replace(/REGISTRY_ADDRESS=.*/g, `REGISTRY_ADDRESS=${address}`);
    fs.writeFileSync(".env", env);
}

main().catch(console.error);
