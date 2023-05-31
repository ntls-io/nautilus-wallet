# Deployment

For build instructions see: [building](building.md)

## Web Client

To deploy, serve the contents of the `www` bundle after building the application.

## Web Server

### Requirements

- Docker
- docker-compose

To run the web server in HW mode:

- SGX capable machine with DCAP support

## Steps

To run in HW mode:
`docker-compose up server-hw`

To run in SW mode:
`docker-compose up server-sw`

By default the web server is bound to `0.0.0.0:8080`

## Asset Services

### Requirements

- Docker
- docker-compose

### Steps

1. After building the docker images make sure the environment configuration is correct.
   Environment variables to set:

   - `ONFIDO_API_TOKEN`
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_VERIFY_SERVICE_SID`
   - `TWILIO_MESSAGING_SERVICE_SID`

2. To run the image, do `docker-compose up` in the asset services directory.

By default the asset services are bound to `0.0.0.0:8081`
