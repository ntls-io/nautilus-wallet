# Building

## Web Client

### Requirements

- Node 16

### Steps

1. Install the dependencies:

   ```shell
   npm install
   ```

2. Ensure the prod environment file at `web-client/src/environments/environment.prod.ts` is correct for the build.

3. Build the bundle:

   ```shell
   npm build:prod
   ```

The build output is in the `www` directory.

## Web Server

### Requirements

- Docker with buildkit enabled
- Docker Compose

### Steps

Note: docker images build in HW mode can only function on SGX capable hardware with the DCAP drivers installed

1. Building docker image

   - for HW mode:

     ```shell
     docker-compose build server-hw
     ```

   - for SW mode:

     ```shell
     docker-compose build server-sw
     ```

## Asset Services

### Requirements

- Docker with buildkit enabled
- Docker Compose

### Steps

1. Building optimised binaries:

   ```shell
   docker-compose build --build-arg CARGO_BUILD_FLAGS="--release" --build-arg CARGO_OUTPUT_PROFILE="release"
   ```
