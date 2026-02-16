import { useState } from "react";
import { ethers } from "ethers";
import { ERC20_ADDRESS, ERC721_ADDRESS } from "./abi/config";
import erc20Abi from "./abi/PlatformToken.json";
import erc721Abi from "./abi/AchievementNFT.json";

function App() {

  const [account, setAccount] = useState(null);
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState("0");
  const [nfts, setNfts] = useState([]);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    const prov = new ethers.BrowserProvider(window.ethereum);
    await prov.send("eth_requestAccounts", []);

    const sign = await prov.getSigner();
    const address = await sign.getAddress();

    setProvider(prov);
    setSigner(sign);
    setAccount(address);

    loadERC20(prov, address);
    loadNFTs(prov, address);

  }

  async function transferNFT(tokenId) {

    if (!signer) {
      alert("Connect wallet first");
      return;
    }

    const receiver = prompt("Enter receiver address:");

    if (!receiver) return;

    try {
      const contract = new ethers.Contract(
        ERC721_ADDRESS,
        erc721Abi.abi,
        signer
      );

      const tx = await contract[
        "safeTransferFrom(address,address,uint256)"
      ](
        account,
        receiver,
        tokenId,
        {
          gasLimit: 200000,
          maxFeePerGas: ethers.parseUnits("40", "gwei"),
          maxPriorityFeePerGas: ethers.parseUnits("30", "gwei")
        }
      );

      alert("Confirm transaction in MetaMask...");

      await tx.wait();

      alert("NFT transferred!");

      // reload NFTs
      loadNFTs(provider, account);

    } catch (err) {
      console.error(err);
      alert("Transfer failed");
    }
  }



  async function loadERC20(provider, user) {
    const contract = new ethers.Contract(
      ERC20_ADDRESS,
      erc20Abi.abi,
      provider
    );

    const bal = await contract.balanceOf(user);
    const symbol = await contract.symbol();
    setBalance(ethers.formatUnits(bal, 18));
    setSymbol(symbol);
  }


  async function loadNFTs(provider, user) {

    const contract = new ethers.Contract(
      ERC721_ADDRESS,
      erc721Abi.abi,
      provider
    );

    const owned = [];

    for (let i = 0; i < 20; i++) {
      try {
        const owner = await contract.ownerOf(i);

        if (owner.toLowerCase() === user.toLowerCase()) {
          let tokenURI = await contract.tokenURI(i);

          if (tokenURI.startsWith("ipfs://")) {
            tokenURI = tokenURI.replace(
              "ipfs://",
              "https://gateway.pinata.cloud/ipfs/"
            );
          }

          const response = await fetch(tokenURI);
          const metadata = await response.json();

          let imageURL = metadata.image;

          if (imageURL.startsWith("ipfs://")) {
            imageURL = imageURL.replace(
              "ipfs://",
              "https://gateway.pinata.cloud/ipfs/"
            );
          }

          owned.push({
            id: i,
            name: metadata.name,
            description: metadata.description,
            image: imageURL
          });
        }

      } catch (err) { }
    }

    setNfts(owned);
  }

  async function approveNFT(tokenId) {

    const operator = prompt("Enter address to approve:");

    if (!operator) return;

    try {
      const contract = new ethers.Contract(
        ERC721_ADDRESS,
        erc721Abi.abi,
        signer
      );

      const tx = await contract.approve(operator, tokenId);
      await tx.wait();

      alert("Address approved!");

    } catch (err) {
      console.error(err);
      alert("Approval failed");
    }
  }

  async function approveAll() {

    const operator = prompt("Enter operator address:");

    if (!operator) return;

    try {
      const contract = new ethers.Contract(
        ERC721_ADDRESS,
        erc721Abi.abi,
        signer
      );

      const tx = await contract.setApprovalForAll(operator, true);
      await tx.wait();

      alert("Operator approved for all NFTs!");

    } catch (err) {
      console.error(err);
      alert("Approval failed");
    }
  }



  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Web3 Playground</h1>

      {!account && (
        <button onClick={connectWallet}>
          Connect MetaMask
        </button>
      )}

      {account && (
        <>
          <p><b>Connected:</b> {account}</p>

          <h2>ERC20 Balance</h2>
          <p>{balance} {symbol}</p>

          <h2>Your NFTs</h2>
          {nfts.length === 0 && <p>No NFTs owned</p>}
          <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            {nfts.map(nft => (
              <div
                key={nft.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  padding: "10px",
                  width: "220px"
                }}
              >
                <img
                  src={nft.image}
                  alt={nft.name}
                  style={{ width: "200px", height: "200px", objectFit: "cover" }}
                />
                <h3>{nft.name}</h3>
                <p>{nft.description}</p>
                <small>Token ID: {nft.id}</small>

                <br />

                <button
                  onClick={() => transferNFT(nft.id)}
                  style={{
                    marginTop: "10px",
                    padding: "6px 10px",
                    cursor: "pointer"
                  }}
                >
                  Transfer NFT
                </button>

              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
