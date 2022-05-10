"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_pipes_asset-pipes_module_ts-src_app_state_session-algorand_service_ts-src_app-52835a"],{

/***/ 44416:
/*!********************************************!*\
  !*** ./src/app/pipes/asset-amount.pipe.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AssetAmountPipe": () => (/* binding */ AssetAmountPipe)
/* harmony export */ });
/* harmony import */ var src_app_utils_assets_assets_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/utils/assets/assets.common */ 95844);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);


/** @see formatAssetAmount */
class AssetAmountPipe {
    transform(assetAmount) {
        return assetAmount ? (0,src_app_utils_assets_assets_common__WEBPACK_IMPORTED_MODULE_0__.formatAssetAmount)(assetAmount) : assetAmount;
    }
}
AssetAmountPipe.ɵfac = function AssetAmountPipe_Factory(t) { return new (t || AssetAmountPipe)(); };
AssetAmountPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "assetAmount", type: AssetAmountPipe, pure: true });


/***/ }),

/***/ 53631:
/*!*********************************************!*\
  !*** ./src/app/pipes/asset-pipes.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AssetPipesModule": () => (/* binding */ AssetPipesModule)
/* harmony export */ });
/* harmony import */ var src_app_pipes_asset_amount_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/pipes/asset-amount.pipe */ 44416);
/* harmony import */ var src_app_pipes_asset_symbol_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/pipes/asset-symbol.pipe */ 16572);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51109);



const declarations = [src_app_pipes_asset_amount_pipe__WEBPACK_IMPORTED_MODULE_0__.AssetAmountPipe, src_app_pipes_asset_symbol_pipe__WEBPACK_IMPORTED_MODULE_1__.AssetSymbolPipe];
class AssetPipesModule {
}
AssetPipesModule.ɵfac = function AssetPipesModule_Factory(t) { return new (t || AssetPipesModule)(); };
AssetPipesModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: AssetPipesModule });
AssetPipesModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AssetPipesModule, { declarations: [src_app_pipes_asset_amount_pipe__WEBPACK_IMPORTED_MODULE_0__.AssetAmountPipe, src_app_pipes_asset_symbol_pipe__WEBPACK_IMPORTED_MODULE_1__.AssetSymbolPipe], exports: [src_app_pipes_asset_amount_pipe__WEBPACK_IMPORTED_MODULE_0__.AssetAmountPipe, src_app_pipes_asset_symbol_pipe__WEBPACK_IMPORTED_MODULE_1__.AssetSymbolPipe] }); })();


/***/ }),

/***/ 16572:
/*!********************************************!*\
  !*** ./src/app/pipes/asset-symbol.pipe.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AssetSymbolPipe": () => (/* binding */ AssetSymbolPipe)
/* harmony export */ });
/* harmony import */ var src_app_utils_assets_assets_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/utils/assets/assets.common */ 95844);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);


/** @see formatAssetSymbol */
class AssetSymbolPipe {
    transform(assetAmount) {
        return assetAmount ? (0,src_app_utils_assets_assets_common__WEBPACK_IMPORTED_MODULE_0__.formatAssetSymbol)(assetAmount) : assetAmount;
    }
}
AssetSymbolPipe.ɵfac = function AssetSymbolPipe_Factory(t) { return new (t || AssetSymbolPipe)(); };
AssetSymbolPipe.ɵpipe = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({ name: "assetSymbol", type: AssetSymbolPipe, pure: true });


/***/ }),

/***/ 4493:
/*!*******************************************!*\
  !*** ./src/app/services/algod.service.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AlgodService": () => (/* binding */ AlgodService)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var algosdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! algosdk */ 7830);
/* harmony import */ var algosdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(algosdk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_app_services_algosdk_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/algosdk.utils */ 64776);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var src_schema_algorand_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/schema/algorand.helpers */ 95245);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51109);







/**
 * This service wraps an instance of the algosdk {@link AlgodClient},
 * configured from {@link environment.algod}.
 *
 * Responsibilities:
 *
 * - Read account information
 * - Create, submit, and confirm transactions
 */

class AlgodService {
  constructor() {
    // TODO: Convert this DI-provided argument?
    this.algodClient = getAlgodClientFromEnvironment();
  }

