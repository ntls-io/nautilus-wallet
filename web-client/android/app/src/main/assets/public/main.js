(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["main"],{

/***/ 90158:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routes": () => (/* binding */ routes),
/* harmony export */   "AppRoutingModule": () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _open_wallet_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./open-wallet.guard */ 49630);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);




// XXX(Pi, 2021-07-05): prettier ignore to work around compodoc bug: https://github.com/compodoc/compodoc/issues/954#issuecomment-708987583
// XXX(Pi, 2021-10-07): Is this workaround still needed?
const routes = [
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
    },
    {
        path: 'wallet',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_modules_shared_shared_module_ts"), __webpack_require__.e("default-src_app_state_session_service_ts"), __webpack_require__.e("default-node_modules_fortawesome_free-solid-svg-icons_index_es_js"), __webpack_require__.e("default-src_app_pipes_asset-pipes_module_ts-src_app_state_session-algorand_service_ts-src_app-52835a"), __webpack_require__.e("common"), __webpack_require__.e("src_app_views_wallet_wallet_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./views/wallet/wallet.module */ 2965)).then(m => m.WalletPageModule // prettier-ignore
        ),
        canActivate: [_open_wallet_guard__WEBPACK_IMPORTED_MODULE_0__.OpenWalletGuard],
    },
    {
        path: 'register',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_modules_shared_shared_module_ts"), __webpack_require__.e("default-src_app_state_session_service_ts"), __webpack_require__.e("src_app_views_register_register_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./views/register/register.module */ 73779)).then(m => m.RegisterPageModule // prettier-ignore
        ),
    },
    {
        path: 'home',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_modules_shared_shared_module_ts"), __webpack_require__.e("default-node_modules_fortawesome_free-solid-svg-icons_index_es_js"), __webpack_require__.e("src_app_views_home_home_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./views/home/home.module */ 30842)).then(m => m.HomePageModule // prettier-ignore
        ),
    },
    {
        path: 'landing',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_views_landing_landing_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./views/landing/landing.module */ 42494)).then(m => m.LandingPageModule // prettier-ignore
        ),
    },
    {
        path: 'print-wallet',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_modules_shared_shared_module_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_views_print-wallet_print-wallet_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./views/print-wallet/print-wallet.module */ 4212)).then((m) => m.PrintWalletPageModule // prettier-ignore
        ),
    },
    {
        path: 'scanner',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_views_scanner_scanner_page_ts"), __webpack_require__.e("src_app_views_scanner_scanner_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./views/scanner/scanner.module */ 10485)).then(m => m.ScannerPageModule // prettier-ignore
        ),
    },
    {
        path: 'wallet-access',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_modules_shared_shared_module_ts"), __webpack_require__.e("default-src_app_state_session_service_ts"), __webpack_require__.e("default-src_app_views_scanner_scanner_page_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_views_wallet-access_wallet-access_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./views/wallet-access/wallet-access.module */ 25503)).then((m) => m.WalletAccessPageModule //prettier-ignore
        ),
    },
    {
        path: 'pay',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_modules_shared_shared_module_ts"), __webpack_require__.e("default-src_app_state_session_service_ts"), __webpack_require__.e("default-src_app_views_pay_pay_module_ts"), __webpack_require__.e("default-src_app_pipes_asset-pipes_module_ts-src_app_state_session-algorand_service_ts-src_app-52835a")]).then(__webpack_require__.bind(__webpack_require__, /*! ./views/pay/pay.module */ 28636)).then((m) => m.PayPageModule),
        canActivate: [_open_wallet_guard__WEBPACK_IMPORTED_MODULE_0__.OpenWalletGuard],
    },
    {
        path: 'manual-address',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_modules_shared_shared_module_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_views_manual-address_manual-address_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./views/manual-address/manual-address.module */ 21700)).then((m) => m.ManualAddressPageModule),
    },
    {
        path: 'kyc',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_modules_shared_shared_module_ts"), __webpack_require__.e("default-src_app_state_session_service_ts"), __webpack_require__.e("src_app_views_kyc_kyc_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./views/kyc/kyc.module */ 40808)).then((m) => m.KycPageModule),
    },
];
class AppRoutingModule {
}
AppRoutingModule.ɵfac = function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); };
AppRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forRoot(routes, { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_2__.PreloadAllModules }),
        ], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 55041:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ 95472);


class AppComponent {
    constructor() { }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 2, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "ion-app");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "ion-router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonApp, _ionic_angular__WEBPACK_IMPORTED_MODULE_1__.IonRouterOutlet], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 36747:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 78336);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ 78394);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _datorama_akita_ng_router_store__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @datorama/akita-ng-router-store */ 56704);
/* harmony import */ var _datorama_akita_ngdevtools__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @datorama/akita-ngdevtools */ 36930);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 25141);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var ngx_printer__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-printer */ 8801);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../environments/environment */ 92340);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 90158);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ 55041);
/* harmony import */ var _modules_error_handler_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/error-handler.module */ 72909);
/* harmony import */ var _transloco_transloco_root_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transloco/transloco-root.module */ 29076);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51109);

















class AppModule {
}
AppModule.ɵfac = function AppModule_Factory(t) { return new (t || AppModule)(); };
AppModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent] });
AppModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ providers: [{ provide: _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouteReuseStrategy, useClass: _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicRouteStrategy }], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.BrowserModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule.forRoot(),
            _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule,
            _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule,
            _transloco_transloco_root_module__WEBPACK_IMPORTED_MODULE_4__.TranslocoRootModule,
            _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeModule,
            _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production ? [] : _datorama_akita_ngdevtools__WEBPACK_IMPORTED_MODULE_11__.AkitaNgDevtools.forRoot(),
            _datorama_akita_ng_router_store__WEBPACK_IMPORTED_MODULE_12__.AkitaNgRouterStoreModule,
            ngx_printer__WEBPACK_IMPORTED_MODULE_13__.NgxPrinterModule.forRoot({ printOpenWindow: false }),
            _modules_error_handler_module__WEBPACK_IMPORTED_MODULE_3__.ErrorHandlerModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__.BrowserModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule,
        _angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClientModule,
        _transloco_transloco_root_module__WEBPACK_IMPORTED_MODULE_4__.TranslocoRootModule,
        _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_10__.FontAwesomeModule, _datorama_akita_ngdevtools__WEBPACK_IMPORTED_MODULE_11__.AkitaNgDevtools, _datorama_akita_ng_router_store__WEBPACK_IMPORTED_MODULE_12__.AkitaNgRouterStoreModule, ngx_printer__WEBPACK_IMPORTED_MODULE_13__.NgxPrinterModule, _modules_error_handler_module__WEBPACK_IMPORTED_MODULE_3__.ErrorHandlerModule] }); })();


