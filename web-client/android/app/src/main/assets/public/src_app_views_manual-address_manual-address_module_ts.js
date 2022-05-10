"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_views_manual-address_manual-address_module_ts"],{

/***/ 27118:
/*!***********************************************************************!*\
  !*** ./src/app/views/manual-address/manual-address-routing.module.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ManualAddressPageRoutingModule": () => (/* binding */ ManualAddressPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _manual_address_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./manual-address.page */ 91327);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);




const routes = [
    {
        path: '',
        component: _manual_address_page__WEBPACK_IMPORTED_MODULE_0__.ManualAddressPage,
    },
];
class ManualAddressPageRoutingModule {
}
ManualAddressPageRoutingModule.ɵfac = function ManualAddressPageRoutingModule_Factory(t) { return new (t || ManualAddressPageRoutingModule)(); };
ManualAddressPageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: ManualAddressPageRoutingModule });
ManualAddressPageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ManualAddressPageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 21700:
/*!***************************************************************!*\
  !*** ./src/app/views/manual-address/manual-address.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ManualAddressPageModule": () => (/* binding */ ManualAddressPageModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 31777);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ 72271);
/* harmony import */ var _manual_address_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./manual-address-routing.module */ 27118);
/* harmony import */ var _manual_address_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manual-address.page */ 91327);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51109);







class ManualAddressPageModule {
}
ManualAddressPageModule.ɵfac = function ManualAddressPageModule_Factory(t) { return new (t || ManualAddressPageModule)(); };
ManualAddressPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: ManualAddressPageModule });
ManualAddressPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _manual_address_routing_module__WEBPACK_IMPORTED_MODULE_1__.ManualAddressPageRoutingModule,
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ManualAddressPageModule, { declarations: [_manual_address_page__WEBPACK_IMPORTED_MODULE_2__.ManualAddressPage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
        _manual_address_routing_module__WEBPACK_IMPORTED_MODULE_1__.ManualAddressPageRoutingModule,
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_views_manual-address_manual-address_module_ts.js.map