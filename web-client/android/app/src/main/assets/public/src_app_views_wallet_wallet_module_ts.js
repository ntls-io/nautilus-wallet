"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_views_wallet_wallet_module_ts"],{

/***/ 97473:
/*!***********************************************************************************!*\
  !*** ./src/app/components/balance-summary-card/balance-summary-card.component.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BalanceSummaryCardComponent": () => (/* binding */ BalanceSummaryCardComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var src_app_pipes_asset_amount_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/pipes/asset-amount.pipe */ 44416);
/* harmony import */ var src_app_pipes_asset_symbol_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/pipes/asset-symbol.pipe */ 16572);





function BalanceSummaryCardComponent_ng_container_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "ion-row", 4)(2, "ion-col", 5)(3, "ion-text", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](5, "assetAmount");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "ion-col", 7)(7, "ion-text", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](9, "assetSymbol");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const balance_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](5, 2, balance_r1), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](9, 4, balance_r1), " ");
} }
class BalanceSummaryCardComponent {
    constructor() { }
    ngOnInit() { }
}
BalanceSummaryCardComponent.ɵfac = function BalanceSummaryCardComponent_Factory(t) { return new (t || BalanceSummaryCardComponent)(); };
BalanceSummaryCardComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: BalanceSummaryCardComponent, selectors: [["app-balance-summary-card"]], inputs: { balances: "balances" }, decls: 8, vars: 1, consts: [[1, "app-item", "ion-text-center"], [1, "font-nasalization"], ["lines", "none"], [4, "ngFor", "ngForOf"], [1, "ion-align-items-center"], ["size", "7", 1, "ion-text-end"], ["color", "white", 1, "text-2xl", "font-audiowide"], ["size", "5", 1, "ion-text-start"], ["color", "secondary", 1, "font-bold"]], template: function BalanceSummaryCardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-card", 0)(1, "ion-card-header")(2, "ion-card-title", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Balances");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "ion-card-content")(5, "ion-list", 2)(6, "ion-grid");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, BalanceSummaryCardComponent_ng_container_7_Template, 10, 6, "ng-container", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.balances);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCardHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCardTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCardContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonGrid, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonText], pipes: [src_app_pipes_asset_amount_pipe__WEBPACK_IMPORTED_MODULE_0__.AssetAmountPipe, src_app_pipes_asset_symbol_pipe__WEBPACK_IMPORTED_MODULE_1__.AssetSymbolPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJiYWxhbmNlLXN1bW1hcnktY2FyZC5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ 14513:
/*!********************************************************************************!*\
  !*** ./src/app/components/balance-summary-card/balance-summary-card.module.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BalanceSummaryCardComponentModule": () => (/* binding */ BalanceSummaryCardComponentModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_pipes_asset_pipes_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/pipes/asset-pipes.module */ 53631);
/* harmony import */ var _balance_summary_card_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./balance-summary-card.component */ 97473);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51109);





class BalanceSummaryCardComponentModule {
}
BalanceSummaryCardComponentModule.ɵfac = function BalanceSummaryCardComponentModule_Factory(t) { return new (t || BalanceSummaryCardComponentModule)(); };
BalanceSummaryCardComponentModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: BalanceSummaryCardComponentModule });
BalanceSummaryCardComponentModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, src_app_pipes_asset_pipes_module__WEBPACK_IMPORTED_MODULE_0__.AssetPipesModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](BalanceSummaryCardComponentModule, { declarations: [_balance_summary_card_component__WEBPACK_IMPORTED_MODULE_1__.BalanceSummaryCardComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, src_app_pipes_asset_pipes_module__WEBPACK_IMPORTED_MODULE_0__.AssetPipesModule], exports: [_balance_summary_card_component__WEBPACK_IMPORTED_MODULE_1__.BalanceSummaryCardComponent] }); })();


/***/ }),

/***/ 404:
/*!***************************************************************************!*\
  !*** ./src/app/components/pure-wallet-page/pure-wallet-page.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PureWalletPageComponent": () => (/* binding */ PureWalletPageComponent)
/* harmony export */ });
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ 63153);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fortawesome/angular-fontawesome */ 25141);
/* harmony import */ var _balance_summary_card_balance_summary_card_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../balance-summary-card/balance-summary-card.component */ 97473);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_components_action_item_action_item_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/action-item/action-item.component */ 60073);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 38143);







