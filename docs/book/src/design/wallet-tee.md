# Wallet TEE

The Wallet TEE consists of a trusted SGX enclave, alongside an untrusted host service.

## SGX enclave

The Wallet SGX enclave contains the system's [Trusted Computing Base (TCB)][TCB], and is responsible for all security-sensitive wallet operations:

- Generating and managing account keypairs
- Performing privileged operations such as transaction signing

Once generated, secret keys and other sensitive data never leaves the enclave unencrypted. All persistent storage is cryptographically sealed and authenticated, and all trusted communication with the enclave occurs over cryptographically attested and mutually-authenticated channels.

[TCB]: https://en.wikipedia.org/wiki/Trusted_computing_base

## Host service

The SGX enclave is embedded in an untrusted host service, which facilitates communication between the enclave and the outside world.

* Remote attestation, which allows the Connector app to remotely verify the identity and integrity of the enclave, and exchange keys to set up a trusted communication channel
* Sealed message exchange, which allows the Connector app to request wallet operations, and receive results

## Source code

* <https://github.com/ntls-io/nautilus-wallet/tree/main/web-server>
