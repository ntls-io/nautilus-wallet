"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_views_wallet-access_wallet-access_module_ts"],{

/***/ 69107:
/*!*************************************************************!*\
  !*** ./src/app/components/pin-entry/pin-entry.component.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PinEntryComponent": () => (/* binding */ PinEntryComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 48163);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 31777);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var src_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/helpers/helpers */ 42289);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 38143);
var _PinEntryComponent_pinForm;









function PinEntryComponent_ion_text_8_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function PinEntryComponent_ion_text_8_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Please enter digits only (0-9)");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} }
function PinEntryComponent_ion_text_8_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" Too short (minimum ", ctx_r3.pinErrors.minlength.requiredLength, ") ");
} }
function PinEntryComponent_ion_text_8_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" Too long (maximum ", ctx_r4.pinErrors.maxlength.requiredLength, ") ");
} }
function PinEntryComponent_ion_text_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-text", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, PinEntryComponent_ion_text_8_div_1_Template, 2, 0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, PinEntryComponent_ion_text_8_div_2_Template, 2, 0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, PinEntryComponent_ion_text_8_div_3_Template, 2, 1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, PinEntryComponent_ion_text_8_div_4_Template, 2, 1, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.pinErrors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.pinErrors.pattern);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.pinErrors.minlength);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r0.pinErrors.maxlength);
} }
const _c0 = function (a0) { return { invalid: a0 }; };
class PinEntryComponent {
    constructor() {
        /** Emit the PIN confirmed by the user. */
        this.pinConfirmed = new _angular_core__WEBPACK_IMPORTED_MODULE_2__.EventEmitter();
        /** Minimum PIN length. */
        this.minLength = 4;
        /** Maximum PIN length. */
        this.maxLength = 10;
        /** Optional hook to disable autofocus. */
        this.autofocus = true;
        _PinEntryComponent_pinForm.set(this, void 0);
    }
    /** Safe accessor. */
    get pinForm() {
        return (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_0__.defined)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__classPrivateFieldGet)(this, _PinEntryComponent_pinForm, "f"), 'PinEntryComponent.pinForm accessed before ngOnInit');
    }
    /** Safe accessor. */
    get pinControl() {
        return (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_1__.checkClass)(this.pinForm.controls.pin, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl);
    }
    /** Safe accessor. */
    get pinErrors() {
        return this.pinControl.dirty && this.pinControl.invalid
            ? this.pinControl.errors
            : null;
    }
    ngOnInit() {
        this.initForm();
    }
    onSubmit() {
        const pinForm = (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_0__.defined)(this.pinForm);
        pinForm.markAllAsTouched();
        console.log('PinEntryComponent.onSubmit: ', { valid: pinForm.valid });
        if (pinForm.valid) {
            const { pin } = pinForm.value;
            this.pinConfirmed.emit(pin);
        }
    }
    initForm() {
        (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__classPrivateFieldSet)(this, _PinEntryComponent_pinForm, this.createPinForm(), "f");
        if (this.setInitialPinValue !== undefined) {
            this.pinControl.setValue(this.setInitialPinValue);
            this.pinControl.markAsDirty();
        }
    }
    createPinForm() {
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroup({
            pin: new _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControl('', {
                validators: [
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required,
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.minLength(this.minLength),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.maxLength(this.maxLength),
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.pattern(/^\d*$/),
                ],
            }),
        });
    }
}
_PinEntryComponent_pinForm = new WeakMap();
PinEntryComponent.ɵfac = function PinEntryComponent_Factory(t) { return new (t || PinEntryComponent)(); };
PinEntryComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: PinEntryComponent, selectors: [["app-pin-entry"]], inputs: { minLength: "minLength", maxLength: "maxLength", autofocus: "autofocus", setInitialPinValue: "setInitialPinValue" }, outputs: { pinConfirmed: "pinConfirmed" }, decls: 11, vars: 9, consts: [[1, "text-center"], [1, "inline-block", "w-auto", "m-auto"], ["name", "lock-closed-outline", 1, "!text-5xl"], [1, "font-semibold", "font-nasalization"], [3, "formGroup", "ngSubmit"], ["type", "password", "formControlName", "pin", "inputmode", "numeric", 3, "autofocus", "minlength", "maxlength", "ngClass"], ["color", "danger", 4, "ngIf"], ["expand", "block", "shape", "round", "type", "submit", 3, "disabled"], ["color", "danger"], [4, "ngIf"]], template: function PinEntryComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](2, "ion-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "h1", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Enter Pin");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "form", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function PinEntryComponent_Template_form_ngSubmit_5_listener() { return ctx.onSubmit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "ion-input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, PinEntryComponent_ion_text_8_Template, 5, 4, "ion-text", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "ion-button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, "Confirm");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.pinForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("autofocus", ctx.autofocus)("minlength", ctx.minLength)("maxlength", ctx.maxLength)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](7, _c0, ctx.pinErrors));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.pinErrors);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", !ctx.pinForm.valid);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonIcon, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonInput, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.TextValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.MinLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.MaxLengthValidator, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonButton], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwaW4tZW50cnkuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 59476:
/*!**********************************************************!*\
  !*** ./src/app/components/pin-entry/pin-entry.module.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PinEntryComponentModule": () => (/* binding */ PinEntryComponentModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 31777);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var _pin_entry_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pin-entry.component */ 69107);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);





