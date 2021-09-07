# Makefile settings - Host part

LIB = ../build/lib/
BIN = ../build/bin/
# APP_U matches name in Cargo.toml
APP_U = sgx-wallet-app
APP_T = enclave.so
NAME_U = libEnclave_u.a
SRC_U = ./
CODEGEN_U = $(SRC_U)/codegen/
SRC_T = ../enclave/
OBJ_U = ../build/obj/
FLAGS = -Wall -Wextra
GCC_STEP1_U = -I $(CODEGEN_U) -I./include -I$(SGX_SDK)/include -I$(CUSTOM_EDL_PATH) -fPIC -Wno-attributes $(SGX_COMMON_CFLAGS)
FILES_U = Enclave_u.c
FILES_U_H = Enclave_u.h
SGX_ARCH = x64
TRTS_LIB = sgx_trts
SERVICE_LIB = sgx_tservice
# Addprefix dependant variables, no need to change those
OUTPUT_U = $(FILES_U:.c=.o)
BIN_U = $(addprefix $(BIN), $(APP_U))
NAME_U_D = $(addprefix $(LIB), $(NAME_U))
FILES_U_F=$(addprefix $(CODEGEN_U), $(FILES_U))
FILES_U_H_F=$(addprefix $(CODEGEN_U), $(FILES_U_H))
OUTPUT_W_FU=$(addprefix $(OBJ_U), $(OUTPUT_U))

# All Rust and other source files that the Cargo build depends on.
FILES_RUST_F = Cargo.toml Cargo.lock build.rs $(shell find src -name '*.rs') $(CODEGEN_U)Enclave_u.rs

# Contains compilation rules for the enclave part

include ../buildenv.mk
include ../buildenv_sgx.mk

# Custom libraries, EDL paths. Needs to be specified with make (CUSTOM_EDL_PATH) (CUSTOM_COMMON_PATH)

# Compilation process, we set up all the dependencies needed to have the correct order of build, and avoid relink

all: $(BIN_U)

$(FILES_U_F): $(SGX_EDGER8R) $(SRC_T)/Enclave.edl
	@echo "\033[32mGenerating untrusted SGX C edl files...\033[0m"
	@$(SGX_EDGER8R) --untrusted $(SRC_T)/Enclave.edl --search-path $(SGX_SDK)/include --search-path $(CUSTOM_EDL_PATH) --untrusted-dir $(CODEGEN_U)

$(NAME_U_D): $(FILES_U_F) $(OUTPUT_W_FU)
	@echo "\033[32mBuilding untrusted C edl static library...\033[0m"
	@mkdir -p $(LIB)
	@$(AR) rcsD $@ $(OUTPUT_W_FU)

$(OBJ_U)%.o:$(CODEGEN_U)%.c
	@mkdir -p $(OBJ_U)
	@echo "\033[32m$?: Build in progress...\033[0m"
	@$(CC) $(FLAGS) $(GCC_STEP1_U) -o $@ -c $?

# We print the compilation mode we're in (hardware/software mode), just as a reminder.

$(BIN_U): $(NAME_U_D) $(FILES_RUST_F) $(FILES_U_H_F)
ifeq ($(SGX_MODE), SW)
	@echo "\033[32mSoftware / Simulation mode\033[0m"
else
	@echo "\033[32mHardware mode\033[0m"
endif
	@echo "\033[32mStarting cargo to build the host...\033[0m"
	@cd $(SRC_U) && SGX_SDK=$(SGX_SDK) cargo build --release
	@echo "\033[32mCopying the host to the correct location... ($(BIN_U))\033[0m"
	@mkdir -p $(BIN)
	@cp $(SRC_U)/target/release/$(APP_U) $(BIN)

$(CODEGEN_U)Enclave_u.rs: $(CODEGEN_U)Enclave_u.h
	@echo "\033[32mGenerating Rust bindings: $@\033[0m"
	@bindgen \
		--no-recursive-allowlist \
		--raw-line 'use sgx_types::*;' \
		--allowlist-function ecall_test \
		--output $@ \
		$? \
		-- -I$(SGX_SDK)/include -I$(CUSTOM_EDL_PATH)

clean: c_clean
	@rm -rf $(OBJ_U)
	@echo "\033[32mObject files deleted\033[0m"

fclean: clean fclean_host

fclean_host:
	@echo "\033[32mBinary file $(BIN_U) deleted\033[0m"
	@rm -f $(BIN_U)
	@rm -f $(NAME_U_D)
	@cargo clean

c_clean:
	@echo "\033[32mC edl generated files deleted\033[0m"
	@rm -rf $(FILES_U_F)
	@rm -rf $(FILES_U_H_F)

re: fclean all

.PHONY: all clean c_clean fclean re fclean_host
