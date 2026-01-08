const { HardhatUserConfig } = require("hardhat/config");
require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition-ethers");

const config = {
  solidity: {
    version: "0.8.27",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337, // Standard for local Hardhat network
    },
    // localhost: {
    //   url: "http://127.0.0.1:8545",
    //   chainId: 1337,
    // },
    // sepolia: {
    //   url: "https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID",
    //   accounts: ["YOUR_PRIVATE_KEY"]
    // }
  },
  paths: {
    sources: "./contracts",
  },
};

module.exports = config;
