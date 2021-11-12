## Library crates (std-based)

- `http-service-impl` - HTTP endpoints for enclave communication

## SGX library crates

- `sgx-wallet-impl` - Wallet enclave implementation

## SGX executable projects

These are based on the Rust SGX SDK [project_template]. Each contains matching `app` and `enclave` crates.

- `sgx-wallet`

  - Wrapper around `sgx-wallet-impl` using `http-service-impl`

- `sgx-wallet-test`
  - Wrapper around `sgx-wallet-impl`
  - Contains enclave-based test code to exercise `sgx-wallet-impl`

[project_template]: https://github.com/apache/incubator-teaclave-sgx-sdk/tree/master/samplecode/project_template
