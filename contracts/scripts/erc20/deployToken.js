const hre = require("hardhat");
require("dotenv").config();
const fs = require("fs");

async function main() {

  const Token = await hre.ethers.getContractFactory("PlatformToken");

  const token = await Token.deploy();

  await token.waitForDeployment();
  const address = await token.getAddress()
  console.log("Token deployed to:", address);

  let env = fs.readFileSync(".env", "utf8");
  env = env.replace(/CONTRACT_ADDRESS=.*/g, `CONTRACT_ADDRESS=${address}`);
  fs.writeFileSync(".env", env);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