function PureWalletPageComponent_app_action_item_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-action-item", 10);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx_r0.icons.faDonate)("url", ctx_r0.actionTopUpUrl);
} }
function PureWalletPageComponent_app_action_item_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-action-item", 11);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx_r1.icons.faFingerprint);
} }
function PureWalletPageComponent_app_action_item_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-action-item", 12);
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx_r2.icons.faHandHoldingUsd)("url", ctx_r2.actionWithdrawUrl);
} }
function PureWalletPageComponent_app_action_item_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-action-item", 13);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx_r3.icons.faReceipt)("url", ctx_r3.actionMyTransactionsUrl);
} }
/**
 * @see WalletPage
 */
class PureWalletPageComponent {
    constructor() {
        // Naming convention: Prefix action item parameters with "action".
        /** "Send Money" action: Enabled? */
        this.actionSendMoneyEnabled = true;
        /** "Receive" action: Enabled? */
        this.actionReceiveEnabled = false;
        this.icons = ICONS;
    }
    ngOnInit() { }
}
PureWalletPageComponent.ɵfac = function PureWalletPageComponent_Factory(t) { return new (t || PureWalletPageComponent)(); };
PureWalletPageComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: PureWalletPageComponent, selectors: [["app-pure-wallet-page"]], inputs: { name: "name", balances: "balances", actionSendMoneyEnabled: "actionSendMoneyEnabled", actionTopUpUrl: "actionTopUpUrl", actionVerifyProfileShown: "actionVerifyProfileShown", actionWithdrawUrl: "actionWithdrawUrl", actionReceiveEnabled: "actionReceiveEnabled", actionMyTransactionsUrl: "actionMyTransactionsUrl" }, decls: 14, vars: 11, consts: [[1, "ion-text-center", "p-2"], ["size", "5x", 3, "icon"], [1, "font-semibold", "font-nasalization"], [3, "balances"], ["title", "Send Money", "path", "/wallet/send-funds", 3, "icon", "disabled"], ["title", "Top Up Wallet", 3, "icon", "url", 4, "ngIf"], ["title", "Verify Profile", "path", "/kyc", 3, "icon", 4, "ngIf"], ["title", "Withdraw", 3, "icon", "url", 4, "ngIf"], ["title", "Receive", "path", "/wallet/receive", 3, "icon", "disabled"], ["title", "My Transactions", 3, "icon", "url", 4, "ngIf"], ["title", "Top Up Wallet", 3, "icon", "url"], ["title", "Verify Profile", "path", "/kyc", 3, "icon"], ["title", "Withdraw", 3, "icon", "url"], ["title", "My Transactions", 3, "icon", "url"]], template: function PureWalletPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "fa-icon", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h1", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "Send or receive money quickly and easily, select an option below");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "app-balance-summary-card", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "ion-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](8, "app-action-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](9, PureWalletPageComponent_app_action_item_9_Template, 1, 2, "app-action-item", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](10, PureWalletPageComponent_app_action_item_10_Template, 1, 1, "app-action-item", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, PureWalletPageComponent_app_action_item_11_Template, 1, 2, "app-action-item", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "app-action-item", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, PureWalletPageComponent_app_action_item_13_Template, 1, 2, "app-action-item", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx.icons.faWallet);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("", ctx.name, "'s Wallet");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("balances", ctx.balances);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx.icons.faCreditCard)("disabled", !ctx.actionSendMoneyEnabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.actionTopUpUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.actionVerifyProfileShown);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.actionWithdrawUrl);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("icon", ctx.icons.faQrcode)("disabled", !ctx.actionReceiveEnabled);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.actionMyTransactionsUrl);
    } }, directives: [_fortawesome_angular_fontawesome__WEBPACK_IMPORTED_MODULE_3__.FaIconComponent, _balance_summary_card_balance_summary_card_component__WEBPACK_IMPORTED_MODULE_0__.BalanceSummaryCardComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonList, src_app_components_action_item_action_item_component__WEBPACK_IMPORTED_MODULE_1__.ActionItemComponent, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwdXJlLXdhbGxldC1wYWdlLmNvbXBvbmVudC5zY3NzIn0= */"] });
// Placeholder icons until we get definite ones.
const ICONS = {
    faCreditCard: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faCreditCard,
    faDonate: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faDonate,
    faFingerprint: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faFingerprint,
    faHandHoldingUsd: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faHandHoldingUsd,
    faQrcode: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faQrcode,
    faReceipt: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faReceipt,
    faWallet: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_6__.faWallet,
};


/***/ }),

