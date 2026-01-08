import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const DrearlModule = buildModule("DrearlModule", (m) => {
  const drearlToken = m.contract("DrearlToken", []);
  const drearlNft = m.contract("DrearlNFT", []);

  const drearlContract = m.contract("Drearl", [
    drearlToken,
    drearlNft,
  ]);

  return { drearlToken, drearlNft, drearlContract };
});

export default DrearlModule;
