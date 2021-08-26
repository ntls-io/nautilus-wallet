# Nautilus Wallet - Web Server

## Useful commands

### Docker-based

Run the tests and server inside Docker:

```shell
docker-compose --build up test-sw
docker-compose --build up server-sw
```

### Host-based

To build and run the codebase outside of Docker, you'll need the Intel and Rust SGX SDKs set up:
see [rust-sgx-sdk-dev-env] for one way to do this.

[rust-sgx-sdk-dev-env]: https://github.com/PiDelport/rust-sgx-sdk-dev-env

Once this is done, you can build and run the tests and server using `make` and `make run`:

```shell
(cd sgx-wallet-test && make run)
(cd sgx-wallet && make run)
```

You can use [cargo make] to run cargo tasks for the whole codebase:

```shell
cargo make
cargo make format
cargo make check
cargo make test
cargo make docs
cargo make --list-all-steps
```

[cargo make]: https://github.com/sagiegurari/cargo-make

## Rust SGX SDK revision

The codebase is currently pinned to the following revision:

- Commit: [d107bd0718f723221750a4f2973451b386cbf9d2](https://github.com/apache/incubator-teaclave-sgx-sdk/commit/d107bd0718f723221750a4f2973451b386cbf9d2)
- PR: [Update to intel-sgx-sdk-2.14 #346](https://github.com/apache/incubator-teaclave-sgx-sdk/pull/346)

This same revision should be used across the project, to avoid Cargo dependency resolution issues.
