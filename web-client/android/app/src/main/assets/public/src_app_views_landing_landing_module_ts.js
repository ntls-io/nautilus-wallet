"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_views_landing_landing_module_ts"],{

/***/ 45018:
/*!*********************************************************!*\
  !*** ./src/app/views/landing/landing-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LandingPageRoutingModule": () => (/* binding */ LandingPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _landing_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./landing.page */ 59492);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);




const routes = [
    {
        path: '',
        component: _landing_page__WEBPACK_IMPORTED_MODULE_0__.LandingPage,
    },
];
class LandingPageRoutingModule {
}
LandingPageRoutingModule.ɵfac = function LandingPageRoutingModule_Factory(t) { return new (t || LandingPageRoutingModule)(); };
LandingPageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: LandingPageRoutingModule });
LandingPageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](LandingPageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 42494:
/*!*************************************************!*\
  !*** ./src/app/views/landing/landing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LandingPageModule": () => (/* binding */ LandingPageModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 31777);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var _ngneat_transloco__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngneat/transloco */ 12725);
/* harmony import */ var _landing_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./landing-routing.module */ 45018);
/* harmony import */ var _landing_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./landing.page */ 59492);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51109);







class LandingPageModule {
}
LandingPageModule.ɵfac = function LandingPageModule_Factory(t) { return new (t || LandingPageModule)(); };
LandingPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: LandingPageModule });
LandingPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            _landing_routing_module__WEBPACK_IMPORTED_MODULE_0__.LandingPageRoutingModule,
            _ngneat_transloco__WEBPACK_IMPORTED_MODULE_6__.TranslocoModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](LandingPageModule, { declarations: [_landing_page__WEBPACK_IMPORTED_MODULE_1__.LandingPage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
        _landing_routing_module__WEBPACK_IMPORTED_MODULE_0__.LandingPageRoutingModule,
        _ngneat_transloco__WEBPACK_IMPORTED_MODULE_6__.TranslocoModule] }); })();


/***/ }),

/***/ 59492:
/*!***********************************************!*\
  !*** ./src/app/views/landing/landing.page.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LandingPage": () => (/* binding */ LandingPage)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var _datorama_akita__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datorama/akita */ 17898);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _ngneat_transloco__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngneat/transloco */ 12725);







class LandingPage {
  constructor(modalCtrl) {
    this.modalCtrl = modalCtrl;
    checkResetStores();
  }

  ngOnInit() {
    var _this = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // XXX: Modal closing code from GlobalErrorHandler
      const topModal = yield _this.modalCtrl.getTop();

      if (topModal) {
        console.log('LandingPage: found stray top modal, attempting to dismiss:', topModal);
        yield _this.modalCtrl.dismiss();
      }

      checkResetStores();
    })();
  }

  ionViewDidEnter() {
    checkResetStores();
  }

}

LandingPage.ɵfac = function LandingPage_Factory(t) {
  return new (t || LandingPage)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.ModalController));
};

LandingPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: LandingPage,
  selectors: [["app-landing"]],
  decls: 12,
  vars: 0,
  consts: [["fixed", "", 1, "h-full"], [1, "h-full", "content-around", "px-5"], ["size", "12"], ["src", "assets/img/logo-icon.svg", 1, "block", "mx-auto", "w-3/5"], ["src", "assets/img/logo-title.svg", 1, "block", "mx-auto"], ["expand", "block", "shape", "round", "routerLink", "/register", "transloco", "LANDING.create"], ["expand", "block", "shape", "round", "color", "white", "fill", "outline", "routerLink", "/wallet-access", "transloco", "LANDING.open"], [1, "ion-text-center"]],
  template: function LandingPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-content")(1, "ion-grid", 0)(2, "ion-row", 1)(3, "ion-col", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](4, "img", 3)(5, "img", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-col", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "ion-button", 5)(8, "ion-button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](9, "ion-col", 2)(10, "p", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Terms & Conditions apply");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
    }
  },
  directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.RouterLinkDelegate, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _ngneat_transloco__WEBPACK_IMPORTED_MODULE_6__.TranslocoDirective],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJsYW5kaW5nLnBhZ2Uuc2NzcyJ9 */"]
});
/**
 * Reset Akita state with {@link resetStores}, unless configured with {@link environment.persistAkitaState}.
 */

const checkResetStores = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.persistAkitaState ? () => {} : () => (0,_datorama_akita__WEBPACK_IMPORTED_MODULE_1__.resetStores)();

/***/ })

}]);
//# sourceMappingURL=src_app_views_landing_landing_module_ts.js.map