  getAccountData(address) {
    var _this = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const accountData = yield _this.algodClient.accountInformation(address).do(); // FIXME(Pi): Unchecked cast; should be validated.

      return accountData;
    })();
  }
  /**
   * @see https://developer.algorand.org/docs/rest-apis/algod/v2/#get-v2assetsasset-id
   */


  getAsset(assetId) {
    var _this2 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const asset = yield _this2.algodClient.getAssetByID(assetId).do(); // FIXME(Pi): Unchecked cast; should be validated.

      return asset;
    })();
  }

  createUnsignedTransaction(required, optional) {
    var _this3 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const suggestedParams = yield _this3.algodClient.getTransactionParams().do();
      console.log('createUnsignedTransaction', 'got:', {
        suggestedParams
      });
      const transaction = (0,src_schema_algorand_helpers__WEBPACK_IMPORTED_MODULE_5__.makePaymentTxnHelper)(suggestedParams, required, optional);
      console.log('createUnsignedTransaction', 'created:', {
        transaction
      });
      return transaction;
    })();
  }

  createUnsignedAssetTransferTxn(required, optional) {
    var _this4 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const suggestedParams = yield _this4.algodClient.getTransactionParams().do();
      return (0,src_schema_algorand_helpers__WEBPACK_IMPORTED_MODULE_5__.makeAssetTransferTxnHelper)(suggestedParams, required, optional);
    })();
  }

  createUnsignedAssetOptInTxn(address, assetIndex) {
    var _this5 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this5.createUnsignedAssetTransferTxn({
        from: address,
        to: address,
        amount: 0,
        assetIndex
      });
    })();
  }

  submitSignedTransaction(signedTxn) {
    var _this6 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this6.algodClient.sendRawTransaction(signedTxn).do();
    })();
  }

  waitForTransactionConfirmation(txId) {
    var _this7 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // TODO: Report rejection and timeout in a way the UI can use.
      return (0,src_app_services_algosdk_utils__WEBPACK_IMPORTED_MODULE_2__.waitForConfirmation)(_this7.algodClient, txId, 4);
    })();
  }
  /** Combine {@link submitSignedTransaction} and {@link waitForTransactionConfirmation}. */


  submitAndConfirmTransaction(signedTxn) {
    var _this8 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        txId
      } = yield _this8.submitSignedTransaction(signedTxn);
      return yield _this8.waitForTransactionConfirmation(txId);
    })();
  }

}

AlgodService.ɵfac = function AlgodService_Factory(t) {
  return new (t || AlgodService)();
};

AlgodService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: AlgodService,
  factory: AlgodService.ɵfac,
  providedIn: 'root'
});
/**
 * Construct an {@link AlgodClient} from {@link environment.algod}.
 *
 * In particular, this enforces {@link IntDecoding.SAFE}: we don't currently accommodate `bigint` values.
 */

const getAlgodClientFromEnvironment = () => {
  const algod = (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_3__.defined)(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.algod, 'environment.algod not configured');
  const client = new (algosdk__WEBPACK_IMPORTED_MODULE_1___default().Algodv2)(algod.token, algod.baseServer, algod.port);
  client.setIntEncoding(algosdk__WEBPACK_IMPORTED_MODULE_1__.IntDecoding.SAFE);
  return client;
};

/***/ }),

/***/ 31239:
/*!******************************************!*\
  !*** ./src/app/services/xrpl.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "XrplService": () => (/* binding */ XrplService)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var src_app_services_xrpl_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/xrpl.utils */ 68170);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var xrpl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xrpl */ 77962);
/* harmony import */ var xrpl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(xrpl__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51109);






/**
 * This service wraps an instance of the algosdk {@link xrpl.Client},
 * configured from {@link environment.xrplClient}.
 *
 * Responsibilities:
 *
 * - Read account and balance information
 * - Create, submit, and confirm transactions
 */

class XrplService {
  constructor() {
    // Call this once on construction as a smoke test.
    this.getClient();
  }
  /**
   * Ping the server, to test connectivity.
   *
   * @see https://xrpl.org/ping.html
   */


  ping() {
    var _this = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return _this.withConnection( /*#__PURE__*/function () {
        var _ref = (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (client) {
          return yield client.request({
            command: 'ping'
          });
        });

        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    })();
  }
  /**
   * Retrieve information about an account, its activity, and its XRP balance.
   *
   * This call defaults to:
   *
   * - `ledger_index: 'validated'`
   * - `strict: true`
   *
   * @see https://xrpl.org/account_info.html
   */


  getAccountInfo(request) {
    var _this2 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this2.withConnection( /*#__PURE__*/function () {
        var _ref2 = (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (client) {
          return yield client.request(Object.assign(Object.assign({
            ledger_index: 'validated',
            strict: true
          }, request), {
            command: 'account_info'
          }));
        });

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
    })();
  }
  /**
   * Like {@link getAccountInfo}, but catch and return `undefined` for `actNotFound` errors.
   */