/***/ }),

/***/ 72909:
/*!*************************************************!*\
  !*** ./src/app/modules/error-handler.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ErrorHandlerModule": () => (/* binding */ ErrorHandlerModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _sentry_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @sentry/angular */ 32450);
/* harmony import */ var _sentry_capacitor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sentry/capacitor */ 7510);
/* harmony import */ var _sentry_integrations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @sentry/integrations */ 68018);
/* harmony import */ var _sentry_tracing__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @sentry/tracing */ 7147);
/* harmony import */ var _utils_errors_global_error_handler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/errors/global-error-handler */ 54602);








_sentry_capacitor__WEBPACK_IMPORTED_MODULE_0__.init({
    dsn: 'https://67b1d83771ef47bfb176012e478f8a6f@o1082240.ingest.sentry.io/6090433',
    integrations: [new _sentry_integrations__WEBPACK_IMPORTED_MODULE_3__.Dedupe(), new _sentry_tracing__WEBPACK_IMPORTED_MODULE_1__.BrowserTracing()],
}, _sentry_angular__WEBPACK_IMPORTED_MODULE_4__.init);
class ErrorHandlerModule {
}
ErrorHandlerModule.ɵfac = function ErrorHandlerModule_Factory(t) { return new (t || ErrorHandlerModule)(); };
ErrorHandlerModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: ErrorHandlerModule });
ErrorHandlerModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ providers: [
        {
            provide: _angular_core__WEBPACK_IMPORTED_MODULE_5__.ErrorHandler,
            useClass: _utils_errors_global_error_handler__WEBPACK_IMPORTED_MODULE_2__.GlobalErrorHandler,
        },
    ], imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](ErrorHandlerModule, { imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule] }); })();


/***/ }),

/***/ 49630:
/*!**************************************!*\
  !*** ./src/app/open-wallet.guard.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OpenWalletGuard": () => (/* binding */ OpenWalletGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var src_app_state_session_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/state/session.query */ 55545);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 65485);



class OpenWalletGuard {
    constructor(sessionQuery, router) {
        this.sessionQuery = sessionQuery;
        this.router = router;
    }
    canActivate() {
        if (this.sessionQuery.isActiveSession()) {
            return true;
        }
        else {
            return this.router.parseUrl('/landing');
        }
    }
}
OpenWalletGuard.ɵfac = function OpenWalletGuard_Factory(t) { return new (t || OpenWalletGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](src_app_state_session_query__WEBPACK_IMPORTED_MODULE_0__.SessionQuery), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router)); };
OpenWalletGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: OpenWalletGuard, factory: OpenWalletGuard.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 64776:
/*!*******************************************!*\
  !*** ./src/app/services/algosdk.utils.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "waitForConfirmation": () => (/* binding */ waitForConfirmation),
/* harmony export */   "extractAlgorandAssetBalance": () => (/* binding */ extractAlgorandAssetBalance),
/* harmony export */   "noBigintSupport": () => (/* binding */ noBigintSupport),
/* harmony export */   "convertToAlgos": () => (/* binding */ convertToAlgos),
/* harmony export */   "convertToMicroAlgos": () => (/* binding */ convertToMicroAlgos)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var algosdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! algosdk */ 7830);
/* harmony import */ var algosdk__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(algosdk__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);


/**
 * Supporting code from the algosdk examples / utils.
 */


/**
 * Wait for a transaction to be confirmed.
 *
 * This is a cleaned-up version of:
 * https://github.com/algorand/js-algorand-sdk/blob/v1.11.1/examples/utils.js#L67
 */

const waitForConfirmation = /*#__PURE__*/function () {
  var _ref = (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (algodClient, txId, timeoutRounds) {
    const lastRound = yield getLastRound(algodClient);
    const startRound = lastRound + 1;
    const endRound = startRound + timeoutRounds;

    for (let nextRound = startRound; nextRound < endRound; nextRound++) {
      // TODO: This throws a 404 error for txId not found: handle / report that better.
      const pendingInfo = yield getPendingInfo(algodClient, txId);
      const {
        poolError,
        txn,
        confirmedRound
      } = pendingInfo;

      if (confirmedRound && 0 < confirmedRound) {
        // Transaction confirmed!
        return {
          confirmedRound,
          txn,
          txId
        };
      } else if (poolError !== '') {
        // TODO: Report rejections better.
        throw new Error(`Transaction ${txId} rejected - pool error: ${poolError}`);
      }

      yield algodClient.statusAfterBlock(nextRound).do();
    } // TODO: Handle timeouts better.


    throw new Error(`Transaction ${txId} not confirmed after ${timeoutRounds} rounds`);
  });

  return function waitForConfirmation(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
/** Helper: Get the node's last (most current) round. */

const getLastRound = /*#__PURE__*/function () {
  var _ref2 = (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (algodClient) {
    // Docs: https://developer.algorand.org/docs/reference/rest-apis/algod/v2/#get-v2status
    // See also: algosdk NodeStatusResponse
    const nodeStatus = yield algodClient.status().do();
    return checkNumber(nodeStatus['last-round']);
  });

  return function getLastRound(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

const getPendingInfo = /*#__PURE__*/function () {
  var _ref3 = (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (algodClient, txId) {
    // Docs: https://developer.algorand.org/docs/reference/rest-apis/algod/v2/#get-v2transactionspendingtxid
    // See also: algosdk PendingTransactionResponse
    const pendingInfo = yield algodClient.pendingTransactionInformation(txId).do();
    const poolError = checkString(pendingInfo['pool-error']);
    const txn = pendingInfo.txn;
    const confirmedRound = 'confirmed-round' in pendingInfo ? checkNumber(pendingInfo['confirmed-round']) : undefined;
    return {
      poolError,
      txn,
      confirmedRound
    };
  });

  return function getPendingInfo(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

const checkNumber = value => {
  if (typeof value === 'number') {
    return value;
  } else {
    const message = `waitForConfirmation: expected number, got ${typeof value}`;
    console.error(message, value);
    throw new TypeError(`${message}: ${value}`);
  }
};

const checkString = value => {
  if (typeof value === 'string') {
    return value;
  } else {
    const message = `waitForConfirmation: expected string, got ${typeof value}`;
    console.error(message, value);
    throw new TypeError(`${message}: ${value}`);
  }
}; // Extract a single asset balance from an `AccountData` result.


const extractAlgorandAssetBalance = (algorandAccount, assetId) => {
  for (const asset of (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_2__.defined)(algorandAccount === null || algorandAccount === void 0 ? void 0 : algorandAccount.assets)) {
    if (asset['asset-id'] === assetId) {
      return noBigintSupport(asset.amount);
    }
  }

  return null;
}; // Panic if value is `bigint`, for now.

const noBigintSupport = value => {
  if (typeof value === 'bigint') {
    throw (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_2__.panic)('bigint support not implemented yet', value);
  }

  return value;
};
/**
 * Convert MicroAlgos to Algos.
 *
 * (Type alias for {@link microalgosToAlgos}.)
 */

const convertToAlgos = microAlgos => (0,algosdk__WEBPACK_IMPORTED_MODULE_1__.microalgosToAlgos)(microAlgos);
/**
 * Convert Algos to MicroAlgos.
 *
 * (Type alias for {@link algosToMicroalgos}.)
 */

const convertToMicroAlgos = algos => (0,algosdk__WEBPACK_IMPORTED_MODULE_1__.algosToMicroalgos)(algos);

/***/ }),

/***/ 55545:
/*!****************************************!*\
  !*** ./src/app/state/session.query.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionQuery": () => (/* binding */ SessionQuery)
/* harmony export */ });
/* harmony import */ var _datorama_akita__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @datorama/akita */ 17898);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 53886);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 64736);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 35878);
/* harmony import */ var src_app_services_algosdk_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/algosdk.utils */ 64776);
/* harmony import */ var src_app_utils_assets_assets_algo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/utils/assets/assets.algo */ 23648);
/* harmony import */ var src_app_utils_assets_assets_algo_asa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/utils/assets/assets.algo.asa */ 45883);
/* harmony import */ var src_app_utils_assets_assets_xrp__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/utils/assets/assets.xrp */ 42339);
/* harmony import */ var src_app_utils_assets_assets_xrp_token__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/utils/assets/assets.xrp.token */ 23726);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var src_app_utils_validators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/utils/validators */ 90895);
/* harmony import */ var src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/helpers/helpers */ 42289);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _session_store__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./session.store */ 90714);












