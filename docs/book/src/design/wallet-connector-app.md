# Wallet Connector App Documentation

Welcome to the documentation for the Wallet Connector app. This document provides an overview of the app's functionality and its technology stack.


## Wallet Connector App Overview

The Wallet Connector app is designed to run on web and smartphone devices (Android and iOS). It serves as a tool for transacting users to manage wallets and authorize transactions using a combination of QR codes and PIN-based authentication.

The primary purpose of the Connector app is to facilitate transactions for users other than the device owner, such as customers, friends, or family members. Each session established by the Connector app with the Wallet Trusted Execution Environment (TEE) is designed to be interactive, private, and short-lived. No session state is retained between sessions, and device owners and different transacting users have no access to each other's wallets or accounts.

## Useful Links to Connector App's Technology Stack

- [Angular](https://angular.io/): The frontend framework for building dynamic web applications.

- [Ionic Framework](https://ionicframework.com/): A framework for building cross-platform mobile applications.

- [Akita State Management](https://opensource.salesforce.com/akita/): A state management library for Angular applications.

- [Jasmine Testing Framework](https://jasmine.github.io/): A testing framework for JavaScript applications.

- [Storybook](https://storybook.js.org/): A development environment for UI components.

## Source Code

You can access the source code for the Wallet Connector app on GitHub:

- [Web-client Repository](https://github.com/ntls-io/nautilus-wallet/tree/main/web-client)