# TradeFlow-Core: Decentralized Trade Finance on Soroban

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Soroban](https://img.shields.io/badge/soroban-ready-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

**TradeFlow-Core** is the smart contract layer for the TradeFlow protocol. It enables Real-World Asset (RWA) tokenization and decentralized factoring on the Stellar network.

## 🏗 Architecture

The system consists of two decoupled smart contracts:

1.  **`invoice_nft`**: A standard-compliant NFT representing a verified invoice. It holds metadata (IPFS hash, face value, currency, due date).
2.  **`lending_pool`**: An escrow vault where liquidity providers deposit stablecoins (USDC). It accepts `invoice_nft` as collateral to automate loan origination and repayment.

## 🚀 Quick Start

We use a `Makefile` to standardize developer workflows.

### Prerequisites
- Rust & Cargo (latest stable)
- Soroban CLI (`cargo install --locked soroban-cli`)

### Build & Test
```bash
# Build all contracts (optimized for WASM)
make build

# Run the test suite
make test