  getAccountInfoIfExists(request) {
    var _this3 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        return yield _this3.getAccountInfo(request);
      } catch (err) {
        const errorResponse = (0,src_app_services_xrpl_utils__WEBPACK_IMPORTED_MODULE_1__.checkRippledErrorResponse)(err);

        if (errorResponse !== undefined) {
          // Docs: https://xrpl.org/account_info.html#possible-errors
          if (errorResponse.error === 'actNotFound') {
            return undefined;
          } else {
            console.log('XrplService.getAccountInfoIfExists: unrecognised ErrorResponse:', {
              errorResponse
            });
          }
        }

        throw err;
      }
    })();
  }
  /**
   * Retrieve information about an account's trust lines.
   *
   * This call defaults to:
   *
   * - `ledger_index: 'validated'`
   *
   * @see https://xrpl.org/account_lines.html
   */


  getAccountLines(request) {
    var _this4 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this4.withConnection( /*#__PURE__*/function () {
        var _ref3 = (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (client) {
          return yield client.request(Object.assign(Object.assign({
            ledger_index: 'validated'
          }, request), {
            command: 'account_lines'
          }));
        });

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }());
    })();
  }
  /**
   * Wrap {@link xrpl.Client.getBalances}.
   *
   * @see https://js.xrpl.org/classes/Client.html#getBalances
   */


  getBalances(address) {
    var _this5 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this5.withConnection( /*#__PURE__*/function () {
        var _ref4 = (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (client) {
          return yield client.getBalances(address);
        });

        return function (_x4) {
          return _ref4.apply(this, arguments);
        };
      }());
    })();
  }

  createUnsignedTransaction(fromAddress, toAddress, amount) {
    var _this6 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const unpreparedTx = {
        Account: fromAddress,
        TransactionType: 'Payment',
        Amount: amount,
        Destination: toAddress
      };
      return yield _this6.withConnection( /*#__PURE__*/function () {
        var _ref5 = (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (client) {
          return yield client.autofill(unpreparedTx);
        });

        return function (_x5) {
          return _ref5.apply(this, arguments);
        };
      }());
    })();
  }

  createUnsignedTrustSetTx(fromAddress, limitAmount) {
    var _this7 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const unpreparedTx = {
        Account: fromAddress,
        TransactionType: 'TrustSet',
        LimitAmount: limitAmount
      };
      return yield _this7.withConnection( /*#__PURE__*/function () {
        var _ref6 = (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (client) {
          return yield client.autofill(unpreparedTx);
        });

        return function (_x6) {
          return _ref6.apply(this, arguments);
        };
      }());
    })();
  }
  /**
   * Submit and wait for a signed transaction.
   *
   * @see https://js.xrpl.org/classes/Client.html#submitAndWait
   * @see https://xrpl.org/reliable-transaction-submission.html
   */


  submitAndWaitForSigned(signedTxEncoded) {
    var _this8 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this8.withConnection( /*#__PURE__*/function () {
        var _ref7 = (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (client) {
          return yield client.submitAndWait(signedTxEncoded);
        });

        return function (_x7) {
          return _ref7.apply(this, arguments);
        };
      }());
    })();
  } // For Reference: https://github.com/XRPLF/xrpl.js/blob/6e4868e6c7a03f0d48de1ddee5d9a88700ab5a7c/src/transaction/sign.ts#L54

  /*
  async submitTransaction(
    tx: TransactionJSON,
    signature: string
  ): Promise<FormattedSubmitResponse> {
    const signedTx: TransactionJSON = { ...tx, TxnSignature: signature };
       const encodedTx = binaryCodec.encode(signedTx);
       await this.xrplClient.connect();
    const res = await this.xrplClient.submit(encodedTx);
    await this.xrplClient.disconnect();
       if (res.resultCode !==  'tesSUCCESS') {
      throw new Error('');
    } else {
      console.log(res);
      return res;
    }
  }
  */

  /**
   * Run `f` with a connected {@link xrpl.Client}.
   *
   * In particular, this runs each request with a separate client instance,
   * to avoid state conflicts.
   */


  withConnection(f) {
    var _this9 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const xrplClient = _this9.getClient();

      try {
        yield xrplClient.connect();
        return yield f(xrplClient);
      } finally {
        yield xrplClient.disconnect();
      }
    })();
  }

  getClient() {
    return getXrplClientFromEnvironment();
  }

}

XrplService.ɵfac = function XrplService_Factory(t) {
  return new (t || XrplService)();
};

XrplService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: XrplService,
  factory: XrplService.ɵfac,
  providedIn: 'root'
});

const getXrplClientFromEnvironment = () => {
  const {
    server,
    options
  } = (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_2__.defined)(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.xrplClient, 'environment.xrplClient not configured');
  return new xrpl__WEBPACK_IMPORTED_MODULE_4__.Client(server, options);
};

/***/ }),

