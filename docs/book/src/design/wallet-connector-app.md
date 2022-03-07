# Wallet Connector app

The Wallet Connector app runs on web and smartphone (Android, iOS) devices, and allows transacting users to manage wallets and authorise transactions using a combination of QR codes and PIN based authentication.

The Connector app is primarily intended to facilitate transactions for transacting users other than the device owner (such as customers, friends, or family members, friends, or customers),
so each session that the Connector app establishes with the Wallet TEE is designed to be interactive, private, and short-lived. 
The Connector app retains no session state between sessions, and device owners and different transacting users have no access to each others' wallets or accounts.

## Source code

* <https://github.com/ntls-io/nautilus-wallet/tree/main/web-client>
