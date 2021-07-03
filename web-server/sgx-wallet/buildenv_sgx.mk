SGX_SDK ?= /opt/sgxsdk

# Directly imported from the original Intel SGX samples, helpful to detect the system architecture

ifeq ($(shell getconf LONG_BIT), 32)
	SGX_ARCH := x86
else ifeq ($(findstring -m32, $(CXXFLAGS)), -m32)
	SGX_ARCH := x86
endif

ifeq ($(SGX_ARCH), x86)
	SGX_COMMON_CFLAGS := -m32
	SGX_LIBRARY_PATH := $(SGX_SDK)/lib
	SGX_ENCLAVE_SIGNER := $(SGX_SDK)/bin/x86/sgx_sign
	SGX_EDGER8R := $(SGX_SDK)/bin/x86/sgx_edger8r
else
	SGX_COMMON_CFLAGS := -m64
	SGX_LIBRARY_PATH := $(SGX_SDK)/lib64
	SGX_ENCLAVE_SIGNER := $(SGX_SDK)/bin/x64/sgx_sign
	SGX_EDGER8R := $(SGX_SDK)/bin/x64/sgx_edger8r
endif

# If specified, software / simulation mode. Otherwise, hardware mode no matter what.

ifeq ($(SGX_MODE), SW)
	TRTS_LIB := sgx_trts_sim
	SERVICE_LIB := sgx_tservice_sim
endif

# If debug mode, we can set up extra options such as the debug flags

ifeq ($(SGX_DEBUG), 1)
	SGX_COMMON_CFLAGS += -O0 -g
else
	SGX_COMMON_CFLAGS += -O2
endif

# Show helpful error messages if main environment variables are not set.

$(SGX_EDGER8R):
	$(error "$@" does not exist. (Is SGX_SDK set correctly?))

ifndef CUSTOM_EDL_PATH
$(error CUSTOM_EDL_PATH not set)
endif

ifndef CUSTOM_COMMON_PATH
$(error CUSTOM_COMMON_PATH not set)
endif