/***/ 68170:
/*!****************************************!*\
  !*** ./src/app/services/xrpl.utils.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "txnBeforeSign": () => (/* binding */ txnBeforeSign),
/* harmony export */   "txnAfterSign": () => (/* binding */ txnAfterSign),
/* harmony export */   "hexToUint8Array": () => (/* binding */ hexToUint8Array),
/* harmony export */   "uint8ArrayToHex": () => (/* binding */ uint8ArrayToHex),
/* harmony export */   "checkTxResponseSucceeded": () => (/* binding */ checkTxResponseSucceeded),
/* harmony export */   "checkTransactionMetadataSucceeded": () => (/* binding */ checkTransactionMetadataSucceeded),
/* harmony export */   "getTxResponseMetadata": () => (/* binding */ getTxResponseMetadata),
/* harmony export */   "checkRippledErrorResponse": () => (/* binding */ checkRippledErrorResponse)
/* harmony export */ });
/* harmony import */ var ripple_keypairs_dist_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ripple-keypairs/dist/utils */ 57932);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var xrpl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xrpl */ 77962);
/* harmony import */ var xrpl__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(xrpl__WEBPACK_IMPORTED_MODULE_2__);
/* eslint-disable max-len -- long URL in comment */
/**
 * Supporting code for XRPL.
 *
 * In particular, this provides a stand-alone implementation of the transaction
 * signing logic that's otherwise tied up in the XRPL.js wallet code.
 *
 * @todo We should look at migrating this logic entirely into the enclave?
 *
 * @see https://github.com/XRPLF/xrpl-dev-portal/blob/master/content/concepts/payment-system-basics/transaction-basics/understanding-signatures-draft.md
 * @see https://xrpl.org/serialization.html
 * @see https://github.com/XRPLF/xrpl.js/blob/xrpl%402.2.1/packages/xrpl/src/Wallet/index.ts#L257-L305
 */



/**
 * Prepare to sign `txnUnsigned` with `signingPubKey`.
 *
 * This returns:
 *
 * - `txnBeingSigned`: `txnUnsigned` with `SigningPubKey` added
 *
 * - `bytesToSignEncoded`: As encoded by {@link xrpl.encodeForSigning},
 *   ready for signature calculation
 */
const txnBeforeSign = (txnUnsigned, signingPubKey) => {
    const txnBeingSigned = Object.assign(Object.assign({}, txnUnsigned), { SigningPubKey: signingPubKey });
    return {
        txnBeingSigned,
        bytesToSignEncoded: xrpl__WEBPACK_IMPORTED_MODULE_2__.encodeForSigning(txnBeingSigned),
    };
};
/**
 * Combine `txnBeingSigned` with its `txnSignature`
 *
 * This returns:
 *
 * - `txnSigned`: `txnBeingSigned` with `TxnSignature` added
 * - `txnSignedEncoded`: As encoded by {@link xrpl.encode},
 *   ready for submission
 */
const txnAfterSign = (txnBeingSigned, txnSignature) => {
    const txnSigned = Object.assign(Object.assign({}, txnBeingSigned), { TxnSignature: txnSignature });
    return { txnSigned, txnSignedEncoded: xrpl__WEBPACK_IMPORTED_MODULE_2__.encode(txnSigned) };
};
/**
 * Like {@link hexToBytes}, but produce {@link Uint8Array}.
 */
const hexToUint8Array = (hex) => Uint8Array.from((0,ripple_keypairs_dist_utils__WEBPACK_IMPORTED_MODULE_0__.hexToBytes)(hex));
/**
 * Like {@link bytesToHex}, but consume {@link Uint8Array}.
 *
 * This mainly exists to work around this bug:
 * - <https://github.com/XRPLF/xrpl.js/pull/1975>
 */
const uint8ArrayToHex = (array) => (0,ripple_keypairs_dist_utils__WEBPACK_IMPORTED_MODULE_0__.bytesToHex)(Array.from(array));
/** Check whether a transaction succeeded, by response. */
const checkTxResponseSucceeded = (txResponse) => checkTransactionMetadataSucceeded(getTxResponseMetadata(txResponse));
/** Check whether a transaction succeeded, by metadata. */
const checkTransactionMetadataSucceeded = (meta) => ({
    succeeded: meta.TransactionResult === 'tesSUCCESS',
    resultCode: meta.TransactionResult,
});
/** Get transaction metadata from response, or panic. */
const getTxResponseMetadata = (txResponse) => {
    const meta = txResponse.result.meta;
    if (typeof meta === 'string') {
        throw (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_1__.panic)('getTxResponseMetadata: unexpected string meta:', {
            txResponse,
        });
    }
    else if (meta === undefined) {
        throw (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_1__.panic)('getTxResponseMetadata: unexpected undefined meta:', {
            txResponse,
        });
    }
    else {
        return meta;
    }
};
/**
 * Check for `RippledError`, and extract its error response.
 *
 * This verifies that {@link xrpl.ErrorResponse.status} is `"error"`, at least.
 */