/**
 * Application code should use this interface to query the session store.
 */
class SessionQuery extends _datorama_akita__WEBPACK_IMPORTED_MODULE_0__.Query {
    constructor(store) {
        super(store);
        this.store = store;
        this.wallet = this.select('wallet');
        this.pin = this.select('pin');
        this.algorandAccountData = this.select('algorandAccountData');
        this.xrplAccountRoot = this.select('xrplAccountRoot');
        this.xrplTrustlines = this.select('xrplTrustlines');
        // Wallet field queries:
        this.walletId = this.select(({ wallet }) => wallet === null || wallet === void 0 ? void 0 : wallet.wallet_id);
        this.name = this.select(({ wallet }) => wallet === null || wallet === void 0 ? void 0 : wallet.owner_name);
        this.algorandAddressBase32 = this.select(({ wallet }) => wallet === null || wallet === void 0 ? void 0 : wallet.algorand_address_base32);
        // Algorand account field queries:
        this.algorandBalanceInMicroAlgos = this.select(({ algorandAccountData }) => (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.ignoreZero)(algorandAccountData === null || algorandAccountData === void 0 ? void 0 : algorandAccountData.amount));
        this.algorandBalanceInAlgos = this.select(({ algorandAccountData }) => (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.ifDefined)((0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.ignoreZero)(algorandAccountData === null || algorandAccountData === void 0 ? void 0 : algorandAccountData.amount), src_app_services_algosdk_utils__WEBPACK_IMPORTED_MODULE_1__.convertToAlgos));
        this.algorandAlgoBalance = this.select(({ algorandAccountData }) => (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.ifDefined)((0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.ignoreZero)(algorandAccountData === null || algorandAccountData === void 0 ? void 0 : algorandAccountData.amount), (amount) => (0,src_app_utils_assets_assets_algo__WEBPACK_IMPORTED_MODULE_2__.assetAmountAlgo)((0,src_app_services_algosdk_utils__WEBPACK_IMPORTED_MODULE_1__.convertToAlgos)(amount))));
        this.algorandAssetBalances = this.select(({ algorandAccountData, algorandAssetParams }) => (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.ifDefined)(algorandAccountData === null || algorandAccountData === void 0 ? void 0 : algorandAccountData.assets, (assetHoldings) => (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.allDefinedOrNone)(
        // Look up each asset holding's info in algorandAssetParams.
        assetHoldings.map(({ amount, 'asset-id': assetId }) => (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.ifDefined)(algorandAssetParams === null || algorandAssetParams === void 0 ? void 0 : algorandAssetParams[assetId], (assetParams) => (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.ifDefined)(assetParams === null || assetParams === void 0 ? void 0 : assetParams['unit-name'], (unitName) => (0,src_app_utils_assets_assets_algo_asa__WEBPACK_IMPORTED_MODULE_3__.convertFromLedgerToAssetAmountAsa)({
            amount,
            assetId,
            unitName,
            decimals: assetParams.decimals,
        })))))));
        this.algorandBalances = (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.combineLatest)([
            this.algorandAlgoBalance,
            this.algorandAssetBalances,
        ]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.map)(([algoBalance, assetBalances]) => [
            ...(algoBalance !== undefined ? [algoBalance] : []),
            ...(assetBalances !== null && assetBalances !== void 0 ? assetBalances : []),
        ]), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.distinctUntilChanged)());
        this.xrplBalances = this.select(({ xrplBalances }) => (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.ifDefined)(xrplBalances, (balances) => balances.map(({ value, currency, issuer }) => {
            const amount = (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_6__.defined)((0,src_app_utils_validators__WEBPACK_IMPORTED_MODULE_7__.parseNumber)(value), `SessionQuery.xrplBalances: bad number: ${value}`);
            return currency === 'XRP'
                ? (0,src_app_utils_assets_assets_xrp__WEBPACK_IMPORTED_MODULE_4__.assetAmountXrp)(amount)
                : (0,src_app_utils_assets_assets_xrp_token__WEBPACK_IMPORTED_MODULE_5__.assetAmountXrplToken)(amount, {
                    currency,
                    issuer: (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_6__.defined)(issuer, `SessionQuery.xrplBalances: unexpected undefined issuer for XRPL token currency ${currency}`),
                });
        })));
        this.allBalances = (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.combineLatest)([
            this.algorandAlgoBalance,
            this.algorandAssetBalances,
            this.xrplBalances,
        ]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.map)(([algorandAlgoBalance, algorandAssetBalances, xrplBalances]) => [
            ...(algorandAlgoBalance !== undefined ? [algorandAlgoBalance] : []),
            ...(algorandAssetBalances !== null && algorandAssetBalances !== void 0 ? algorandAssetBalances : []),
            ...(xrplBalances !== null && xrplBalances !== void 0 ? xrplBalances : []),
        ]), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.distinctUntilChanged)());
        this.onfidoCheck = this.select('onfidoCheck');
        this.onfidoCheckIsClear = this.onfidoCheck.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.map)((onfidoCheck) => (onfidoCheck === null || onfidoCheck === void 0 ? void 0 : onfidoCheck.result) === 'clear'));
    }
    // Non-observable accessors:
    getAlgorandBalanceInMicroAlgos() {
        var _a;
        return (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.ignoreZero)((_a = this.getValue().algorandAccountData) === null || _a === void 0 ? void 0 : _a.amount);
    }
    getAlgorandBalanceInAlgos() {
        var _a;
        return (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.ifDefined)((0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.ignoreZero)((_a = this.getValue().algorandAccountData) === null || _a === void 0 ? void 0 : _a.amount), src_app_services_algosdk_utils__WEBPACK_IMPORTED_MODULE_1__.convertToAlgos);
    }
    getAlgorandAssetHoldings() {
        var _a;
        return (_a = this.getValue().algorandAccountData) === null || _a === void 0 ? void 0 : _a.assets;
    }
    hasAlgorandBalance() {
        var _a;
        return 0 < ((_a = this.getAlgorandBalanceInMicroAlgos()) !== null && _a !== void 0 ? _a : 0);
    }
    getXrpBalanceInDrops() {
        var _a;
        return (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_8__.ifDefined)((_a = this.getValue().xrplAccountRoot) === null || _a === void 0 ? void 0 : _a.Balance, src_app_utils_validators__WEBPACK_IMPORTED_MODULE_7__.parseNumber);
    }
    hasXrpBalance() {
        var _a;
        return 0 < ((_a = this.getXrpBalanceInDrops()) !== null && _a !== void 0 ? _a : 0);
    }
    /**
     * Get the current Algorand account's balance for the given ASA.
     *
     * @return 0 if a zero-balance asset holding exists (account is opted-in to the ASA)
     * @return null if no asset holding exists (account is not opted-in to the ASA)
     *
     * @throws Error if `sessionStore.algorandAccountData` is not defined
     */
    getAlgorandAssetBalance(assetId) {
        return (0,src_app_services_algosdk_utils__WEBPACK_IMPORTED_MODULE_1__.extractAlgorandAssetBalance)((0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_6__.defined)(this.getValue().algorandAccountData), assetId);
    }
    hasAlgorandAssetBalance(assetId) {
        return this.getAlgorandAssetBalance(assetId) !== null;
    }
    /**
     * Helper: True if the store contains an active user session.
     */
    isActiveSession() {
        const { wallet, pin } = this.getValue();
        return wallet !== undefined && pin !== undefined;
    }
    /**
     * Helper: Return the current session's wallet + PIN, assuming it's active.
     *
     * @throws {Error} if a session isn't active.
     */
    assumeActiveSession() {
        const prefix = 'SessionAlgorandService.assumeSession: invalid state';
        const { wallet, pin } = this.getValue();
        return {
            wallet: (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_6__.defined)(wallet, `${prefix}: wallet not defined`),
            pin: (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_6__.defined)(pin, `${prefix}: pin not defined`),
        };
    }
}
SessionQuery.ɵfac = function SessionQuery_Factory(t) { return new (t || SessionQuery)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_session_store__WEBPACK_IMPORTED_MODULE_9__.SessionStore)); };
SessionQuery.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjectable"]({ token: SessionQuery, factory: SessionQuery.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 90714:
/*!****************************************!*\
  !*** ./src/app/state/session.store.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createInitialState": () => (/* binding */ createInitialState),
