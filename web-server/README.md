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

You'll also need to install [bindgen], and its [requirements]:

```shell
cargo install bindgen
sudo apt install llvm-dev libclang-dev clang
```

[bindgen]: https://crates.io/crates/bindgen
[requirements]: https://rust-lang.github.io/rust-bindgen/requirements.html

Once this is done, you can build and run the tests and server using `make` and `make run`:

```shell
(cd sgx-wallet-test && make run)
(cd sgx-wallet && make run)
```

You can use [cargo make] ([installation]) to run cargo tasks for the whole codebase:

```shell
cargo make
cargo make format
cargo make check
cargo make test
cargo make docs
cargo make --list-all-steps
```

[cargo make]: https://github.com/sagiegurari/cargo-make
[installation]: https://github.com/sagiegurari/cargo-make#installation

## Rust SGX SDK revision

The codebase is currently pinned to the following revision:

- Commit: [863378876c55025084572e22554bbedd57eead97](https://github.com/apache/incubator-teaclave-sgx-sdk/commit/863378876c55025084572e22554bbedd57eead97)
- Issue: [upgrade SDK and rust compiler urgently needed #360](https://github.com/apache/incubator-teaclave-sgx-sdk/issues/360)
- Branch: [v1.1.4-testing](https://github.com/apache/incubator-teaclave-sgx-sdk/compare/v1.1.4-testing) (merged)

This same revision should be used across the project, to avoid Cargo dependency resolution issues.