const checkRippledErrorResponse = (err) => {
    if (err instanceof xrpl__WEBPACK_IMPORTED_MODULE_2__.RippledError) {
        const maybeResponse = err.data;
        if (typeof maybeResponse === 'object' &&
            'status' in maybeResponse &&
            maybeResponse.status === 'error') {
            return maybeResponse;
        }
    }
};


/***/ }),

/***/ 17956:
/*!***************************************************!*\
  !*** ./src/app/state/session-algorand.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionAlgorandService": () => (/* binding */ SessionAlgorandService)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var src_app_services_algosdk_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/algosdk.utils */ 64776);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _session_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./session.store */ 90714);
/* harmony import */ var _session_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./session.query */ 55545);
/* harmony import */ var src_app_state_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/state/session.service */ 5069);
/* harmony import */ var src_app_services_enclave_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/enclave/index */ 26070);
/* harmony import */ var src_app_services_algod_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/algod.service */ 4493);









/**
 * This service manages session state and operations related to the Algorand ledger.
 */

class SessionAlgorandService {
  constructor(sessionStore, sessionQuery, sessionService, enclaveService, algodService) {
    this.sessionStore = sessionStore;
    this.sessionQuery = sessionQuery;
    this.sessionService = sessionService;
    this.enclaveService = enclaveService;
    this.algodService = algodService;
  }
  /**
   * Load the current wallet's Algorand account status from {@link AlgodService}.
   *
   * This updates {@link SessionState#algorandAccountData}.
   */


  loadAccountData() {
    var _this = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        wallet
      } = _this.sessionQuery.assumeActiveSession();

      const algorandAccountData = yield _this.algodService.getAccountData(wallet.algorand_address_base32);

      _this.sessionStore.update({
        algorandAccountData
      });
    })();
  }
  /**
   * Load the current wallet's asset holdings' parameters.
   *
   * This updates {@link SessionState.algorandAssetParams}.
   */


  loadAssetParams() {
    var _this2 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const assetHoldings = _this2.sessionQuery.getAlgorandAssetHoldings();

      if (assetHoldings) {
        const assets = yield Promise.all(assetHoldings.map(assetHolding => _this2.algodService.getAsset(assetHolding['asset-id'])));
        const algorandAssetParams = Object.fromEntries(assets.map(({
          index,
          params
        }) => [index, params]));

        _this2.sessionStore.update({
          algorandAssetParams
        });
      }
    })();
  }
  /**
   * Send Algos to another account.
   */


  sendAlgos(receiverId, amountInAlgos) {
    var _this3 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        wallet
      } = _this3.sessionQuery.assumeActiveSession();

      const amountInMicroAlgos = (0,src_app_services_algosdk_utils__WEBPACK_IMPORTED_MODULE_1__.convertToMicroAlgos)(amountInAlgos);
      const transaction = yield _this3.algodService.createUnsignedTransaction({
        amount: amountInMicroAlgos,
        from: wallet.algorand_address_base32,
        to: receiverId
      });
      return yield _this3.sendTransaction(transaction);
    })();
  }

  sendAssetOptIn(assetId) {
    var _this4 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        wallet
      } = _this4.sessionQuery.assumeActiveSession();

      const transaction = yield _this4.algodService.createUnsignedAssetOptInTxn(wallet.algorand_address_base32, assetId);
      return yield _this4.sendTransaction(transaction);
    })();
  }

  sendAssetFunds(assetId, receiverId, amount) {
    var _this5 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        wallet
      } = _this5.sessionQuery.assumeActiveSession();

      const transaction = yield _this5.algodService.createUnsignedAssetTransferTxn({
        from: wallet.algorand_address_base32,
        to: receiverId,
        amount,
        assetIndex: assetId
      });
      return yield _this5.sendTransaction(transaction);
    })();
  }
  /**
   * Helper: Sign, submit, and confirm the given transaction.
   */


  sendTransaction(transaction) {
    var _this6 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const unsigned = {
        AlgorandTransaction: {
          transaction_bytes: transaction.bytesToSign()
        }
      };
      const signed = yield _this6.sessionService.signTransaction(unsigned);

      if ('AlgorandTransactionSigned' in signed) {
        console.log('SessionAlgorandService.sendTransaction:', {
          signed
        });
        const {
          signed_transaction_bytes
        } = signed.AlgorandTransactionSigned;
        const confirmation = yield _this6.algodService.submitAndConfirmTransaction(signed_transaction_bytes);
        console.log('SessionAlgorandService.sendTransaction:', {
          confirmation
        });
        yield _this6.loadAccountData(); // FIXME(Pi): Move to caller?

        return confirmation;
      } else {
        throw (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_2__.panic)('SessionAlgorandService.sendTransaction: expected AlgorandTransactionSigned, got:', signed);
      }
    })();
  }

}

