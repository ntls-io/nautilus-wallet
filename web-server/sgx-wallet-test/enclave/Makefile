# Makefile settings

APP_T_SIGNED = enclave.signed.so
KEYS = ../keys
LIB = ../build/lib/
BIN = ../build/bin/
APP_T = enclave.so
NAME_T = libenclave.a
SRC_U = ../app/
SRC_T = ./
CODEGEN_T = $(SRC_T)/codegen/
OBJ_T = ../build/obj/
FLAGS = -Wall -Wextra
GCC_STEP1_T = -fstack-protector -I$(CUSTOM_COMMON_PATH)/inc -I$(CUSTOM_EDL_PATH) -I$(SGX_SDK)/include \
	-I$(SGX_SDK)/include/tlibc -I$(SGX_SDK)/include/stlport -I$(SGX_SDK)/include/epid -I $(CODEGEN_T) \
	-L$(LIB) $(ENCLAVE_CFLAGS) $(SGX_COMMON_CFLAGS)
GCC_STEP2_T = -Wl,--no-undefined -nostdlib -nodefaultlibs -nostartfiles -L$(SGX_LIBRARY_PATH) \
	-Wl,--whole-archive -l$(TRTS_LIB) -Wl,--no-whole-archive \
	-Wl,--start-group -lsgx_tstdc -l$(SERVICE_LIB) -lsgx_tcrypto -lsgx_tcxx -lsgx_tprotected_fs -L$(LIB) -lenclave -Wl,--end-group \
	-Wl,--version-script=$(SRC_T)Enclave.lds $(ENCLAVE_LDFLAGS)
FILES_T = Enclave_t.c
FILES_T_H = Enclave_t.h
EDL_FILE = Enclave.edl
ENCLAVE_CONFIG = Enclave.config.xml
SGX_ARCH = x64
TRTS_LIB = sgx_trts
SERVICE_LIB = sgx_tservice
# ENCLAVE_CARGO_LIB matches name in Cargo.toml
ENCLAVE_CARGO_LIB=libsgx_wallet_test_enclave.a
# Addprefix dependant variables, no need to change those
OUTPUT_T = $(FILES_T:.c=.o)
NAME = $(addprefix $(BIN), $(APP_T_SIGNED))
BIN_T = $(addprefix $(BIN), $(APP_T))
NAME_T_D = $(addprefix $(LIB), $(NAME_T))
OUTPUT_W_FU=$(addprefix $(OBJ_U), $(OUTPUT_U))
FILES_T_F=$(addprefix $(CODEGEN_T), $(FILES_T))
FILES_T_H_F=$(addprefix $(CODEGEN_T), $(FILES_T_H))
FILES_T_F_RUST=$(addprefix $(SRC_T), $(FILES_T_RUST))
OUTPUT_W_FT=$(addprefix $(OBJ_T), $(OUTPUT_T))

# All Rust and other source files that the Cargo build depends on.
FILES_RUST_F = Cargo.toml Cargo.lock $(shell find src ../../sgx-wallet-impl/src -name '*.rs')

# Contains compilation rules for the enclave part

include ../buildenv.mk
include ../buildenv_sgx.mk

# Custom header files and EDL paths needs to be specified with make (CUSTOM_EDL_PATH) (CUSTOM_COMMON_PATH)

ifeq ($(MITIGATION-CVE-2020-0551), LOAD)
export MITIGATION_CVE_2020_0551=LOAD
else ifeq ($(MITIGATION-CVE-2020-0551), CF)
export MITIGATION_CVE_2020_0551=CF
endif

# Compilation process, we set up all the dependencies needed to have the correct order of build, and avoid relink

all: $(NAME)

# We print the compilation mode we're in (hardware/software mode), just as a reminder.

$(NAME): $(BIN_T) $(KEYS)/Enclave_private.pem
ifeq ($(SGX_MODE), SW)
	@echo "\033[32mSoftware / Simulation mode\033[0m"
else
	@echo "\033[32mHardware mode\033[0m"
endif
	@echo "\033[32mSigning the enclave...\033[0m"
	@mkdir -p $(BIN)
	@$(SGX_ENCLAVE_SIGNER) sign -key $(KEYS)/Enclave_private.pem -enclave $(BIN_T) -out $@ -config $(SRC_T)Enclave.config.xml

$(KEYS)/Enclave_private.pem $(KEYS)/Enclave_public.pem:
	@echo "\033[32mGenerating keys...\033[0m"
	@mkdir -p $(KEYS)
	@openssl genrsa -out $(KEYS)/Enclave_private.pem -3 3072
	@openssl rsa -in $(KEYS)/Enclave_private.pem -pubout -out $(KEYS)/Enclave_public.pem

$(BIN_T): $(NAME_T_D)
	@echo "\033[32mBuilding the enclave...\033[0m"
	@$(CXX) $(OUTPUT_W_FT) -o $@ $(GCC_STEP2_T)

$(NAME_T_D): $(FILES_T_F) $(OUTPUT_W_FT) $(FILES_RUST_F) $(EDL_FILE) $(ENCLAVE_CONFIG) # We added as a reference the rust files, along with the EDL, the XML config file and the cargo.toml file, so Make can detect if any change was made
	@echo "\033[32mBuilding enclave static library with Cargo...\033[0m"
	@cargo build --release
	@cp ./target/release/$(ENCLAVE_CARGO_LIB) $(LIB)libenclave.a

$(FILES_T_F): $(SGX_EDGER8R) $(SRC_T)/Enclave.edl
	@echo "\033[32mGenerating trusted SGX C edl files...\033[0m"
	@$(SGX_EDGER8R) --trusted $(SRC_T)/Enclave.edl --search-path $(SGX_SDK)/include --search-path $(CUSTOM_EDL_PATH) --trusted-dir $(CODEGEN_T)

$(OBJ_T)%.o:$(CODEGEN_T)%.c
	@mkdir -p $(OBJ_T)
	@echo "\033[32m$?: Build in progress...\033[0m"
	@$(CC) $(FLAGS) $(GCC_STEP1_T) -o $@ -c $?

clean: c_clean
	@rm -rf $(OBJ_T)
	@echo "\033[32mObject files deleted\033[0m"

fclean: clean fclean_enclave

fclean_enclave:
	@echo "\033[32mBinary file $(NAME) deleted\033[0m"
	@rm -f $(NAME)
	@rm -f $(BIN_T)
	@rm -f $(LIB)libenclave.a
	@cargo clean

c_clean:
	@echo "\033[32mC edl generated files deleted\033[0m"
	@rm -rf $(FILES_T_F)
	@rm -f $(FILES_T_H_F)

re: fclean all

.PHONY: all clean c_clean fclean re fclean_enclave
