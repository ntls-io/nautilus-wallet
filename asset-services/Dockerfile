# Docker build for the Nautilus Asset Services.
#
# For documentation about this file, see web-server/Dockerfile

# Pre-stage build args:

ARG RUST_TOOLCHAIN="1.59"

# For release builds, set both CARGO_BUILD_FLAGS="--release" and CARGO_OUTPUT_PROFILE="release"
ARG CARGO_BUILD_FLAGS
ARG CARGO_OUTPUT_PROFILE="debug"

# STAGE: base
# Common base for both builder and runner stages, with apt caching, ca-certificates, and a non-root user
FROM ubuntu:20.04 AS base

RUN rm /etc/apt/apt.conf.d/docker-clean

RUN --mount=type=cache,sharing=locked,target=/var/cache/apt \
    --mount=type=cache,sharing=locked,target=/var/lib/apt \
    apt-get update && apt-get install -y -o APT::Keep-Downloaded-Packages=true \
    ca-certificates

RUN useradd user --create-home --uid 1000
USER user
WORKDIR /home/user

# STAGE: base-builder (from base)
# Base for builder stages, with build-essential, building under /build
FROM base AS base-builder

USER root
RUN --mount=type=cache,sharing=locked,target=/var/cache/apt \
    --mount=type=cache,sharing=locked,target=/var/lib/apt \
    apt-get update && apt-get install -y -o APT::Keep-Downloaded-Packages=true \
    build-essential
USER user

WORKDIR /build

# STAGE: rust-builder (from base-builder, arg RUST_TOOLCHAIN)
# Builder for Rust, with Rust toolchain under /home/user/.cargo
FROM base-builder AS rust-builder

ADD --chown=user:user "https://static.rust-lang.org/rustup/dist/x86_64-unknown-linux-gnu/rustup-init" /home/user/rustup-init
RUN chmod +rx /home/user/rustup-init
ARG RUST_TOOLCHAIN
RUN /home/user/rustup-init -y --no-modify-path --default-toolchain "${RUST_TOOLCHAIN}"

# Hack to initialise the crates.io cache.
RUN --mount=type=cache,sharing=locked,uid=1000,gid=1000,target=/home/user/.cargo/registry \
    --mount=type=cache,sharing=locked,uid=1000,gid=1000,target=/home/user/.cargo/git \
    . ~/.cargo/env && \
    cargo search --limit 0

# STAGE: build-asset-services (from asset-services-builder)
# Builder for this project, with source files under /build/asset-services
FROM rust-builder AS asset-services-builder

# Required by: https://docs.rs/openssl/#automatic
USER root
RUN --mount=type=cache,sharing=locked,target=/var/cache/apt \
    --mount=type=cache,sharing=locked,target=/var/lib/apt \
    apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y -o APT::Keep-Downloaded-Packages=true \
    pkg-config libssl-dev
USER user

WORKDIR /build/asset-services
COPY --chown=user . .

# STAGE: build-asset-services (from asset-services-builder, args CARGO_BUILD_FLAGS, CARGO_OUTPUT_PROFILE)
# Build all asset-services targets
FROM asset-services-builder AS build-asset-services

ARG CARGO_BUILD_FLAGS
ARG CARGO_OUTPUT_PROFILE
RUN --mount=type=cache,sharing=locked,uid=1000,gid=1000,target=/home/user/.cargo/registry \
    --mount=type=cache,sharing=locked,uid=1000,gid=1000,target=/home/user/.cargo/git \
    --mount=type=cache,sharing=locked,uid=1000,gid=1000,target=/build/asset-services/target \
    . ~/.cargo/env && \
    cargo check --all-targets ${CARGO_BUILD_FLAGS} && \
    cargo build --all-targets ${CARGO_BUILD_FLAGS} && \
    cp -p \
        /build/asset-services/target/${CARGO_OUTPUT_PROFILE}/asset-services-api \
        /build/asset-services/target/${CARGO_OUTPUT_PROFILE}/asset-services-worker \
        -t /build

# STAGE: run-asset-services-api (from base)
# Run the asset-services-api executable
FROM base AS run-asset-services-api

WORKDIR /app
COPY --from=build-asset-services /build/asset-services-api /app
CMD /app/asset-services-api

# STAGE: run-asset-services-worker (from base)
# Run the asset-services-worker executable
FROM base AS run-asset-services-worker

WORKDIR /app
COPY --from=build-asset-services /build/asset-services-worker /app
CMD /app/asset-services-worker
