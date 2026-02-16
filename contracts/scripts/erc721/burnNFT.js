const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {

  const contractAddress = process.env.NFT_CONTRACT_ADDRESS;
  const tokenId = 0; // change to a minted NFT

  const [signer] = await hre.ethers.getSigners();
  const contract = await ethers.getContractAt("AchievementNFT", contractAddress);

  console.log("Burning NFT...");

  const tx = await contract.burn(tokenId);
  await tx.wait();

  console.log("NFT Burned Successfully");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