/* harmony export */   "SessionStore": () => (/* binding */ SessionStore)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 48163);
/* harmony import */ var _datorama_akita__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @datorama/akita */ 17898);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);



const createInitialState = () => ({});
/**
 * This store holds the data for a user session.
 *
 * Application code should avoid using {@link SessionStore} interface directly:
 * prefer using the {@link SessionQuery} and {@link import('./session.service').SessionService} interfaces instead.
 */
let SessionStore = class SessionStore extends _datorama_akita__WEBPACK_IMPORTED_MODULE_0__.Store {
    constructor() {
        super(createInitialState());
    }
};
SessionStore.ɵfac = function SessionStore_Factory(t) { return new (t || SessionStore)(); };
SessionStore.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: SessionStore, factory: SessionStore.ɵfac, providedIn: 'root' });
SessionStore = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_datorama_akita__WEBPACK_IMPORTED_MODULE_0__.StoreConfig)({ name: 'session', resettable: true })
], SessionStore);



/***/ }),

/***/ 29076:
/*!****************************************************!*\
  !*** ./src/app/transloco/transloco-root.module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TranslocoHttpLoader": () => (/* binding */ TranslocoHttpLoader),
/* harmony export */   "TranslocoRootModule": () => (/* binding */ TranslocoRootModule)
/* harmony export */ });
/* harmony import */ var _ngneat_transloco__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngneat/transloco */ 12725);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../environments/environment */ 92340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 78336);




class TranslocoHttpLoader {
    constructor(http) {
        this.http = http;
    }
    getTranslation(lang) {
        return this.http.get(`/assets/i18n/${lang}.json`);
    }
}
TranslocoHttpLoader.ɵfac = function TranslocoHttpLoader_Factory(t) { return new (t || TranslocoHttpLoader)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient)); };
TranslocoHttpLoader.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TranslocoHttpLoader, factory: TranslocoHttpLoader.ɵfac, providedIn: 'root' });
class TranslocoRootModule {
}
TranslocoRootModule.ɵfac = function TranslocoRootModule_Factory(t) { return new (t || TranslocoRootModule)(); };
TranslocoRootModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: TranslocoRootModule });
TranslocoRootModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ providers: [
        {
            provide: _ngneat_transloco__WEBPACK_IMPORTED_MODULE_3__.TRANSLOCO_CONFIG,
            useValue: (0,_ngneat_transloco__WEBPACK_IMPORTED_MODULE_3__.translocoConfig)({
                availableLangs: ['en', 'fr'],
                defaultLang: (0,_ngneat_transloco__WEBPACK_IMPORTED_MODULE_3__.getBrowserLang)() || 'en',
                fallbackLang: 'en',
                // Remove this option if your application doesn't support changing language in runtime.
                reRenderOnLangChange: true,
                prodMode: _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.production,
            }),
        },
        { provide: _ngneat_transloco__WEBPACK_IMPORTED_MODULE_3__.TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
    ], imports: [_ngneat_transloco__WEBPACK_IMPORTED_MODULE_3__.TranslocoModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](TranslocoRootModule, { exports: [_ngneat_transloco__WEBPACK_IMPORTED_MODULE_3__.TranslocoModule] }); })();


