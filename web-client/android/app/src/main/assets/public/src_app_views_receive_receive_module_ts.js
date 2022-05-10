"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_views_receive_receive_module_ts"],{

/***/ 13785:
/*!*********************************************************!*\
  !*** ./src/app/views/receive/receive-routing.module.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReceivePageRoutingModule": () => (/* binding */ ReceivePageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _receive_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./receive.page */ 89392);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);




const routes = [
    {
        path: '',
        component: _receive_page__WEBPACK_IMPORTED_MODULE_0__.ReceivePage,
    },
];
class ReceivePageRoutingModule {
}
ReceivePageRoutingModule.ɵfac = function ReceivePageRoutingModule_Factory(t) { return new (t || ReceivePageRoutingModule)(); };
ReceivePageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: ReceivePageRoutingModule });
ReceivePageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ReceivePageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 6690:
/*!*************************************************!*\
  !*** ./src/app/views/receive/receive.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReceivePageModule": () => (/* binding */ ReceivePageModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 31777);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ 72271);
/* harmony import */ var _receive_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./receive-routing.module */ 13785);
/* harmony import */ var _receive_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./receive.page */ 89392);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51109);







class ReceivePageModule {
}
ReceivePageModule.ɵfac = function ReceivePageModule_Factory(t) { return new (t || ReceivePageModule)(); };
ReceivePageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: ReceivePageModule });
ReceivePageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _receive_routing_module__WEBPACK_IMPORTED_MODULE_1__.ReceivePageRoutingModule,
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ReceivePageModule, { declarations: [_receive_page__WEBPACK_IMPORTED_MODULE_2__.ReceivePage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
        _receive_routing_module__WEBPACK_IMPORTED_MODULE_1__.ReceivePageRoutingModule,
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule] }); })();


/***/ }),

/***/ 89392:
/*!***********************************************!*\
  !*** ./src/app/views/receive/receive.page.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReceivePage": () => (/* binding */ ReceivePage)
/* harmony export */ });
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ 63153);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_components_header_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/header/header.component */ 43646);
/* harmony import */ var angularx_qrcode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angularx-qrcode */ 73501);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var src_app_components_action_item_action_item_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/action-item/action-item.component */ 60073);







function ReceivePage_app_action_item_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-action-item", 8);
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("preTitle", item_r1.preTitle)("title", item_r1.title)("icon", item_r1.icon)("disabled", item_r1.disabled);
} }
class ReceivePage {
    constructor() {
        this.actionItems = [
            {
                preTitle: 'Connect & receive money',
                title: 'Share link to connect',
                icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_3__.faLink,
                disabled: true,
            },
        ];
    }
    ngOnInit() { }
}
ReceivePage.ɵfac = function ReceivePage_Factory(t) { return new (t || ReceivePage)(); };
ReceivePage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ReceivePage, selectors: [["app-receive"]], decls: 15, vars: 4, consts: [[1, "ion-no-border"], ["fixed", ""], [1, "ion-text-center"], [1, "font-semibold", "font-nasalization"], ["color", "white", 1, "mx-3", "my-0"], ["color", "tertiary", 1, "text-2xl", "font-bold"], ["errorCorrectionLevel", "H", "elementType", "img", 3, "qrdata", "width", "margin"], [3, "preTitle", "title", "icon", "disabled", 4, "ngFor", "ngForOf"], [3, "preTitle", "title", "icon", "disabled"]], template: function ReceivePage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "ion-content")(3, "ion-grid", 1)(4, "div", 2)(5, "h1", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Receive");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "ion-card", 4)(8, "ion-card-header", 2)(9, "ion-text", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Scan to pay me ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "ion-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "qrcode", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "ion-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](14, ReceivePage_app_action_item_14_Template, 1, 4, "app-action-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("qrdata", "Your data string")("width", 1000)("margin", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.actionItems);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonHeader, src_app_components_header_header_component__WEBPACK_IMPORTED_MODULE_0__.HeaderComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonCardHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonCardContent, angularx_qrcode__WEBPACK_IMPORTED_MODULE_5__.QRCodeComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonList, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, src_app_components_action_item_action_item_component__WEBPACK_IMPORTED_MODULE_1__.ActionItemComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZWNlaXZlLnBhZ2Uuc2NzcyJ9 */"] });


/***/ })

}]);
//# sourceMappingURL=src_app_views_receive_receive_module_ts.js.map