/***/ 20549:
/*!************************************************************************!*\
  !*** ./src/app/components/pure-wallet-page/pure-wallet-page.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PureWalletPageComponentModule": () => (/* binding */ PureWalletPageComponentModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_components_balance_summary_card_balance_summary_card_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/balance-summary-card/balance-summary-card.module */ 14513);
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ 72271);
/* harmony import */ var _pure_wallet_page_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pure-wallet-page.component */ 404);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51109);






class PureWalletPageComponentModule {
}
PureWalletPageComponentModule.ɵfac = function PureWalletPageComponentModule_Factory(t) { return new (t || PureWalletPageComponentModule)(); };
PureWalletPageComponentModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: PureWalletPageComponentModule });
PureWalletPageComponentModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
            src_app_components_balance_summary_card_balance_summary_card_module__WEBPACK_IMPORTED_MODULE_0__.BalanceSummaryCardComponentModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](PureWalletPageComponentModule, { declarations: [_pure_wallet_page_component__WEBPACK_IMPORTED_MODULE_2__.PureWalletPageComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
        src_app_components_balance_summary_card_balance_summary_card_module__WEBPACK_IMPORTED_MODULE_0__.BalanceSummaryCardComponentModule], exports: [_pure_wallet_page_component__WEBPACK_IMPORTED_MODULE_2__.PureWalletPageComponent] }); })();


/***/ }),

/***/ 89581:
/*!*******************************************************!*\
  !*** ./src/app/views/wallet/wallet-routing.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routes": () => (/* binding */ routes),
/* harmony export */   "WalletPageRoutingModule": () => (/* binding */ WalletPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _wallet_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wallet.page */ 21781);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);




const routes = [
    {
        path: '',
        component: _wallet_page__WEBPACK_IMPORTED_MODULE_0__.WalletPage,
    },
    {
        path: 'send-funds',
        loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_views_scanner_scanner_page_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_views_send-funds_send-funds_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ../send-funds/send-funds.module */ 44725)).then((m) => m.SendFundsPageModule),
    },
    {
        path: 'receive',
        loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_views_receive_receive_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../receive/receive.module */ 6690)).then((m) => m.ReceivePageModule),
    },
];
class WalletPageRoutingModule {
}
WalletPageRoutingModule.ɵfac = function WalletPageRoutingModule_Factory(t) { return new (t || WalletPageRoutingModule)(); };
WalletPageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: WalletPageRoutingModule });
WalletPageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](WalletPageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 2965:
/*!***********************************************!*\
  !*** ./src/app/views/wallet/wallet.module.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WalletPageModule": () => (/* binding */ WalletPageModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_components_pure_wallet_page_pure_wallet_page_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/pure-wallet-page/pure-wallet-page.module */ 20549);
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ 72271);
/* harmony import */ var _wallet_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wallet-routing.module */ 89581);
/* harmony import */ var _wallet_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wallet.page */ 21781);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51109);







class WalletPageModule {
}
WalletPageModule.ɵfac = function WalletPageModule_Factory(t) { return new (t || WalletPageModule)(); };
WalletPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: WalletPageModule });
WalletPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _wallet_routing_module__WEBPACK_IMPORTED_MODULE_2__.WalletPageRoutingModule,
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
            src_app_components_pure_wallet_page_pure_wallet_page_module__WEBPACK_IMPORTED_MODULE_0__.PureWalletPageComponentModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](WalletPageModule, { declarations: [_wallet_page__WEBPACK_IMPORTED_MODULE_3__.WalletPage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
        _wallet_routing_module__WEBPACK_IMPORTED_MODULE_2__.WalletPageRoutingModule,
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
        src_app_components_pure_wallet_page_pure_wallet_page_module__WEBPACK_IMPORTED_MODULE_0__.PureWalletPageComponentModule], exports: [_wallet_page__WEBPACK_IMPORTED_MODULE_3__.WalletPage] }); })();


/***/ }),

/***/ 21781:
/*!*********************************************!*\
  !*** ./src/app/views/wallet/wallet.page.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WalletPage": () => (/* binding */ WalletPage)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 53886);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 64736);