/***/ }),

/***/ 45883:
/*!*************************************************!*\
  !*** ./src/app/utils/assets/assets.algo.asa.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ledgerInfoAsa": () => (/* binding */ ledgerInfoAsa),
/* harmony export */   "assetAmountAsa": () => (/* binding */ assetAmountAsa),
/* harmony export */   "isLedgerInfoAsa": () => (/* binding */ isLedgerInfoAsa),
/* harmony export */   "isAssetAmountAsa": () => (/* binding */ isAssetAmountAsa),
/* harmony export */   "convertFromLedgerToAssetAmountAsa": () => (/* binding */ convertFromLedgerToAssetAmountAsa),
/* harmony export */   "convertFromAssetAmountAsaToLedger": () => (/* binding */ convertFromAssetAmountAsaToLedger)
/* harmony export */ });
/* harmony import */ var _assets_algo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets.algo */ 23648);
/**
 * Types and code for working with ASAs on the Algorand ledger.
 *
 * 1. {@link AssetDisplay}: use common base type.
 * 2. {@link LedgerInfo} constructor: {@link ledgerInfoAsa}
 * 3. {@link AssetAmount} constructor: {@link assetAmountAsa}
 */

const ledgerInfoAsa = (assetId, decimals) => ({
    type: _assets_algo__WEBPACK_IMPORTED_MODULE_0__.LEDGER_TYPE_ALGORAND,
    isAsa: true,
    assetId,
    decimals,
});
const assetAmountAsa = (amount, { assetSymbol, assetId, decimals, }) => ({
    amount,
    assetDisplay: { assetSymbol, minDigits: 0, maxDigits: decimals },
    ledgerInfo: ledgerInfoAsa(assetId, decimals),
});
// Type checks:
const isLedgerInfoAsa = (ledgerInfo) => ledgerInfo.type === _assets_algo__WEBPACK_IMPORTED_MODULE_0__.LEDGER_TYPE_ALGORAND &&
    'isAsa' in ledgerInfo &&
    ledgerInfo.isAsa &&
    'assetId' in ledgerInfo &&
    'decimals' in ledgerInfo;
const isAssetAmountAsa = (amount) => isLedgerInfoAsa(amount.ledgerInfo);
const convertFromLedgerToAssetAmountAsa = (ledgerAmount) => {
    const { amount, assetId, unitName, decimals } = ledgerAmount;
    return assetAmountAsa(amount / 10 ** decimals, {
        assetSymbol: unitName,
        assetId,
        decimals,
    });
};
const convertFromAssetAmountAsaToLedger = (assetAmount) => {
    const { amount, assetDisplay: { assetSymbol }, ledgerInfo: { assetId, decimals }, } = assetAmount;
    return {
        amount: amount * 10 ** decimals,
        assetId,
        unitName: assetSymbol,
        decimals,
    };
};


/***/ }),

/***/ 23648:
/*!*********************************************!*\
  !*** ./src/app/utils/assets/assets.algo.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ASSET_SYMBOL_ALGO": () => (/* binding */ ASSET_SYMBOL_ALGO),
/* harmony export */   "ASSET_DISPLAY_ALGO": () => (/* binding */ ASSET_DISPLAY_ALGO),
/* harmony export */   "LEDGER_TYPE_ALGORAND": () => (/* binding */ LEDGER_TYPE_ALGORAND),
/* harmony export */   "LEDGER_INFO_ALGO": () => (/* binding */ LEDGER_INFO_ALGO),
/* harmony export */   "assetAmountAlgo": () => (/* binding */ assetAmountAlgo),
/* harmony export */   "isLedgerInfoAlgo": () => (/* binding */ isLedgerInfoAlgo),
/* harmony export */   "isAssetAmountAlgo": () => (/* binding */ isAssetAmountAlgo)
/* harmony export */ });
/**
 * Types and code for working with Algo on the Algorand ledger.
 *
 * 1. {@link AssetDisplay} constant: {@link ASSET_DISPLAY_ALGO}
 * 2. {@link LedgerInfo} constant: {@link LEDGER_INFO_ALGO}
 * 3. {@link AssetAmount} constructor: {@link assetAmountAlgo}
 */
const ASSET_SYMBOL_ALGO = 'ALGO';
const ASSET_DISPLAY_ALGO = {
    assetSymbol: ASSET_SYMBOL_ALGO,
    minDigits: 0,
    maxDigits: 6,
};
const LEDGER_TYPE_ALGORAND = 'Algorand';
const LEDGER_INFO_ALGO = {
    type: LEDGER_TYPE_ALGORAND,
    isAlgo: true,
};
const assetAmountAlgo = (amount) => ({
    amount,
    assetDisplay: ASSET_DISPLAY_ALGO,
    ledgerInfo: LEDGER_INFO_ALGO,
});
// Type checks:
const isLedgerInfoAlgo = (ledgerInfo) => ledgerInfo.type === LEDGER_TYPE_ALGORAND &&
    'isAlgo' in ledgerInfo &&
    ledgerInfo.isAlgo;
const isAssetAmountAlgo = (amount) => amount.ledgerInfo.type === LEDGER_TYPE_ALGORAND &&
    amount.assetDisplay.assetSymbol === ASSET_SYMBOL_ALGO;


/***/ }),

/***/ 23726:
/*!**************************************************!*\
  !*** ./src/app/utils/assets/assets.xrp.token.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ledgerInfoXrplToken": () => (/* binding */ ledgerInfoXrplToken),
/* harmony export */   "assetAmountXrplToken": () => (/* binding */ assetAmountXrplToken),
/* harmony export */   "isLedgerInfoXrplToken": () => (/* binding */ isLedgerInfoXrplToken),
/* harmony export */   "isAssetAmountXrplToken": () => (/* binding */ isAssetAmountXrplToken),
/* harmony export */   "convertFromLedgerToAssetAmountXrplToken": () => (/* binding */ convertFromLedgerToAssetAmountXrplToken),
/* harmony export */   "convertFromAssetAmountXrplTokenToLedger": () => (/* binding */ convertFromAssetAmountXrplTokenToLedger)
/* harmony export */ });
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var src_app_utils_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/utils/validators */ 90895);
/* harmony import */ var _assets_xrp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets.xrp */ 42339);
/**
 * Types and code for working with tokens on the XRP ledger.
 *
 * 1. {@link AssetDisplay}: use common base type.
 * 2. {@link LedgerInfo} constructor: {@link ledgerInfoXrplToken}
 * 3. {@link AssetAmount} constructor: {@link assetAmountXrplToken}
 */



