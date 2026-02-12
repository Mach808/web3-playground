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

  async function connectWallet() {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);

    loadERC20(provider, accounts[0]);
    loadNFTs(provider, accounts[0]);
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

    // simple scan first 10 tokenIds
    for (let i = 0; i < 10; i++) {
      try {
        const owner = await contract.ownerOf(i);
        if (owner.toLowerCase() === user.toLowerCase()) {
          owned.push(i);
        }
      } catch {}
    }

    setNfts(owned);
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
          {nfts.map(id => (
            <div key={id}>NFT Token ID: {id}</div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