/* harmony import */ var src_app_services_xrpl_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/xrpl.utils */ 68170);
/* harmony import */ var src_app_utils_console_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/utils/console.helpers */ 6350);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var src_app_utils_loading_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/utils/loading.helpers */ 50271);
/* harmony import */ var src_app_utils_toast_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/utils/toast.helpers */ 46134);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_state_session_query__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/state/session.query */ 55545);
/* harmony import */ var src_app_state_session_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/state/session.service */ 5069);
/* harmony import */ var src_app_state_session_algorand_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/state/session-algorand.service */ 17956);
/* harmony import */ var src_app_state_session_xrpl_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/state/session-xrpl.service */ 36187);
/* harmony import */ var src_app_utils_notification_swal_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/utils/notification/swal-helper */ 1733);
/* harmony import */ var src_app_components_header_header_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/components/header/header.component */ 43646);
/* harmony import */ var _components_pure_wallet_page_pure_wallet_page_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../components/pure-wallet-page/pure-wallet-page.component */ 404);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 38143);


















/**
 * @see PureWalletPageComponent
 */

class WalletPage {
  constructor(loadingController, sessionQuery, sessionService, sessionAlgorandService, sessionXrplService, toastCtrl, notification) {
    this.loadingController = loadingController;
    this.sessionQuery = sessionQuery;
    this.sessionService = sessionService;
    this.sessionAlgorandService = sessionAlgorandService;
    this.sessionXrplService = sessionXrplService;
    this.toastCtrl = toastCtrl;
    this.notification = notification;
    /** (Optional) Hook to override environment setting, if given. */

    this.requireKycBeforeSendPayment = src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment === null || src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment === void 0 ? void 0 : src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.requireOnfidoCheckBeforeSendPayment;
    /** Active wallet owner's name. */

    this.name = this.sessionQuery.name;
    /** Active wallet's balances. */

    this.balances = this.sessionQuery.allBalances;
    /**
     * Enable the "Send Money" action if both:
     * - KYC status is either cleared or not required
     * - At least one balance is available
     */

    this.actionSendMoneyEnabled = (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.combineLatest)(this.sessionQuery.onfidoCheckIsClear, this.sessionQuery.allBalances).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.map)(([onfidoCheckIsClear, assetAmounts]) => (onfidoCheckIsClear || !this.requireKycBeforeSendPayment) && assetAmounts.length > 0));
    /** Show the "Verify Profile" if KYC status is not cleared. */

    this.actionVerifyProfileShown = this.sessionQuery.onfidoCheckIsClear.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.map)(onfidoCheckIsClear => !onfidoCheckIsClear));
  }
  /**
   * When the wallet first displays, perform opportunistic asset opt-in.
   */


  ngOnInit() {
    var _this = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.refreshWalletData();
    })();
  }

  onRefresh() {
    var _this2 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield (0,src_app_utils_loading_helpers__WEBPACK_IMPORTED_MODULE_4__.withLoadingOverlayOpts)(_this2.loadingController, {
        message: 'Refreshing…'
      }, /*#__PURE__*/(0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        return yield _this2.refreshWalletData();
      }));
    })();
  }

  refreshWalletData() {
    var _this3 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield (0,src_app_utils_console_helpers__WEBPACK_IMPORTED_MODULE_2__.withConsoleGroup)('WalletPage.refreshWalletData:', /*#__PURE__*/(0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        yield (0,src_app_utils_console_helpers__WEBPACK_IMPORTED_MODULE_2__.withConsoleGroupCollapsed)('Loading wallet data', /*#__PURE__*/(0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          yield Promise.all([(0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
            yield _this3.sessionAlgorandService.loadAccountData();
            yield _this3.sessionAlgorandService.loadAssetParams();
          })(), _this3.sessionXrplService.loadAccountData(), _this3.sessionService.loadOnfidoCheck()]);
        }));
        yield (0,src_app_utils_console_helpers__WEBPACK_IMPORTED_MODULE_2__.withConsoleGroupCollapsed)('Checking asset / token opt-ins', /*#__PURE__*/(0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
          yield _this3.checkAlgorandAssetOptIn();
          yield _this3.checkXrplTokenOptIns();
        }));
        console.log('Done.');
      }));
    })();
  }
  /**
   * Perform opportunistic Algorand asset opt-in.
   *
   * - If there's no Algo balance, show a suggestion to deposit.
   * - If the account has an Algo balance but no asset balance, attempt to send an asset opt-in.
   */


  checkAlgorandAssetOptIn() {
    var _this4 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this4.sessionQuery.hasAlgorandBalance() && // FIXME: Remove
      src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.defaultAlgorandAssetId) {
        const assetId = (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_3__.defined)(src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.defaultAlgorandAssetId);

        if (!_this4.sessionQuery.hasAlgorandAssetBalance(assetId)) {
          const sending = yield _this4.toast('Sending asset opt-in…');

          try {
            yield _this4.sessionAlgorandService.sendAssetOptIn(assetId);
          } catch (err) {
            yield sending.dismiss();
            yield _this4.errorNotification('Asset opt-in failed', err);
            return;
          }

          yield _this4.toast('Asset opt-in successful.');
        }
      }
    })();
  }
  /**
   * Perform opportunistic XRPL token opt-in.
   */


  checkXrplTokenOptIns() {
    var _this5 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this5.sessionQuery.hasXrpBalance()) {
        const txResponses = yield _this5.sessionXrplService.checkTrustlineOptIns();
        const unsuccessfulResponses = txResponses.filter(txResponse => {
          const {
            succeeded
          } = (0,src_app_services_xrpl_utils__WEBPACK_IMPORTED_MODULE_1__.checkTxResponseSucceeded)(txResponse);
          return !succeeded;
        });

        if (0 < unsuccessfulResponses.length) {
          console.log('WalletPage.checkXrplTokenOptIns: unsuccessful responses:', {
            unsuccessfulResponses
          });
          const errorMessage = unsuccessfulResponses.map(txResponse => {
            const {
              resultCode
            } = (0,src_app_services_xrpl_utils__WEBPACK_IMPORTED_MODULE_1__.checkTxResponseSucceeded)(txResponse);
            return resultCode;
          }).join('\n');
          yield _this5.errorNotification('XRPL token opt-in failed', errorMessage);
        }
      }
    })();
  }

  toast(message) {
    var _this6 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return (0,src_app_utils_toast_helpers__WEBPACK_IMPORTED_MODULE_5__.showToast)(_this6.toastCtrl, message, {
        duration: 5000
      });
    })();
  }

  errorNotification(titleText, err) {
    var _this7 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      var _a, _b, _c, _d, _e;

      const text = (_e = (_c = (_b = (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.message) !== null && _c !== void 0 ? _c : (_d = err === null || err === void 0 ? void 0 : err.response) === null || _d === void 0 ? void 0 : _d.body) !== null && _e !== void 0 ? _e : err;
      console.error('WalletPage.withAlertErrors caught', {
        err
      });
      yield _this7.notification.swal.fire({
        icon: 'error',
        titleText,
        text
      });
    })();
  }

}