const ledgerInfoXrplToken = (currency, issuer) => ({
    type: _assets_xrp__WEBPACK_IMPORTED_MODULE_2__.LEDGER_TYPE_XRPL,
    isToken: true,
    currency,
    issuer,
});
const assetAmountXrplToken = (amount, { currency, issuer }) => ({
    amount,
    assetDisplay: { assetSymbol: currency, minDigits: 0, maxDigits: 3 },
    ledgerInfo: ledgerInfoXrplToken(currency, issuer),
});
// Type checks:
const isLedgerInfoXrplToken = (ledgerInfo) => ledgerInfo.type === _assets_xrp__WEBPACK_IMPORTED_MODULE_2__.LEDGER_TYPE_XRPL &&
    'isToken' in ledgerInfo &&
    ledgerInfo.isToken &&
    'currency' in ledgerInfo;
const isAssetAmountXrplToken = (amount) => isLedgerInfoXrplToken(amount.ledgerInfo);
// Ledger representation conversion:
const convertFromLedgerToAssetAmountXrplToken = (ledgerAmount) => {
    const { currency, issuer, value } = ledgerAmount;
    const amount = (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_0__.defined)((0,src_app_utils_validators__WEBPACK_IMPORTED_MODULE_1__.parseNumber)(value), `bad number: ${value}`);
    return assetAmountXrplToken(amount, { currency, issuer });
};
const convertFromAssetAmountXrplTokenToLedger = (assetAmount) => {
    const { amount, ledgerInfo: { currency, issuer }, } = assetAmount;
    return { currency, issuer, value: amount.toString() };
};


/***/ }),

/***/ 42339:
/*!********************************************!*\
  !*** ./src/app/utils/assets/assets.xrp.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ASSET_SYMBOL_XRP": () => (/* binding */ ASSET_SYMBOL_XRP),
/* harmony export */   "ASSET_DISPLAY_XRP": () => (/* binding */ ASSET_DISPLAY_XRP),
/* harmony export */   "LEDGER_TYPE_XRPL": () => (/* binding */ LEDGER_TYPE_XRPL),
/* harmony export */   "LEDGER_INFO_XRP": () => (/* binding */ LEDGER_INFO_XRP),
/* harmony export */   "assetAmountXrp": () => (/* binding */ assetAmountXrp),
/* harmony export */   "isLedgerInfoXrp": () => (/* binding */ isLedgerInfoXrp),
/* harmony export */   "isAssetAmountXrp": () => (/* binding */ isAssetAmountXrp),
/* harmony export */   "convertFromLedgerToAssetAmountXrp": () => (/* binding */ convertFromLedgerToAssetAmountXrp),
/* harmony export */   "convertFromAssetAmountXrpToLedger": () => (/* binding */ convertFromAssetAmountXrpToLedger)
/* harmony export */ });
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var src_app_utils_validators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/utils/validators */ 90895);
/* harmony import */ var xrpl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! xrpl */ 77962);
/* harmony import */ var xrpl__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(xrpl__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Types and code for working with XRP on the XRP ledger.
 *
 * 1. {@link AssetDisplay} constant: {@link ASSET_DISPLAY_XRP}
 * 2. {@link LedgerInfo} constant: {@link LEDGER_INFO_XRP}
 * 3. {@link AssetAmount} constructor: {@link assetAmountXrp}
 */



const ASSET_SYMBOL_XRP = 'XRP';
const ASSET_DISPLAY_XRP = {
    assetSymbol: ASSET_SYMBOL_XRP,
    minDigits: 0,
    maxDigits: 6,
};
const LEDGER_TYPE_XRPL = 'XRPL';
const LEDGER_INFO_XRP = {
    type: LEDGER_TYPE_XRPL,
    isXrp: true,
};
const assetAmountXrp = (amount) => ({
    amount,
    assetDisplay: ASSET_DISPLAY_XRP,
    ledgerInfo: LEDGER_INFO_XRP,
});
// Type checks:
const isLedgerInfoXrp = (ledgerInfo) => ledgerInfo.type === LEDGER_TYPE_XRPL &&
    'isXrp' in ledgerInfo &&
    ledgerInfo.isXrp;
const isAssetAmountXrp = (amount) => amount.ledgerInfo.type === LEDGER_TYPE_XRPL &&
    amount.assetDisplay.assetSymbol === ASSET_SYMBOL_XRP;
// Ledger representation conversion:
const convertFromLedgerToAssetAmountXrp = (ledgerAmount) => assetAmountXrp((0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_0__.defined)((0,src_app_utils_validators__WEBPACK_IMPORTED_MODULE_1__.parseNumber)(xrpl__WEBPACK_IMPORTED_MODULE_2__.dropsToXrp(ledgerAmount)), `bad number: ${ledgerAmount}`));
const convertFromAssetAmountXrpToLedger = (assetAmount) => xrpl__WEBPACK_IMPORTED_MODULE_2__.xrpToDrops(assetAmount.amount);


/***/ }),

/***/ 54602:
/*!******************************************************!*\
  !*** ./src/app/utils/errors/global-error-handler.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GlobalErrorHandler": () => (/* binding */ GlobalErrorHandler)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var _sentry_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @sentry/angular */ 99575);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _notification_swal_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../notification/swal-helper */ 1733);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 95472);





class GlobalErrorHandler {
  constructor(zone, notification, navCtrl) {
    this.zone = zone;
    this.notification = notification;
    this.navCtrl = navCtrl;
  }

  handleError(error) {
    var _this = this;

    if (error.message.includes('setOptions failed')) {
      // XXX: Work around: Uncaught (in promise) DOMException: setOptions failed #297
      //      https://github.com/zxing-js/ngx-scanner/issues/297
      console.warn('GlobalErrorHandler ignoring:', error);
      return;
    }

    console.error('GlobalErrorHandler:', error);
    _sentry_angular__WEBPACK_IMPORTED_MODULE_2__.captureException(error);
    this.zone.run( /*#__PURE__*/(0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return yield _this.notification.swal.fire({
        icon: 'error',
        text: 'Unexpected Error Occurred'
      }).then(() => {
        // XXX: See also modal closing code in LandingPage
        _this.navCtrl.navigateRoot('');
      });
    }));
  }

}

GlobalErrorHandler.ɵfac = function GlobalErrorHandler_Factory(t) {
  return new (t || GlobalErrorHandler)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_notification_swal_helper__WEBPACK_IMPORTED_MODULE_1__.SwalHelper), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.NavController));
};

GlobalErrorHandler.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: GlobalErrorHandler,
  factory: GlobalErrorHandler.ɵfac
});

/***/ }),

/***/ 17790:
/*!***************************************!*\
  !*** ./src/app/utils/errors/panic.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "panic": () => (/* binding */ panic),