SessionAlgorandService.ɵfac = function SessionAlgorandService_Factory(t) {
  return new (t || SessionAlgorandService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_session_store__WEBPACK_IMPORTED_MODULE_3__.SessionStore), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_session_query__WEBPACK_IMPORTED_MODULE_4__.SessionQuery), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](src_app_state_session_service__WEBPACK_IMPORTED_MODULE_5__.SessionService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](src_app_services_enclave_index__WEBPACK_IMPORTED_MODULE_6__.EnclaveService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](src_app_services_algod_service__WEBPACK_IMPORTED_MODULE_7__.AlgodService));
};

SessionAlgorandService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: SessionAlgorandService,
  factory: SessionAlgorandService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 36187:
/*!***********************************************!*\
  !*** ./src/app/state/session-xrpl.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionXrplService": () => (/* binding */ SessionXrplService)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 29282);
/* harmony import */ var src_app_services_xrpl_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/xrpl.utils */ 68170);
/* harmony import */ var src_app_utils_console_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/utils/console.helpers */ 6350);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var src_app_utils_validators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/utils/validators */ 90895);
/* harmony import */ var src_helpers_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/helpers/helpers */ 42289);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _session_store__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./session.store */ 90714);
/* harmony import */ var _session_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./session.query */ 55545);
/* harmony import */ var src_app_state_session_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/state/session.service */ 5069);
/* harmony import */ var src_app_services_enclave_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/services/enclave/index */ 26070);
/* harmony import */ var src_app_services_xrpl_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/xrpl.service */ 31239);













/**
 * This service manages session state and operations related to the XRP ledger.
 */

class SessionXrplService {
  constructor(sessionStore, sessionQuery, sessionService, enclaveService, xrplService) {
    this.sessionStore = sessionStore;
    this.sessionQuery = sessionQuery;
    this.sessionService = sessionService;
    this.enclaveService = enclaveService;
    this.xrplService = xrplService;
  }
  /**
   * Load the current wallet's XRPL account info from {@link XrplService}.
   *
   * This updates:
   *
   * - {@link import('./session.store').SessionState#xrplAccountRoot}.
   * - {@link import('./session.store').SessionState#xrplBalances}.
   */


  loadAccountData() {
    var _this = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        wallet
      } = _this.sessionQuery.assumeActiveSession();

      const xrplAddress = wallet.xrpl_account.address_base58; // TODO: Fetch the following in parallel, sharing a connection context.
      // Get AccountRoot entry:

      const accountInfo = yield _this.xrplService.getAccountInfoIfExists({
        account: xrplAddress
      });

      if (accountInfo === undefined) {
        console.log('SessionXrplService.loadAccountData: account not found, bailing out', {
          xrplAddress
        });
        return;
      }

      const xrplAccountRoot = accountInfo.result.account_data; // Get account's trust lines:

      const accountLines = yield _this.xrplService.getAccountLines({
        account: xrplAddress
      });
      const xrplTrustlines = accountLines.result.lines; // Get balances:

      const xrplBalances = yield _this.xrplService.getBalances(xrplAddress);