WalletPage.ɵfac = function WalletPage_Factory(t) {
  return new (t || WalletPage)(_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_17__.LoadingController), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](src_app_state_session_query__WEBPACK_IMPORTED_MODULE_7__.SessionQuery), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](src_app_state_session_service__WEBPACK_IMPORTED_MODULE_8__.SessionService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](src_app_state_session_algorand_service__WEBPACK_IMPORTED_MODULE_9__.SessionAlgorandService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](src_app_state_session_xrpl_service__WEBPACK_IMPORTED_MODULE_10__.SessionXrplService), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_17__.ToastController), _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdirectiveInject"](src_app_utils_notification_swal_helper__WEBPACK_IMPORTED_MODULE_11__.SwalHelper));
};

WalletPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineComponent"]({
  type: WalletPage,
  selectors: [["app-wallet"]],
  inputs: {
    requireKycBeforeSendPayment: "requireKycBeforeSendPayment"
  },
  decls: 12,
  vars: 12,
  consts: [[1, "ion-no-border"], ["slot", "end"], [3, "click"], ["fixed", ""], [3, "name", "balances", "actionSendMoneyEnabled", "actionVerifyProfileShown"]],
  template: function WalletPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](0, "ion-header", 0)(1, "app-header")(2, "ion-buttons", 1)(3, "ion-button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵlistener"]("click", function WalletPage_Template_ion_button_click_3_listener() {
        return ctx.onRefresh();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵtext"](4, "Refresh");
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementStart"](5, "ion-content")(6, "ion-grid", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelement"](7, "app-pure-wallet-page", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](8, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](9, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](10, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipe"](11, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵelementEnd"]()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵproperty"]("name", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](8, 4, ctx.name))("balances", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](9, 6, ctx.balances))("actionSendMoneyEnabled", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](10, 8, ctx.actionSendMoneyEnabled))("actionVerifyProfileShown", _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵpipeBind1"](11, 10, ctx.actionVerifyProfileShown));
    }
  },
  directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonHeader, src_app_components_header_header_component__WEBPACK_IMPORTED_MODULE_12__.HeaderComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_17__.IonGrid, _components_pure_wallet_page_pure_wallet_page_component__WEBPACK_IMPORTED_MODULE_13__.PureWalletPageComponent],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_18__.AsyncPipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ3YWxsZXQucGFnZS5zY3NzIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_views_wallet_wallet_module_ts.js.map