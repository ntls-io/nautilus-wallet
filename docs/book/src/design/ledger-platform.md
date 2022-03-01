# Ledger platform

Nautilus Wallet's design supports interfacing with a choice of underlying ledger platform(s).

The system currently supports the following ledgers and asset types:

## Algorand

The [Algorand] ledger supports transacting using [Algorand Standard Assets (ASAs)][ASA].

The Wallet TEE uses an SGX port of the [algonaut] SDK to implement key generation and transaction signing.

The Wallet Connector uses [js-algorand-sdk] to communicate with the Algorand network.

[Algorand]: https://www.algorand.com/
[ASA]: https://developer.algorand.org/docs/get-details/asa/
[algonaut]: https://github.com/manuelmauro/algonaut
[js-algorand-sdk]: https://github.com/algorand/js-algorand-sdk

## XRPL

The [XRP Ledger] supports transacting using [Issued Currencies].

The Wallet TEE uses SGX ports of [ripple-keypairs-rust] and [ripple-address-codec-rust] to implement key generation and transaction signing.

The Wallet Connector uses [xrpl.js] to communicate with the XRP network.

[XRP Ledger]: https://xrpl.org/
[Issued Currencies]: https://xrpl.org/issued-currencies-overview.html
[ripple-keypairs-rust]: https://github.com/otov4its/ripple-keypairs-rust
[ripple-address-codec-rust]: https://github.com/otov4its/ripple-address-codec-rust
[xrpl.js]: https://github.com/XRPLF/xrpl.js
