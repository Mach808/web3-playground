const hre = require("hardhat");
require("dotenv").config();
const fs = require("fs");

async function main() {

    const registryAddress = process.env.REGISTRY_ADDRESS;

    const Token = await hre.ethers.getContractFactory("ComplianceToken");
    const token = await Token.deploy(registryAddress);

    await token.waitForDeployment();

    const address = await token.getAddress();
    console.log("Compliance token:", address);

    let env = fs.readFileSync(".env", "utf8");
    env = env.replace(/COMPLIANCE_TOKEN_ADDRESS=.*/g, `COMPLIANCE_TOKEN_ADDRESS=${address}`);
    fs.writeFileSync(".env", env);
}

main().catch(console.error);
