#!/bin/sh -e

adlc () {
    docker run \
        -i --rm \
        --user "$(id -u):$(id -g)" \
        --volume "$PWD":/run/pwd --workdir /run/pwd \
        --network none \
        adlc "$@"
}

adlc verify -I . ./*.adl

test -d out && rm -r out

adlc rust -I . -O out ./*.adl
rustfmt out/adl/*.rs

adlc typescript -I . -O out --exclude-ast ./*.adl