/* harmony export */   "defined": () => (/* binding */ defined)
/* harmony export */ });
/**
 * Helper for unrecoverable errors: Log an error message and inspectable value, and abort.
 *
 * @throws Error with `message`
 */
const panic = (message, value) => {
    console.error(message, value);
    throw new Error(message);
};
/**
 * Return defined value or panic.
 */
const defined = (value, message) => {
    if (value !== undefined) {
        return value;
    }
    else {
        throw panic(message !== null && message !== void 0 ? message : 'unexpected undefined', value);
    }
};


/***/ }),

/***/ 1733:
/*!***************************************************!*\
  !*** ./src/app/utils/notification/swal-helper.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SwalHelper": () => (/* binding */ SwalHelper)
/* harmony export */ });
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sweetalert2 */ 11155);
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);


class SwalHelper {
    constructor() {
        this.swal = sweetalert2__WEBPACK_IMPORTED_MODULE_0___default().mixin({
            confirmButtonColor: 'var(--ion-color-primary)',
            customClass: {
                actions: '!w-full',
                confirmButton: 'w-1/2 !rounded-full',
                title: 'font-nasalization',
            },
            backdrop: true,
            heightAuto: false,
            allowOutsideClick: false,
        });
    }
}
SwalHelper.ɵfac = function SwalHelper_Factory(t) { return new (t || SwalHelper)(); };
SwalHelper.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: SwalHelper, factory: SwalHelper.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 90895:
/*!*************************************!*\
  !*** ./src/app/utils/validators.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parseNumber": () => (/* binding */ parseNumber),
/* harmony export */   "numericValidator": () => (/* binding */ numericValidator)
/* harmony export */ });
/**
 * Safely parse untrusted user input to a `number`.
 *
 * This uses JSON-compatible definition "number".
 */
const parseNumber = (text) => {
    const result = text !== undefined ? tryJsonParse(text) : undefined;
    return typeof result === 'number' ? result : undefined;
};
const tryJsonParse = (text) => {
    try {
        return JSON.parse(text);
    }
    catch (err) {
        if (err instanceof SyntaxError) {
            return undefined;
        }
        else {
            throw err;
        }
    }
};
/**
 * Validate values that can be parsed with {@link parseNumber}.
 *
 * (Note: This is named "numeric" rather than "number" because the latter is a blacklisted identifier.)
 */
const numericValidator = (control) => {
    if (typeof control.value === 'string') {
        return parseNumber(control.value) === undefined ? { numeric: true } : null;
    }
    else {
        throw new TypeError(`numberValidator: expected string value, got ${typeof control.value}`);
    }
};


/***/ }),

/***/ 92340:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "environment": () => (/* binding */ environment)
/* harmony export */ });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    // Enable persistence for easier development.
    persistAkitaState: true,
    nautilusWalletServer: 'http://localhost:4200/api/nautilus/',
    nautilusAssetServices: 'http://localhost:4200/api/asset-services/',
    // See `proxyConfig` in `angular.json`, and `proxy.conf.json`
    // Docs: https://angular.io/guide/build#proxying-to-a-backend-server
    algod: {
        // XXX: Algodv2's parameter handling is a bit weird: the HTTP port must be passed separately.
        baseServer: 'http://localhost/api/algorand',
        port: 4200,
        // FIXME: Development key
        token: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
    xrplClient: {
        server: 'ws://localhost:4200/api/xrpl',
        options: {
            connectionTimeout: 20000,
        },
    },
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ 42289:
/*!********************************!*\
  !*** ./src/helpers/helpers.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "never": () => (/* binding */ never),
/* harmony export */   "ifDefined": () => (/* binding */ ifDefined),
/* harmony export */   "allDefinedOrNone": () => (/* binding */ allDefinedOrNone),
/* harmony export */   "ignoreZero": () => (/* binding */ ignoreZero),
/* harmony export */   "checkClass": () => (/* binding */ checkClass)
/* harmony export */ });
/**
 * General helper code.
 */
/**
 * Helper for exhaustiveness checking: mark unreachable values.
 */
const never = (value) => {
    console.error('expected never, got:', value);
    throw new TypeError('expected never, got value (see error log)');
};
/**
 * Apply `f` to an optional `value`.
 *
 * This works like nullish coalescing and optional chaining, but for a function argument.
 */
const ifDefined = (value, f) => value === null || value === undefined ? undefined : f(value);
/**
 * Verify that all items in a list are defined, or return `undefined`.
 */
const allDefinedOrNone = (values) => values.every((v) => v !== undefined) ? values : undefined;
/**
 * Return `n` if non-zero, otherwise `undefined`.
 */
const ignoreZero = (n) => n === 0 ? undefined : n;
/**
 * Helper: Check that o is an instance of the given class.
 */
const checkClass = (o, cls) => {
    var _a, _b;
    if (o instanceof cls) {
        return o;
    }
    else {
        const oClsName = (_b = (_a = o) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name;
        throw new TypeError(`expected ${cls.name}, got ${oClsName}: ${o}`);
    }
};


/***/ }),

/***/ 14431:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser */ 78394);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _datorama_akita__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @datorama/akita */ 17898);
/* harmony import */ var _ionic_pwa_elements_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/pwa-elements/loader */ 26023);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ 36747);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ 92340);






if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.production) {
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.enableProdMode)();
    (0,_datorama_akita__WEBPACK_IMPORTED_MODULE_0__.enableAkitaProdMode)();
}
if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__.environment.persistAkitaState) {
    (0,_datorama_akita__WEBPACK_IMPORTED_MODULE_0__.persistState)({});
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_5__.platformBrowser()
    .bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__.AppModule)
    .catch((err) => console.log(err));
(0,_ionic_pwa_elements_loader__WEBPACK_IMPORTED_MODULE_1__.defineCustomElements)(window);


/***/ }),