      _this.sessionStore.update({
        xrplAccountRoot,
        xrplTrustlines,
        xrplBalances
      });
    })();
  }

  sendFunds(receiverId, amount) {
    var _this2 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        wallet
      } = _this2.sessionQuery.assumeActiveSession();

      const preparedTx = yield (0,src_app_utils_console_helpers__WEBPACK_IMPORTED_MODULE_2__.withLoggedExchange)('SessionXrplService.sendFunds: XrplService.createUnsignedTransaction:', /*#__PURE__*/(0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        return yield _this2.xrplService.createUnsignedTransaction(wallet.xrpl_account.address_base58, receiverId, amount);
      }), {
        from: wallet.xrpl_account.address_base58,
        to: receiverId,
        amount
      });
      return yield _this2.sendTransaction(preparedTx);
    })();
  }
  /**
   * Sign and send a `TrustSet` transaction from the active session's wallet.
   *
   * @see https://xrpl.org/trustset.html
   * @see XrplService.createUnsignedTrustSetTx
   */


  sendTrustSetTx(limitAmount) {
    var _this3 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        wallet
      } = _this3.sessionQuery.assumeActiveSession();

      const preparedTx = yield (0,src_app_utils_console_helpers__WEBPACK_IMPORTED_MODULE_2__.withLoggedExchange)('SessionXrplService.sendTrustSetTx: XrplService.createUnsignedTrustSetTx:', /*#__PURE__*/(0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        return yield _this3.xrplService.createUnsignedTrustSetTx(wallet.xrpl_account.address_base58, limitAmount);
      }), {
        from: wallet.xrpl_account.address_base58,
        limitAmount
      });
      return yield _this3.sendTransaction(preparedTx);
    })();
  }
  /**
   * Check trustline opt-in for each of this account's trust lines.
   *
   * @return The responses to `TrustSet` transactions sent out (empty if none sent)
   * @see checkTrustlineOptIn
   */


  checkTrustlineOptIns() {
    var _this4 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // TODO(Pi): Check for necessary owner reserves before sending.
      //           See: https://xrpl.org/reserves.html
      var _a;

      const trustLines = (_a = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.firstValueFrom)(_this4.sessionQuery.xrplTrustlines)) !== null && _a !== void 0 ? _a : [];
      const txResponses = [];

      for (const trustLine of trustLines) {
        (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_5__.ifDefined)(yield _this4.checkTrustlineOptIn(trustLine), txResponse => txResponses.push(txResponse));
      }

      return txResponses;
    })();
  }
  /**
   * Helper: Check trustline opt-in for the given trust-line.
   *
   * This sends a `TrustSet` transaction matching the peer's limit
   * if the active session's wallet's limit is zero.
   *
   * @return the `TrustSet` response, or undefined
   */


  checkTrustlineOptIn(trustline) {
    var _this5 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const limit_peer = (0,src_app_utils_validators__WEBPACK_IMPORTED_MODULE_4__.parseNumber)(trustline.limit_peer);

      if (limit_peer === undefined) {
        throw (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_3__.panic)('SessionXrplService.checkTrustlineOptIn: bad limit_peer:', trustline);
      }

      if (trustline.limit === '0' && 0 < limit_peer) {
        const limitAmount = {
          currency: trustline.currency,
          issuer: trustline.account,
          value: trustline.limit_peer // XXX: For now, just match the peer's limit.

        };
        return yield (0,src_app_utils_console_helpers__WEBPACK_IMPORTED_MODULE_2__.withLoggedExchange)('SessionXrplService.checkTrustlineOptIn: sending TrustSet', /*#__PURE__*/(0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return yield _this5.sendTrustSetTx(limitAmount);
        }), limitAmount);
      }
    })();
  }
  /**
   * Helper: Sign, submit, and confirm the given transaction.
   *
   * NOTE: This does not check for success: the caller is responsible for that.
   */


  sendTransaction(txnUnsigned) {
    var _this6 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const {
        wallet
      } = _this6.sessionQuery.assumeActiveSession();

      const {
        txnBeingSigned,
        bytesToSignEncoded
      } = (0,src_app_services_xrpl_utils__WEBPACK_IMPORTED_MODULE_1__.txnBeforeSign)(txnUnsigned, wallet.xrpl_account.public_key_hex);
      const transactionToSign = {
        XrplTransaction: {
          transaction_bytes: (0,src_app_services_xrpl_utils__WEBPACK_IMPORTED_MODULE_1__.hexToUint8Array)(bytesToSignEncoded)
        }
      };
      const signed = yield _this6.sessionService.signTransaction(transactionToSign);

      if ('XrplTransactionSigned' in signed) {
        const {
          signature_bytes
        } = signed.XrplTransactionSigned;
        const {
          txnSigned,
          txnSignedEncoded
        } = (0,src_app_services_xrpl_utils__WEBPACK_IMPORTED_MODULE_1__.txnAfterSign)(txnBeingSigned, (0,src_app_services_xrpl_utils__WEBPACK_IMPORTED_MODULE_1__.uint8ArrayToHex)(signature_bytes));
        const txResponse = yield (0,src_app_utils_console_helpers__WEBPACK_IMPORTED_MODULE_2__.withLoggedExchange)('SessionXrplService.sendTransaction: signed, submitting:', /*#__PURE__*/(0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          return yield _this6.xrplService.submitAndWaitForSigned(txnSignedEncoded);
        }), txnSignedEncoded);
        yield _this6.loadAccountData(); // FIXME(Pi): Move to caller?

        return txResponse;
      } else {
        throw (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_3__.panic)('SessionXrplService.sendTransaction: expected XrplTransactionSigned, got:', signed);
      }
    })();
  }

}

