#!/bin/sh -e
# This generates a Dockerfile stage diagram using:
# https://github.com/patrickhoefler/dockerfilegraph

docker run --rm \
  --user "$(id -u):$(id -g)" \
  --workdir /workspace \
  --mount type=bind,source="$(pwd)",target=/workspace \
  ghcr.io/patrickhoefler/dockerfilegraph
