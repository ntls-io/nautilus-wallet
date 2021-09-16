# Nautilus Asset Services

## Quick start

### Docker-based

```shell
docker-compose up --build
```

To build release (optimised) binaries:

```shell
docker-compose build --build-arg CARGO_BUILD_FLAGS="--release" --build-arg CARGO_OUTPUT_PROFILE="release"
```

## Maintenance

Useful `cargo` commands:

```shell
cargo +nightly fmt
```

Useful `cargo make` tasks:

```shell
cargo make format-toml
cargo +nightly make unused-dependencies
```

## See also

- [Architecture](ARCHITECTURE.md)
