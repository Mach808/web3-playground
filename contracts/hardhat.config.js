require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();



module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    hardhat: {},


    localhost: {
      url: "http://127.0.0.1:8545",
    },

    Polygon: {
      url:"https://polygon-amoy.infura.io/v3/b13d3499598148d1829fc6512f582095",
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};
