# Backend services Documentation

This documentation provides an overview of the backend services used in our project. These services are essential for handling various functionalities and integrating with third-party libraries.

## Backend Service Overview

The backend service is implemented in Python and is built using the [FastAPI](https://fastapi.tiangolo.com/) framework. It serves as the core component responsible for handling various tasks and interacting with external libraries.

## Third-Party Library Integration

Our backend services seamlessly integrate with the following third-party libraries to enhance functionality:

- [Twilio Auth API](https://www.twilio.com/docs/authy/quickstart): This library enables Two-Factor Authentication for transactions above a certain limit or to specific recipient addresses. It enhances security in our application.


- [ODMantic](https://art049.github.io/odmantic/): ODMantic serves as an Object Document Mapper for MongoDB, allowing us to work with MongoDB databases using standard Python type hints. It simplifies database interactions and data modeling.


- [XRPL Python Library](https://xrpl-py.readthedocs.io/en/stable/): This library facilitates the autofund functionality in our application, making it easier to handle transactions on the XRP Ledger.

## Source code

You can find the source code for our backend services on GitHub: [Backend Services Repository](https://github.com/ntls-io/nautilus-wallet/tree/main/backend-services)