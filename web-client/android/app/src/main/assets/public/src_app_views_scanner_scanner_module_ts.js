"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_views_scanner_scanner_module_ts"],{

/***/ 29709:
/*!*********************************************************!*\
  !*** ./src/app/views/scanner/scanner-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScannerPageRoutingModule": () => (/* binding */ ScannerPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _scanner_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scanner.page */ 48574);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);




const routes = [
    {
        path: '',
        component: _scanner_page__WEBPACK_IMPORTED_MODULE_0__.ScannerPage,
    },
];
class ScannerPageRoutingModule {
}
ScannerPageRoutingModule.ɵfac = function ScannerPageRoutingModule_Factory(t) { return new (t || ScannerPageRoutingModule)(); };
ScannerPageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: ScannerPageRoutingModule });
ScannerPageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ScannerPageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 10485:
/*!*************************************************!*\
  !*** ./src/app/views/scanner/scanner.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScannerPageModule": () => (/* binding */ ScannerPageModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 31777);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var _zxing_ngx_scanner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @zxing/ngx-scanner */ 52394);
/* harmony import */ var _scanner_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scanner-routing.module */ 29709);
/* harmony import */ var _scanner_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scanner.page */ 48574);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51109);







class ScannerPageModule {
}
ScannerPageModule.ɵfac = function ScannerPageModule_Factory(t) { return new (t || ScannerPageModule)(); };
ScannerPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: ScannerPageModule });
ScannerPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            _scanner_routing_module__WEBPACK_IMPORTED_MODULE_0__.ScannerPageRoutingModule,
            _zxing_ngx_scanner__WEBPACK_IMPORTED_MODULE_6__.ZXingScannerModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ScannerPageModule, { declarations: [_scanner_page__WEBPACK_IMPORTED_MODULE_1__.ScannerPage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
        _scanner_routing_module__WEBPACK_IMPORTED_MODULE_0__.ScannerPageRoutingModule,
        _zxing_ngx_scanner__WEBPACK_IMPORTED_MODULE_6__.ZXingScannerModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_views_scanner_scanner_module_ts.js.map