"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_views_print-wallet_print-wallet_module_ts"],{

/***/ 42550:
/*!*******************************************************************!*\
  !*** ./node_modules/@capacitor/clipboard/dist/esm/definitions.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);



/***/ }),

/***/ 31260:
/*!*************************************************************!*\
  !*** ./node_modules/@capacitor/clipboard/dist/esm/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Clipboard": () => (/* binding */ Clipboard)
/* harmony export */ });
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @capacitor/core */ 16594);
/* harmony import */ var _web__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./web */ 59319);
/* harmony import */ var _definitions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./definitions */ 42550);


const Clipboard = (0,_capacitor_core__WEBPACK_IMPORTED_MODULE_0__.registerPlugin)('Clipboard', {
    web: () => new _web__WEBPACK_IMPORTED_MODULE_1__.ClipboardWeb(),
});




/***/ }),

/***/ 59319:
/*!***********************************************************!*\
  !*** ./node_modules/@capacitor/clipboard/dist/esm/web.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClipboardWeb": () => (/* binding */ ClipboardWeb)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/core */ 16594);


class ClipboardWeb extends _capacitor_core__WEBPACK_IMPORTED_MODULE_1__.WebPlugin {
  write(options) {
    var _this = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (typeof navigator === 'undefined' || !navigator.clipboard) {
        throw _this.unavailable('Clipboard API not available in this browser');
      }

      if (options.string !== undefined) {
        yield _this.writeText(options.string);
      } else if (options.url) {
        yield _this.writeText(options.url);
      } else if (options.image) {
        if (typeof ClipboardItem !== 'undefined') {
          try {
            const blob = yield (yield fetch(options.image)).blob();
            const clipboardItemInput = new ClipboardItem({
              [blob.type]: blob
            });
            yield navigator.clipboard.write([clipboardItemInput]);
          } catch (err) {
            throw new Error('Failed to write image');
          }
        } else {
          throw _this.unavailable('Writing images to the clipboard is not supported in this browser');
        }
      } else {
        throw new Error('Nothing to write');
      }
    })();
  }

  read() {
    var _this2 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (typeof navigator === 'undefined' || !navigator.clipboard) {
        throw _this2.unavailable('Clipboard API not available in this browser');
      }

      if (typeof ClipboardItem !== 'undefined') {
        try {
          const clipboardItems = yield navigator.clipboard.read();
          const type = clipboardItems[0].types[0];
          const clipboardBlob = yield clipboardItems[0].getType(type);
          const data = yield _this2._getBlobData(clipboardBlob, type);
          return {
            value: data,
            type
          };
        } catch (err) {
          return _this2.readText();
        }
      } else {
        return _this2.readText();
      }
    })();
  }

  readText() {
    var _this3 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (typeof navigator === 'undefined' || !navigator.clipboard || !navigator.clipboard.readText) {
        throw _this3.unavailable('Reading from clipboard not supported in this browser');
      }

      const text = yield navigator.clipboard.readText();
      return {
        value: text,
        type: 'text/plain'
      };
    })();
  }

  writeText(text) {
    var _this4 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (typeof navigator === 'undefined' || !navigator.clipboard || !navigator.clipboard.writeText) {
        throw _this4.unavailable('Writting to clipboard not supported in this browser');
      }

      yield navigator.clipboard.writeText(text);
    })();
  }

  _getBlobData(clipboardBlob, type) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      if (type.includes('image')) {
        reader.readAsDataURL(clipboardBlob);
      } else {
        reader.readAsText(clipboardBlob);
      }

      reader.onloadend = () => {
        const r = reader.result;
        resolve(r);
      };

      reader.onerror = e => {
        reject(e);
      };
    });
  }

}

/***/ }),

/***/ 66317:
/*!*******************************************************************!*\
  !*** ./src/app/views/print-wallet/print-wallet-routing.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrintWalletPageRoutingModule": () => (/* binding */ PrintWalletPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _print_wallet_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./print-wallet.page */ 9392);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);




const routes = [
    {
        path: '',
        component: _print_wallet_page__WEBPACK_IMPORTED_MODULE_0__.PrintWalletPage,
    },
];
class PrintWalletPageRoutingModule {
}
PrintWalletPageRoutingModule.ɵfac = function PrintWalletPageRoutingModule_Factory(t) { return new (t || PrintWalletPageRoutingModule)(); };
PrintWalletPageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: PrintWalletPageRoutingModule });
PrintWalletPageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](PrintWalletPageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 4212:
/*!***********************************************************!*\
  !*** ./src/app/views/print-wallet/print-wallet.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrintWalletPageModule": () => (/* binding */ PrintWalletPageModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 31777);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ 72271);
/* harmony import */ var _print_wallet_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./print-wallet-routing.module */ 66317);
/* harmony import */ var _print_wallet_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./print-wallet.page */ 9392);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51109);







