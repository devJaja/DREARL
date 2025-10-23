# 🏡 DREARL — Decentralized Real Estate and Land Registry

> **DREARL (Decentralized Real Estate and Registry of Land)** is a blockchain-based property registry platform that enables secure, transparent, and tamper-proof land ownership verification — built on **Base** and powered by **Next.js + Hardhat**.

---

## 🔎 Overview

Real estate fraud and opaque land registries are major challenges in many regions. **DREARL** solves this by leveraging blockchain to record land ownership as **verifiable on-chain assets**, ensuring transparency, trust, and instant property transfers without intermediaries.

### 🎯 Vision
> “To make land ownership transparent, verifiable, and accessible to everyone through blockchain technology.”

---

## ⚙️ Architecture

DREARL combines **smart contracts** and a **Next.js frontend** into a fully decentralized property registry system.

```mermaid
graph TD
    A[User Interface (Next.js)] --> B[Smart Contracts (Hardhat + Solidity)]
    B --> C[Blockchain (Base Network)]
    A --> D[IPFS Storage for Documents]
    B --> E[Doma Protocol (RWA Integration)]

✨ Key Features

🏠 Land Registration — Register property ownership on-chain.

🔍 Land Verification — Government-approved verifiers confirm authenticity.

🧾 Tokenized Ownership — Each verified land becomes an NFT certificate.

🔄 Ownership Transfer — Buy or sell property using smart contracts.

🧱 Immutable Records — Ownership data stored permanently on-chain.

💰 RWA Integration — Tokenized properties usable in DeFi via Doma Protocol.

🧩 Smart Contract Structure
Contract	Description
LandRegistry.sol	Core contract managing property registration and verification.
LandToken.sol	ERC-721 token representing property ownership.
LandAuthority.sol	Handles role-based access control for verifiers and registrars.
LandTransfer.sol	Logic for secure property sales and transfers.
🖥️ Frontend Overview

Built with Next.js and Tailwind CSS, the frontend provides a seamless interface for users to register, verify, and transfer land ownership.

drearl-frontend/
│
├── components/
│   ├── Header.jsx
│   ├── LandCard.jsx
│   ├── RegisterLandForm.jsx
│   └── TransferModal.jsx
│
├── pages/
│   ├── index.jsx
│   ├── dashboard.jsx
│   ├── register.jsx
│   └── verify.jsx
│
├── hooks/
│   ├── useLandRegistry.js
│   └── useWallet.js
│
└── styles/
    └── globals.css

🔗 Tech Stack
Layer	Technology
Frontend	Next.js, Tailwind CSS, Wagmi, Ethers.js
Smart Contracts	Solidity 0.8.27, Hardhat
Network	Base (OP Stack)
Storage	IPFS for documents
Integration	Doma Protocol (Real World Assets)
Deployment	Vercel (Frontend), BaseScan (Contracts)
🧠 User Flow

Register Land:
A landowner fills out property details and uploads documents to IPFS.

Verification:
An authorized verifier (or registry officer) validates the submission on-chain.

Mint NFT:
The verified property is minted as an NFT representing digital ownership.

Transfer / Sale:
Ownership can be transferred directly between parties without intermediaries.

🛠️ Installation & Setup
Prerequisites

Node.js ≥ 20.0.0

npm ≥ 10.0.0

Hardhat

MetaMask wallet connected to Base testnet

Steps
# Clone repository
git clone https://github.com/DREARL/DREARL.git

# Navigate to project folder
cd DREARL

# Install dependencies
npm install

Compile & Deploy Contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network base-sepolia

Run Frontend
cd frontend
npm run dev


Visit http://localhost:3000
 to view the app.

⚙️ Environment Variables

Create a .env.local file in the project root:

NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
NEXT_PUBLIC_BASE_RPC_URL=https://base-sepolia.g.alchemy.com/v2/your_key
NEXT_PUBLIC_TEMPLATE_CLIENT_ID=your_client_id

🧾 Example Interaction

Registering a Land Property:

await contract.registerLand(
  "Plot 24A, Victoria Island, Lagos",
  "ipfs://QmDocumentHash",
  ownerAddress
);


Verifying Ownership:

await contract.verifyLand(tokenId, verifierAddress);


Transferring Ownership:

await contract.transferFrom(currentOwner, newOwner, tokenId);

🧭 Roadmap
Phase	Milestone
✅ Phase 1	Smart contracts + testnet deployment
✅ Phase 2	Frontend integration with Base network
🚧 Phase 3	Doma Protocol integration for land tokenization
🔜 Phase 4	Partnership with local government agencies
🔜 Phase 5	Cross-border real estate marketplace
🛡️ Security & Compliance

Contracts verified on BaseScan

Role-based access control for verifiers

Immutable property records on-chain

Audit scheduled post-mainnet deployment

🤝 Contributing

We welcome contributions from developers, designers, and blockchain enthusiasts!

Fork the repo

Create a new branch (git checkout -b feature/new-feature)

Commit changes (git commit -m "Add new feature")

Push to branch (git push origin feature/new-feature)

Open a Pull Request 🚀

📄 License

This project is licensed under the MIT License — see the LICENSE
 file for details.
