// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DrearlModule", (m) => {
  const token = m.contract("DrearlToken", [], {});
  const Nft = m.contract("DrearlNFT", [], {});
  const Drearl = m.contract("Drearl", [token, Nft], {});

  return { Drearl, token, Nft };
});
