# Overview

The Nautilus Wallet system consists of the following high systems:

1. An underlying [ledger platform](ledger-platform.md) and its asset(s)
2. The [Wallet](wallet.md) itself:
   - The [Wallet TEE](wallet-tee.md) (server) hosts and provides access to the Wallet SGX enclave
   - The [Wallet Connector app](wallet-connector-app.md) (client) securely connects wallet owners with their wallets
3. [Asset services](asset-services.md), which help manage and govern the asset:
   - The KYC service
   - User verification service

## System Landscape diagram

[![System Landscape diagram][diagram]][diagram]

[diagram]: diagrams/SystemLandscape.svg

**Figure:** [System Landscape diagram] of Nautilus Wallet and the systems it interacts with.

[System Landscape diagram]: https://c4model.com/#SystemLandscapeDiagram
