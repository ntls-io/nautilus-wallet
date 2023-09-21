# Nautilus Wallet Documentation

Welcome to the documentation for the Nautilus Wallet project. This document provides an overview of the Nautilus Wallet and its features, along with useful links for further information.


<!-- Show the text logo with a background colour, to be compatible with light and dark themes. -->
<div style="
    background-color: #003450;
    border-radius: 2em;
    display: inline-flex;
    padding: 1.5em 2em;
">
    <img src="images/logo-title.svg" alt="Nautilus Wallet logo">
</div> 

## Nautilus Wallet Overview

The **Nautilus Wallet** is a cryptographic wallet hosted on a Trusted Execution Environment (TEE). It offers non-custodial services and is accessible to users who do not own a smartphone or device. The project also includes services for managing and governing assets in the context of Central Bank Digital Currency (CBDC).


The project also includes services for managing and governing assets in a [CBDC] context.

- Trusted Execution Environment (TEE): https://en.wikipedia.org/wiki/Trusted_execution_environment
- Intel SGX: https://www.intel.com/content/www/us/en/architecture-and-technology/software-guard-extensions.html
- CBDC: https://en.wikipedia.org/wiki/Central_bank_digital_currency

## Nautilus Wallet Features 

- **Send and receive funds in XRP**: Users can send and receive funds using [XRP](https://xrpl.org/what-is-xrp.html), Ripple's Native Digital Currency.

- **Basic Know Your Customer (KYC) Integration**: New users can complete KYC processes with the support of Onfido.

- **Payment Connector**: Users can act as connectors, charging a fee for transactions executed on their devices. The fee is displayed to users before completing a transaction.

- **Two-factor authentication**: Users can verify their phone numbers and enable optional two-factor authentication via SMS. This adds an extra layer of security for authorizing transactions.

- **PIN Reset**: Users can reset their PIN if they answer security questions correctly.

- **Bookmarking recipients**: Users can bookmark preferred recipients for easier transactions.

- **Pull payments**: Pull payments can be initiated by the receiving party and authorized by the sending party. This is especially useful for vendor transactions.

- **Recurring payments**: Users can set up recurring payments to the same recipient when their wallet balance allows.


## Useful Links

- [Product Information](https://ntls.io/nautilus-wallet/)
- [GitHub Repository](https://github.com/ntls-io/nautilus-wallet)
- [Product Demo](https://staging.ntls.io)

## See also

- [Technical Architecture (GitHub Wiki)](https://github.com/ntls-io/nautilus-wallet/wiki/Technical-Architecture)
- [Nautilus Wallet & CBDC Suite - Technical Architecture (Google Docs)](https://docs.google.com/document/d/1gCRxOZiuo6qXNpZOcoovM_wTNUc_8u-GfyyraEGTaWA/edit)