/***/ 50863:
/*!******************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/core/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \******************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ion-accordion_2.entry.js": [
		470,
		"common",
		"node_modules_ionic_core_dist_esm_ion-accordion_2_entry_js"
	],
	"./ion-action-sheet.entry.js": [
		22725,
		"common",
		"node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js"
	],
	"./ion-alert.entry.js": [
		36149,
		"common",
		"node_modules_ionic_core_dist_esm_ion-alert_entry_js"
	],
	"./ion-app_8.entry.js": [
		19288,
		"common",
		"node_modules_ionic_core_dist_esm_ion-app_8_entry_js"
	],
	"./ion-avatar_3.entry.js": [
		61031,
		"common",
		"node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js"
	],
	"./ion-back-button.entry.js": [
		58310,
		"common",
		"node_modules_ionic_core_dist_esm_ion-back-button_entry_js"
	],
	"./ion-backdrop.entry.js": [
		47653,
		"node_modules_ionic_core_dist_esm_ion-backdrop_entry_js"
	],
	"./ion-breadcrumb_2.entry.js": [
		17039,
		"common",
		"node_modules_ionic_core_dist_esm_ion-breadcrumb_2_entry_js"
	],
	"./ion-button_2.entry.js": [
		57945,
		"common",
		"node_modules_ionic_core_dist_esm_ion-button_2_entry_js"
	],
	"./ion-card_5.entry.js": [
		8714,
		"common",
		"node_modules_ionic_core_dist_esm_ion-card_5_entry_js"
	],
	"./ion-checkbox.entry.js": [
		31786,
		"common",
		"node_modules_ionic_core_dist_esm_ion-checkbox_entry_js"
	],
	"./ion-chip.entry.js": [
		24702,
		"common",
		"node_modules_ionic_core_dist_esm_ion-chip_entry_js"
	],
	"./ion-col_3.entry.js": [
		94094,
		"node_modules_ionic_core_dist_esm_ion-col_3_entry_js"
	],
	"./ion-datetime_3.entry.js": [
		50795,
		"common",
		"node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js"
	],
	"./ion-fab_3.entry.js": [
		36976,
		"common",
		"node_modules_ionic_core_dist_esm_ion-fab_3_entry_js"
	],
	"./ion-img.entry.js": [
		51417,
		"node_modules_ionic_core_dist_esm_ion-img_entry_js"
	],
	"./ion-infinite-scroll_2.entry.js": [
		78412,
		"common",
		"node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js"
	],
	"./ion-input.entry.js": [
		94706,
		"common",
		"node_modules_ionic_core_dist_esm_ion-input_entry_js"
	],
	"./ion-item-option_3.entry.js": [
		73459,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js"
	],
	"./ion-item_8.entry.js": [
		23354,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item_8_entry_js"
	],
	"./ion-loading.entry.js": [
		41025,
		"common",
		"node_modules_ionic_core_dist_esm_ion-loading_entry_js"
	],
	"./ion-menu_3.entry.js": [
		98592,
		"common",
		"node_modules_ionic_core_dist_esm_ion-menu_3_entry_js"
	],
	"./ion-modal.entry.js": [
		52526,
		"common",
		"node_modules_ionic_core_dist_esm_ion-modal_entry_js"
	],
	"./ion-nav_2.entry.js": [
		92447,
		"common",
		"node_modules_ionic_core_dist_esm_ion-nav_2_entry_js"
	],
	"./ion-picker-column-internal.entry.js": [
		8823,
		"common",
		"node_modules_ionic_core_dist_esm_ion-picker-column-internal_entry_js"
	],
	"./ion-picker-internal.entry.js": [
		83212,
		"node_modules_ionic_core_dist_esm_ion-picker-internal_entry_js"
	],
	"./ion-popover.entry.js": [
		87557,
		"common",
		"node_modules_ionic_core_dist_esm_ion-popover_entry_js"
	],
	"./ion-progress-bar.entry.js": [
		28692,
		"common",
		"node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js"
	],
	"./ion-radio_2.entry.js": [
		93544,
		"common",
		"node_modules_ionic_core_dist_esm_ion-radio_2_entry_js"
	],
	"./ion-range.entry.js": [
		40042,
		"common",
		"node_modules_ionic_core_dist_esm_ion-range_entry_js"
	],
	"./ion-refresher_2.entry.js": [
		70718,
		"common",
		"node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js"
	],
	"./ion-reorder_2.entry.js": [
		95981,
		"common",
		"node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js"
	],
	"./ion-ripple-effect.entry.js": [
		76488,
		"node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js"
	],
	"./ion-route_4.entry.js": [
		47937,
		"common",
		"node_modules_ionic_core_dist_esm_ion-route_4_entry_js"
	],
	"./ion-searchbar.entry.js": [
		50942,
		"common",
		"node_modules_ionic_core_dist_esm_ion-searchbar_entry_js"
	],
	"./ion-segment_2.entry.js": [
		20816,
		"common",
		"node_modules_ionic_core_dist_esm_ion-segment_2_entry_js"
	],
	"./ion-select_3.entry.js": [
		19062,
		"common",
		"node_modules_ionic_core_dist_esm_ion-select_3_entry_js"
	],
	"./ion-slide_2.entry.js": [
		13466,
		"node_modules_ionic_core_dist_esm_ion-slide_2_entry_js"
	],
	"./ion-spinner.entry.js": [
		18404,
		"common",
		"node_modules_ionic_core_dist_esm_ion-spinner_entry_js"
	],
	"./ion-split-pane.entry.js": [
		60953,
		"node_modules_ionic_core_dist_esm_ion-split-pane_entry_js"
	],
	"./ion-tab-bar_2.entry.js": [
		44254,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js"
	],
	"./ion-tab_2.entry.js": [
		45195,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab_2_entry_js"
	],
	"./ion-text.entry.js": [
		86116,
		"common",
		"node_modules_ionic_core_dist_esm_ion-text_entry_js"
	],
	"./ion-textarea.entry.js": [
		79781,
		"common",
		"node_modules_ionic_core_dist_esm_ion-textarea_entry_js"
	],
	"./ion-toast.entry.js": [
		48323,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toast_entry_js"
	],
	"./ion-toggle.entry.js": [
		376,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toggle_entry_js"
	],
	"./ion-virtual-scroll.entry.js": [
		82072,
		"node_modules_ionic_core_dist_esm_ion-virtual-scroll_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 50863;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 55899:
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/@ionic/pwa-elements/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \**************************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./pwa-action-sheet.entry.js": [
		277,
		"node_modules_ionic_pwa-elements_dist_esm_pwa-action-sheet_entry_js"
	],
	"./pwa-camera-modal-instance.entry.js": [
		12194,
		"node_modules_ionic_pwa-elements_dist_esm_pwa-camera-modal-instance_entry_js"
	],
	"./pwa-camera-modal.entry.js": [
		82278,
		"node_modules_ionic_pwa-elements_dist_esm_pwa-camera-modal_entry_js"
	],
	"./pwa-camera.entry.js": [
		66759,
		"node_modules_ionic_pwa-elements_dist_esm_pwa-camera_entry_js"
	],
	"./pwa-toast.entry.js": [
		16133,
		"node_modules_ionic_pwa-elements_dist_esm_pwa-toast_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 55899;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 80950:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 46601:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 96419:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 56353:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 8623:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 7748:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 85568:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 69386:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 31616:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 56619:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 77108:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 52361:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 94616:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 33370:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(14431)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map