class PinEntryComponentModule {
}
PinEntryComponentModule.ɵfac = function PinEntryComponentModule_Factory(t) { return new (t || PinEntryComponentModule)(); };
PinEntryComponentModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: PinEntryComponentModule });
PinEntryComponentModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](PinEntryComponentModule, { declarations: [_pin_entry_component__WEBPACK_IMPORTED_MODULE_0__.PinEntryComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule], exports: [_pin_entry_component__WEBPACK_IMPORTED_MODULE_0__.PinEntryComponent] }); })();


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

/***/ 87748:
/*!*********************************************************************!*\
  !*** ./src/app/views/wallet-access/wallet-access-routing.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WalletAccessPageRoutingModule": () => (/* binding */ WalletAccessPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _wallet_access_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wallet-access.page */ 65354);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);




const routes = [
    {
        path: '',
        component: _wallet_access_page__WEBPACK_IMPORTED_MODULE_0__.WalletAccessPage,
    },
];
class WalletAccessPageRoutingModule {
}
WalletAccessPageRoutingModule.ɵfac = function WalletAccessPageRoutingModule_Factory(t) { return new (t || WalletAccessPageRoutingModule)(); };
WalletAccessPageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: WalletAccessPageRoutingModule });
WalletAccessPageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](WalletAccessPageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 25503:
/*!*************************************************************!*\
  !*** ./src/app/views/wallet-access/wallet-access.module.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WalletAccessPageModule": () => (/* binding */ WalletAccessPageModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 31777);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_components_pin_entry_pin_entry_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/pin-entry/pin-entry.module */ 59476);
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ 72271);
/* harmony import */ var _wallet_access_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wallet-access-routing.module */ 87748);
/* harmony import */ var _wallet_access_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./wallet-access.page */ 65354);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51109);








class WalletAccessPageModule {
}
WalletAccessPageModule.ɵfac = function WalletAccessPageModule_Factory(t) { return new (t || WalletAccessPageModule)(); };
WalletAccessPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: WalletAccessPageModule });
WalletAccessPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            _wallet_access_routing_module__WEBPACK_IMPORTED_MODULE_2__.WalletAccessPageRoutingModule,
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
            src_app_components_pin_entry_pin_entry_module__WEBPACK_IMPORTED_MODULE_0__.PinEntryComponentModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](WalletAccessPageModule, { declarations: [_wallet_access_page__WEBPACK_IMPORTED_MODULE_3__.WalletAccessPage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
        _wallet_access_routing_module__WEBPACK_IMPORTED_MODULE_2__.WalletAccessPageRoutingModule,
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule,
        src_app_components_pin_entry_pin_entry_module__WEBPACK_IMPORTED_MODULE_0__.PinEntryComponentModule] }); })();


/***/ }),

/***/ 65354:
/*!***********************************************************!*\
  !*** ./src/app/views/wallet-access/wallet-access.page.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WalletAccessPage": () => (/* binding */ WalletAccessPage)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/core */ 16594);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var src_app_utils_loading_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/utils/loading.helpers */ 50271);
/* harmony import */ var _scanner_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../scanner.helpers */ 52347);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_state_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/state/session.service */ 5069);
/* harmony import */ var src_app_utils_notification_swal_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utils/notification/swal-helper */ 1733);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var src_app_components_header_header_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/components/header/header.component */ 43646);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 31777);
/* harmony import */ var _components_pin_entry_pin_entry_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../components/pin-entry/pin-entry.component */ 69107);















function WalletAccessPage_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "ion-button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function WalletAccessPage_ng_container_6_Template_ion_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return ctx_r2.openScanner();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2, "Access via QR Code ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](4, "OR");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
}