class PrintWalletPageModule {
}
PrintWalletPageModule.ɵfac = function PrintWalletPageModule_Factory(t) { return new (t || PrintWalletPageModule)(); };
PrintWalletPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: PrintWalletPageModule });
PrintWalletPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _print_wallet_routing_module__WEBPACK_IMPORTED_MODULE_1__.PrintWalletPageRoutingModule,
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](PrintWalletPageModule, { declarations: [_print_wallet_page__WEBPACK_IMPORTED_MODULE_2__.PrintWalletPage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
        _print_wallet_routing_module__WEBPACK_IMPORTED_MODULE_1__.PrintWalletPageRoutingModule,
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule] }); })();


/***/ }),

/***/ 9392:
/*!*********************************************************!*\
  !*** ./src/app/views/print-wallet/print-wallet.page.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrintWalletPage": () => (/* binding */ PrintWalletPage)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var _capacitor_clipboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/clipboard */ 31260);
/* harmony import */ var src_app_utils_toast_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/utils/toast.helpers */ 46134);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_state_session_query__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/state/session.query */ 55545);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var angularx_qrcode__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! angularx-qrcode */ 73501);
/* harmony import */ var ngx_printer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ngx-printer */ 8801);











function PrintWalletPage_ion_grid_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-grid", 1)(1, "ion-row", 6)(2, "ion-col", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "qrcode", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "ion-col", 9)(5, "h2", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "Address");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 11)(8, "ion-text", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-row")(11, "ion-col")(12, "ion-button", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PrintWalletPage_ion_grid_7_Template_ion_button_click_12_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r3);
      const walletId_r1 = restoredCtx.ngIf;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return ctx_r2.copyAddress(walletId_r1);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](13, "ion-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, " Copy address ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "ion-col")(16, "ion-button", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](17, "ion-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18, " Print page ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "ion-button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "Home");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const walletId_r1 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("qrdata", walletId_r1)("margin", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](walletId_r1);
  }
}

const _c0 = function () {
  return ["/"];
};

class PrintWalletPage {
  constructor(toastCtrl, sessionQuery) {
    this.toastCtrl = toastCtrl;
    this.sessionQuery = sessionQuery; // Hook for testing

    this.Clipboard = _capacitor_clipboard__WEBPACK_IMPORTED_MODULE_1__.Clipboard;
  }

  ngOnInit() {}

  copyAddress(address) {
    var _this = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.Clipboard.write({
        // eslint-disable-next-line id-blacklist
        string: address
      }).then(() => {
        _this.notice('Address copied!');
      }).catch(() => {
        _this.notice('Something weird happened, please try again!');
      });
    })();
  }

  notice(message) {
    var _this2 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return (0,src_app_utils_toast_helpers__WEBPACK_IMPORTED_MODULE_2__.showToast)(_this2.toastCtrl, message, {
        color: 'white',
        duration: 2000
      });
    })();
  }

}

PrintWalletPage.ɵfac = function PrintWalletPage_Factory(t) {
  return new (t || PrintWalletPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ToastController), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_state_session_query__WEBPACK_IMPORTED_MODULE_3__.SessionQuery));
};

PrintWalletPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: PrintWalletPage,
  selectors: [["app-print-wallet"]],
  decls: 9,
  vars: 5,
  consts: [[1, "ion-no-border"], ["fixed", ""], ["slot", "start"], [3, "routerLink"], ["name", "close-circle-outline", "slot", "icon-only"], ["fixed", "", 4, "ngIf"], ["id", "print-section"], ["size", "12"], ["errorCorrectionLevel", "H", "elementType", "svg", "cssClass", "children:w-full children:h-auto", 3, "qrdata", "margin"], ["size", "12", 1, "ion-text-center"], [1, "font-nasalization"], [1, "border-dashed", "border-2", "rounded", "p-3", "my-2"], [1, "font-bold"], ["id", "copy-button", "expand", "block", "fill", "outline", "color", "white", "shape", "round", 3, "click"], ["name", "copy-outline"], ["expand", "block", "fill", "outline", "color", "white", "shape", "round", "ngxPrintItemButton", "", "divID", "print-section"], ["name", "print-outline"], ["expand", "block", "shape", "round", "routerLink", "/"]],
  template: function PrintWalletPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header", 0)(1, "ion-grid", 1)(2, "ion-toolbar")(3, "ion-buttons", 2)(4, "ion-button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "ion-content");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, PrintWalletPage_ion_grid_7_Template, 21, 3, "ion-grid", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](4, _c0));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](8, 2, ctx.sessionQuery.walletId));
    }
  },
  directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.RouterLinkDelegate, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonContent, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonCol, angularx_qrcode__WEBPACK_IMPORTED_MODULE_8__.QRCodeComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonText, ngx_printer__WEBPACK_IMPORTED_MODULE_9__.PrintItemButtonDirective],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcmludC13YWxsZXQucGFnZS5zY3NzIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_views_print-wallet_print-wallet_module_ts.js.map