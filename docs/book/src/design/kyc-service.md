# KYC Service

The KYC service currently integrates with [Onfido](https://onfido.com/) to verify customer documents.

The KYC service is responsible for confirming the results of the KYC process using the Onfido integration on the app.
The application saves the user's KYC check, allowing the app to enforce limits depening on the deployment configuration.

## Configuration

### App wide configuration

- `requireOnfidoCheckBeforeSendPayment`: If set to true this option will prevent the user from sending payments using the app if they have not completed the KYC process.

### Asset configuration

- `transactionLimitWithoutOnfidoCheck`: Transaction limit that limits the amount of an asset a user can transact before they completed the KYC process.