function WalletAccessPage_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 9)(1, "app-pin-entry", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("pinConfirmed", function WalletAccessPage_ng_template_11_Template_app_pin_entry_pinConfirmed_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      ctx_r4.isPinEntryOpen = false;
      return ctx_r4.onPinConfirmed($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}

class WalletAccessPage {
  constructor( // XXX: Capacitor.isPluginAvailable('Camera') depends on ScannerService, as a side effect.
  modalCtrl, sessionService, notification, router, loadingCtrl) {
    this.modalCtrl = modalCtrl;
    this.sessionService = sessionService;
    this.notification = notification;
    this.router = router;
    this.loadingCtrl = loadingCtrl;
    /** @see showPinEntryModal */

    this.isPinEntryOpen = false;
  }
  /** Validated {@link address}, or `undefined`. */


  get validatedAddress() {
    var _a;

    const trimmed = (_a = this.address) === null || _a === void 0 ? void 0 : _a.trim();
    return trimmed === '' ? undefined : trimmed;
  }

  ngOnInit() {
    // XXX: Capacitor.isPluginAvailable('Camera') depends on ScannerService, as a side effect.
    this.hasCamera = _capacitor_core__WEBPACK_IMPORTED_MODULE_1__.Capacitor.isPluginAvailable('Camera');
  }

  openScanner() {
    var _this = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield (0,_scanner_helpers__WEBPACK_IMPORTED_MODULE_4__.handleScan)(_this.modalCtrl, _this.notification.swal, _this.confirmAddress);
    })();
  }
  /** User clicked to confirm address: show PIN entry. */


  confirmAddress() {
    var _this2 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.validatedAddress !== undefined) {
        _this2.showPinEntryModal();
      } else {
        yield _this2.notification.swal.fire({
          icon: 'warning',
          title: 'Invalid Address',
          text: 'Please input a valid wallet address'
        });
      }
    })();
  }
  /** Show the PIN entry modal. */


  showPinEntryModal() {
    this.isPinEntryOpen = true;
  }
  /** User confirmed PIN: attempt to open wallet. */


  onPinConfirmed(pin) {
    var _this3 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const address = (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_2__.defined)(_this3.validatedAddress, 'WalletAccessPage.onPinConfirmed: unexpected invalid address');
      const openWalletErrorMessage = yield (0,src_app_utils_loading_helpers__WEBPACK_IMPORTED_MODULE_3__.withLoadingOverlayOpts)(_this3.loadingCtrl, {
        message: 'Opening wallet…'
      }, /*#__PURE__*/(0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
        return yield _this3.sessionService.openWallet(address, pin);
      }));

      if (openWalletErrorMessage !== undefined) {
        yield _this3.notification.swal.fire({
          icon: 'error',
          title: 'Open Wallet Failed',
          text: openWalletErrorMessage
        });
      } else {
        yield _this3.router.navigate(['/wallet']);
      }
    })();
  }

}

WalletAccessPage.ɵfac = function WalletAccessPage_Factory(t) {
  return new (t || WalletAccessPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_state_session_service__WEBPACK_IMPORTED_MODULE_5__.SessionService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_utils_notification_swal_helper__WEBPACK_IMPORTED_MODULE_6__.SwalHelper), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.LoadingController));
};

WalletAccessPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: WalletAccessPage,
  selectors: [["app-wallet-access"]],
  inputs: {
    isPinEntryOpen: "isPinEntryOpen"
  },
  decls: 12,
  vars: 4,
  consts: [[1, "ion-no-border"], ["fixed", "", 1, "h-full"], [1, "h-full", "content-around", "px-5"], ["size", "12", 1, "text-center"], [4, "ngIf"], ["placeholder", "Enter wallet address", 3, "ngModel", "ngModelChange"], ["expand", "block", "shape", "round", 1, "mt-4", 3, "disabled", "click"], [3, "isOpen", "didDismiss"], ["expand", "block", "shape", "round", 3, "click"], [1, "ion-page", "ion-justify-content-center", "ion-align-items-center"], [3, "pinConfirmed"]],
  template: function WalletAccessPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-header", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "app-header");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "ion-content")(3, "ion-grid", 1)(4, "ion-row", 2)(5, "ion-col", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](6, WalletAccessPage_ng_container_6_Template, 5, 0, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](7, "ion-textarea", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function WalletAccessPage_Template_ion_textarea_ngModelChange_7_listener($event) {
        return ctx.address = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](8, "ion-button", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function WalletAccessPage_Template_ion_button_click_8_listener() {
        return ctx.confirmAddress();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](9, "Confirm");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "ion-modal", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("didDismiss", function WalletAccessPage_Template_ion_modal_didDismiss_10_listener() {
        return ctx.isPinEntryOpen = false;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](11, WalletAccessPage_ng_template_11_Template, 2, 0, "ng-template");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.hasCamera);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx.address);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", !ctx.validatedAddress);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("isOpen", ctx.isPinEntryOpen);
    }
  },
  directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, src_app_components_header_header_component__WEBPACK_IMPORTED_MODULE_7__.HeaderComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonCol, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonTextarea, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.TextValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonModal, _components_pin_entry_pin_entry_component__WEBPACK_IMPORTED_MODULE_8__.PinEntryComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ3YWxsZXQtYWNjZXNzLnBhZ2Uuc2NzcyJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_views_wallet-access_wallet-access_module_ts.js.map