SessionXrplService.ɵfac = function SessionXrplService_Factory(t) {
  return new (t || SessionXrplService)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_session_store__WEBPACK_IMPORTED_MODULE_6__.SessionStore), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](_session_query__WEBPACK_IMPORTED_MODULE_7__.SessionQuery), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](src_app_state_session_service__WEBPACK_IMPORTED_MODULE_8__.SessionService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](src_app_services_enclave_index__WEBPACK_IMPORTED_MODULE_9__.EnclaveService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵinject"](src_app_services_xrpl_service__WEBPACK_IMPORTED_MODULE_10__.XrplService));
};

SessionXrplService.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineInjectable"]({
  token: SessionXrplService,
  factory: SessionXrplService.ɵfac,
  providedIn: 'root'
});

/***/ }),

/***/ 95844:
/*!***********************************************!*\
  !*** ./src/app/utils/assets/assets.common.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatAssetSymbol": () => (/* binding */ formatAssetSymbol),
/* harmony export */   "formatAssetAmount": () => (/* binding */ formatAssetAmount),
/* harmony export */   "assetAmountFromBase": () => (/* binding */ assetAmountFromBase)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ 38143);
/**
 * Common representation types and code for working with asset amounts.
 */

/** Format the asset symbol of an amount. */
const formatAssetSymbol = (assetAmount) => assetAmount.assetDisplay.assetSymbol;
/** Default locale, matching Angular's {@link formatNumber}. */
const LOCALE = 'en-US';
/** Format an asset amount with the right number of fractional digits. .*/
const formatAssetAmount = ({ amount, assetDisplay: { maxDigits, minDigits }, }) => (0,_angular_common__WEBPACK_IMPORTED_MODULE_0__.formatNumber)(amount, LOCALE, `1.${minDigits}-${maxDigits}`);
/** Construct a new asset amount with the same metadata as a base value. */
const assetAmountFromBase = (amount, { assetDisplay, ledgerInfo }) => ({
    amount,
    assetDisplay,
    ledgerInfo,
});


/***/ }),

/***/ 50271:
/*!******************************************!*\
  !*** ./src/app/utils/loading.helpers.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "withLoadingOverlay": () => (/* binding */ withLoadingOverlay),
/* harmony export */   "withLoadingOverlayOpts": () => (/* binding */ withLoadingOverlayOpts)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);

// Show the default loading overlay around `f()`.
const withLoadingOverlay = /*#__PURE__*/function () {
  var _ref = (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (loadingController, f) {
    return yield withLoadingOverlayOpts(loadingController, {}, f);
  });

  return function withLoadingOverlay(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); // Show a loading overlay with `options` around `f()`.

const withLoadingOverlayOpts = /*#__PURE__*/function () {
  var _ref2 = (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (loadingController, options, f) {
    const loading = yield loadingController.create(options);
    yield loading.present();

    try {
      return yield f();
    } finally {
      yield loading.dismiss();
    }
  });

  return function withLoadingOverlayOpts(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

/***/ }),

/***/ 95245:
/*!****************************************!*\
  !*** ./src/schema/algorand.helpers.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makePaymentTxnHelper": () => (/* binding */ makePaymentTxnHelper),
/* harmony export */   "makeAssetTransferTxnHelper": () => (/* binding */ makeAssetTransferTxnHelper)
/* harmony export */ });
/* harmony import */ var algosdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! algosdk */ 7830);
/* harmony import */ var algosdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(algosdk__WEBPACK_IMPORTED_MODULE_0__);

/** Wrap `makePaymentTxnWithSuggestedParamsFromObject` with more convenient argument handling. */
const makePaymentTxnHelper = (suggested, required, optional) => {
    var _a;
    const unmodified = (o) => o;
    const suggestedParams = ((_a = optional === null || optional === void 0 ? void 0 : optional.modifySuggested) !== null && _a !== void 0 ? _a : unmodified)(suggested);
    return algosdk__WEBPACK_IMPORTED_MODULE_0___default().makePaymentTxnWithSuggestedParamsFromObject(Object.assign(Object.assign({ suggestedParams }, optional === null || optional === void 0 ? void 0 : optional.options), required));
};
const makeAssetTransferTxnHelper = (suggested, required, optional) => {
    var _a;
    const unmodified = (o) => o;
    const suggestedParams = ((_a = optional === null || optional === void 0 ? void 0 : optional.modifySuggested) !== null && _a !== void 0 ? _a : unmodified)(suggested);
    return algosdk__WEBPACK_IMPORTED_MODULE_0___default().makeAssetTransferTxnWithSuggestedParamsFromObject(Object.assign(Object.assign({ suggestedParams }, optional === null || optional === void 0 ? void 0 : optional.options), required));
};


/***/ })

}]);
//# sourceMappingURL=default-src_app_pipes_asset-pipes_module_ts-src_app_state_session-algorand_service_ts-src_app-52835a.js.map