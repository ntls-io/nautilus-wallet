"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_views_pay_pay_module_ts"],{

/***/ 10564:
/*!*******************************************************************************!*\
  !*** ./src/app/components/pay-amount-confirm/pay-amount-confirm.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PayAmountConfirmComponent": () => (/* binding */ PayAmountConfirmComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var src_app_utils_assets_assets_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/utils/assets/assets.common */ 95844);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/helpers/helpers */ 42289);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_components_pay_from_to_pay_from_to_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/components/pay-from-to/pay-from-to.component */ 87420);
/* harmony import */ var _pay_amount_form_pay_amount_form_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../pay-amount-form/pay-amount-form.component */ 942);








/**
 * Show a summary of a user balance and recipient address,
 * and capture an amount to pay to the recipient.
 *
 * This combines {@link PayFromToComponent} and {@link PayAmountFormComponent}.
 */
class PayAmountConfirmComponent {
    constructor() {
        /**
         * Emit the amount confirmed by the user.
         * This will be in the same asset / currency as {@link this.balance}
         */
        this.amountConfirmed = new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter();
        /** @see PayAmountFormComponent.autofocus */
        this.autofocus = true;
    }
    /** Limit the available balance by the transaction limit, if defined. */
    get maxAmount() {
        return (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_2__.ifDefined)(this.balance, (balance) => this.transactionLimit !== undefined && this.transactionLimit !== null
            ? Math.min(balance.amount, this.transactionLimit)
            : balance.amount);
    }
    ngOnInit() { }
    /** Associate the submitted amount with the balance's asset info, and emit. */
    onAmountSubmitted(amount) {
        var _a;
        const balance = (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_1__.defined)((_a = this.balance) !== null && _a !== void 0 ? _a : undefined, 'PayAmountConfirmComponent.onAmountSubmitted: unexpected undefined: this.balance');
        const assetAmount = (0,src_app_utils_assets_assets_common__WEBPACK_IMPORTED_MODULE_0__.assetAmountFromBase)(amount, balance);
        // TODO: Confirmation dialog?
        this.amountConfirmed.emit(assetAmount);
    }
}
PayAmountConfirmComponent.ɵfac = function PayAmountConfirmComponent_Factory(t) { return new (t || PayAmountConfirmComponent)(); };
PayAmountConfirmComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: PayAmountConfirmComponent, selectors: [["app-pay-amount-confirm"]], inputs: { name: "name", balance: "balance", receiverAddress: "receiverAddress", transactionLimit: "transactionLimit", autofocus: "autofocus", setInitialAmountValue: "setInitialAmountValue" }, outputs: { amountConfirmed: "amountConfirmed" }, decls: 11, vars: 6, consts: [[3, "name", "balance", "receiverAddress"], [1, "ion-margin"], [3, "maxAmount", "autofocus", "setInitialAmountValue", "amountSubmitted"], [1, "text-sm", "text-center"]], template: function PayAmountConfirmComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-grid")(1, "ion-row")(2, "ion-col");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "app-pay-from-to", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "ion-row")(5, "ion-col")(6, "div", 1)(7, "app-pay-amount-form", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("amountSubmitted", function PayAmountConfirmComponent_Template_app_pay_amount_form_amountSubmitted_7_listener($event) { return ctx.onAmountSubmitted($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, " Please check payment amount carefully. Transaction fees ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, " apply. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", ctx.name)("balance", ctx.balance)("receiverAddress", ctx.receiverAddress);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("maxAmount", ctx.maxAmount)("autofocus", ctx.autofocus)("setInitialAmountValue", ctx.setInitialAmountValue);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonCol, src_app_components_pay_from_to_pay_from_to_component__WEBPACK_IMPORTED_MODULE_3__.PayFromToComponent, _pay_amount_form_pay_amount_form_component__WEBPACK_IMPORTED_MODULE_4__.PayAmountFormComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXktYW1vdW50LWNvbmZpcm0uY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 29158:
/*!****************************************************************************!*\
  !*** ./src/app/components/pay-amount-confirm/pay-amount-confirm.module.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PayAmountConfirmComponentModule": () => (/* binding */ PayAmountConfirmComponentModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_components_pay_amount_form_pay_amount_form_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/pay-amount-form/pay-amount-form.module */ 12453);
/* harmony import */ var src_app_components_pay_from_to_pay_from_to_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/pay-from-to/pay-from-to.module */ 5675);
/* harmony import */ var _pay_amount_confirm_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pay-amount-confirm.component */ 10564);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51109);






class PayAmountConfirmComponentModule {
}
PayAmountConfirmComponentModule.ɵfac = function PayAmountConfirmComponentModule_Factory(t) { return new (t || PayAmountConfirmComponentModule)(); };
PayAmountConfirmComponentModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: PayAmountConfirmComponentModule });
PayAmountConfirmComponentModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            src_app_components_pay_from_to_pay_from_to_module__WEBPACK_IMPORTED_MODULE_1__.PayFromToModule,
            src_app_components_pay_amount_form_pay_amount_form_module__WEBPACK_IMPORTED_MODULE_0__.PayAmountFormComponentModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](PayAmountConfirmComponentModule, { declarations: [_pay_amount_confirm_component__WEBPACK_IMPORTED_MODULE_2__.PayAmountConfirmComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
        src_app_components_pay_from_to_pay_from_to_module__WEBPACK_IMPORTED_MODULE_1__.PayFromToModule,
        src_app_components_pay_amount_form_pay_amount_form_module__WEBPACK_IMPORTED_MODULE_0__.PayAmountFormComponentModule], exports: [_pay_amount_confirm_component__WEBPACK_IMPORTED_MODULE_2__.PayAmountConfirmComponent] }); })();


/***/ }),

/***/ 942:
/*!*************************************************************************!*\
  !*** ./src/app/components/pay-amount-form/pay-amount-form.component.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PayAmountFormComponent": () => (/* binding */ PayAmountFormComponent)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 48163);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 31777);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var src_app_utils_validators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/utils/validators */ 90895);
/* harmony import */ var src_helpers_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/helpers/helpers */ 42289);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 38143);


var _PayAmountFormComponent_paymentForm;












function PayAmountFormComponent_ion_text_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Required");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}

function PayAmountFormComponent_ion_text_3_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Please enter a number ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}

function PayAmountFormComponent_ion_text_3_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" Amount too low (minimum ", ctx_r3.amountErrors.min.min, ") ");
  }
}

function PayAmountFormComponent_ion_text_3_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" Amount too high (maximum ", ctx_r4.amountErrors.max.max, ") ");
  }
}

function PayAmountFormComponent_ion_text_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-text", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, PayAmountFormComponent_ion_text_3_div_1_Template, 2, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, PayAmountFormComponent_ion_text_3_div_2_Template, 2, 0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, PayAmountFormComponent_ion_text_3_div_3_Template, 2, 1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, PayAmountFormComponent_ion_text_3_div_4_Template, 2, 1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }

  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.amountErrors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.amountErrors.numeric && !ctx_r0.amountErrors.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.amountErrors.min);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r0.amountErrors.max);
  }
}

const _c0 = function (a0) {
  return {
    invalid: a0
  };
};
/**
 * Payment amount form: Let the user enter and validate an amount to pay.
 */


class PayAmountFormComponent {
  constructor() {
    /** Emit the amount submitted by the user. */
    this.amountSubmitted = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
    /** (Optional) Minimum amount to allow. */

    this.minAmount = 0;
    /** (Optional) Hook to disable autofocus. */

    this.autofocus = true;

    _PayAmountFormComponent_paymentForm.set(this, void 0);
  }
  /** Safe accessor. */


  get paymentForm() {
    return (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_1__.defined)((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__classPrivateFieldGet)(this, _PayAmountFormComponent_paymentForm, "f"), 'PayAmountFormComponent.paymentForm accessed before ngOnInit');
  }
  /** Convenience accessor. */


  get amountControl() {
    return (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_3__.checkClass)(this.paymentForm.controls.amount, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl);
  }
  /** Convenience accessor for validation errors, if they should be displayed. */


  get amountErrors() {
    return this.amountControl.dirty && this.amountControl.invalid ? this.amountControl.errors : null;
  }

  ngOnInit() {
    (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__classPrivateFieldSet)(this, _PayAmountFormComponent_paymentForm, this.initPaymentForm(), "f");

    this.setInitialValues();
  }
  /** Recalculate form validity on input min/max amount change. */


  ngOnChanges(changes) {
    if ((0,tslib__WEBPACK_IMPORTED_MODULE_5__.__classPrivateFieldGet)(this, _PayAmountFormComponent_paymentForm, "f") && ((changes === null || changes === void 0 ? void 0 : changes.minAmount) || (changes === null || changes === void 0 ? void 0 : changes.maxAmount))) {
      this.amountControl.updateValueAndValidity();
    }
  }
  /** Check and emit submission. */


  onSubmit() {
    var _this = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.paymentForm.markAllAsTouched();

      if (_this.paymentForm.valid) {
        const {
          amount
        } = _this.paymentForm.value;

        _this.amountSubmitted.emit((0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_1__.defined)((0,src_app_utils_validators__WEBPACK_IMPORTED_MODULE_2__.parseNumber)(amount)));
      }
    })();
  }

  initPaymentForm() {
    return new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroup({
      amount: new _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControl('', [_angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required, src_app_utils_validators__WEBPACK_IMPORTED_MODULE_2__.numericValidator, // XXX: Delay evaluation of this.minAmount and this.maxAmount,
      //      to respond to value changes
      control => this.minAmount !== undefined ? _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.min(this.minAmount)(control) : null, control => this.maxAmount !== undefined ? _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.max(this.maxAmount)(control) : null])
    });
  }

  setInitialValues() {
    if (this.setInitialAmountValue !== undefined) {
      this.amountControl.setValue(this.setInitialAmountValue);
      this.amountControl.markAsDirty();
    }
  }

}
_PayAmountFormComponent_paymentForm = new WeakMap();

PayAmountFormComponent.ɵfac = function PayAmountFormComponent_Factory(t) {
  return new (t || PayAmountFormComponent)();
};

PayAmountFormComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: PayAmountFormComponent,
  selectors: [["app-pay-amount-form"]],
  inputs: {
    minAmount: "minAmount",
    maxAmount: "maxAmount",
    autofocus: "autofocus",
    setInitialAmountValue: "setInitialAmountValue"
  },
  outputs: {
    amountSubmitted: "amountSubmitted"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵNgOnChangesFeature"]],
  decls: 7,
  vars: 7,
  consts: [[3, "formGroup", "ngSubmit"], [1, "ion-text-center"], ["formControlName", "amount", "name", "amount", "type", "text", "inputmode", "decimal", "placeholder", "Amount", 1, "text-2xl", "font-audiowide", 3, "autofocus", "ngClass"], ["color", "danger", 4, "ngIf"], [1, "ion-margin-vertical"], ["expand", "block", "shape", "round", "type", "submit", 3, "disabled"], ["color", "danger"], [4, "ngIf"]],
  template: function PayAmountFormComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "form", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngSubmit", function PayAmountFormComponent_Template_form_ngSubmit_0_listener() {
        return ctx.onSubmit();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "ion-input", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, PayAmountFormComponent_ion_text_3_Template, 5, 4, "ion-text", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 4)(5, "ion-button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, "PAY ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.paymentForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("autofocus", ctx.autofocus)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction1"](5, _c0, ctx.amountErrors));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.amountErrors);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !ctx.paymentForm.valid);
    }
  },
  directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupDirective, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonInput, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.TextValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlName, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButton],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXktYW1vdW50LWZvcm0uY29tcG9uZW50LnNjc3MifQ== */"]
});

/***/ }),

/***/ 12453:
/*!**********************************************************************!*\
  !*** ./src/app/components/pay-amount-form/pay-amount-form.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PayAmountFormComponentModule": () => (/* binding */ PayAmountFormComponentModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 31777);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var _pay_amount_form_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pay-amount-form.component */ 942);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);





class PayAmountFormComponentModule {
}
PayAmountFormComponentModule.ɵfac = function PayAmountFormComponentModule_Factory(t) { return new (t || PayAmountFormComponentModule)(); };
PayAmountFormComponentModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: PayAmountFormComponentModule });
PayAmountFormComponentModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](PayAmountFormComponentModule, { declarations: [_pay_amount_form_component__WEBPACK_IMPORTED_MODULE_0__.PayAmountFormComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule], exports: [_pay_amount_form_component__WEBPACK_IMPORTED_MODULE_0__.PayAmountFormComponent] }); })();


/***/ }),

/***/ 87420:
/*!*****************************************************************!*\
  !*** ./src/app/components/pay-from-to/pay-from-to.component.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PayFromToComponent": () => (/* binding */ PayFromToComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_pipes_asset_amount_pipe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/pipes/asset-amount.pipe */ 44416);
/* harmony import */ var src_app_pipes_asset_symbol_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/pipes/asset-symbol.pipe */ 16572);




class PayFromToComponent {
    constructor() { }
    ngOnInit() { }
}
PayFromToComponent.ɵfac = function PayFromToComponent_Factory(t) { return new (t || PayFromToComponent)(); };
PayFromToComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: PayFromToComponent, selectors: [["app-pay-from-to"]], inputs: { name: "name", balance: "balance", receiverAddress: "receiverAddress" }, decls: 29, vars: 8, consts: [["lines", "full", 1, "!p-0"], ["color", "white"], ["name", "wallet", "color", "primary", "slot", "start"], [1, "ion-margin-vertical", "w-full", "flex", "justify-between", "items-center", "flex-wrap", "gap-4"], [1, "ion-margin-end"], [1, "!font-black"], ["color", "primary", 1, "text-3xl", "font-audiowide", "overflow-wrap-anywhere"], [1, "text-xl", "font-bold"], ["name", "qr-code", "color", "primary", "slot", "start"], [1, "font-mono", "overflow-wrap-anywhere"]], template: function PayFromToComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-card")(1, "ion-list", 0)(2, "ion-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "ion-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 3)(5, "div")(6, "ion-label", 4)(7, "h2", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "From:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Available Balance");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div")(14, "ion-text", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](16, "assetAmount");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "ion-text", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](19, "assetSymbol");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "ion-item", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](21, "ion-icon", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](22, "div", 3)(23, "div")(24, "ion-label")(25, "h2", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](26, "To:");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](16, 4, ctx.balance), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](19, 6, ctx.balance), " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.receiverAddress, " ");
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonText], pipes: [src_app_pipes_asset_amount_pipe__WEBPACK_IMPORTED_MODULE_0__.AssetAmountPipe, src_app_pipes_asset_symbol_pipe__WEBPACK_IMPORTED_MODULE_1__.AssetSymbolPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXktZnJvbS10by5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ 5675:
/*!**************************************************************!*\
  !*** ./src/app/components/pay-from-to/pay-from-to.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PayFromToModule": () => (/* binding */ PayFromToModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_components_pay_from_to_pay_from_to_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/pay-from-to/pay-from-to.component */ 87420);
/* harmony import */ var src_app_pipes_asset_pipes_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/pipes/asset-pipes.module */ 53631);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51109);





class PayFromToModule {
}
PayFromToModule.ɵfac = function PayFromToModule_Factory(t) { return new (t || PayFromToModule)(); };
PayFromToModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: PayFromToModule });
PayFromToModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, src_app_pipes_asset_pipes_module__WEBPACK_IMPORTED_MODULE_1__.AssetPipesModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](PayFromToModule, { declarations: [src_app_components_pay_from_to_pay_from_to_component__WEBPACK_IMPORTED_MODULE_0__.PayFromToComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, src_app_pipes_asset_pipes_module__WEBPACK_IMPORTED_MODULE_1__.AssetPipesModule], exports: [src_app_components_pay_from_to_pay_from_to_component__WEBPACK_IMPORTED_MODULE_0__.PayFromToComponent] }); })();


/***/ }),

/***/ 94778:
/*!*************************************************!*\
  !*** ./src/app/components/pay/pay.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PayComponent": () => (/* binding */ PayComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var _pay_amount_confirm_pay_amount_confirm_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pay-amount-confirm/pay-amount-confirm.component */ 10564);
/* harmony import */ var src_app_pipes_asset_amount_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/pipes/asset-amount.pipe */ 44416);
/* harmony import */ var src_app_pipes_asset_symbol_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/pipes/asset-symbol.pipe */ 16572);








function PayComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 2)(2, "ion-button", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Change account ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} }
function PayComponent_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "app-pay-amount-confirm", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("amountConfirmed", function PayComponent_ng_container_1_Template_app_pay_amount_confirm_amountConfirmed_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r3.onAmountConfirmed($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("name", ctx_r1.selectedOption.senderName)("balance", ctx_r1.selectedOption.senderBalance)("receiverAddress", ctx_r1.selectedOption.receiverAddress)("transactionLimit", ctx_r1.selectedOption.transactionLimit)("autofocus", ctx_r1.autofocus);
} }
function PayComponent_ng_template_3_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "ion-item", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function PayComponent_ng_template_3_ng_container_1_Template_ion_item_click_1_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r8); const option_r6 = restoredCtx.$implicit; const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r7.selectedOption = option_r6; });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 8)(3, "ion-text", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "assetAmount");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "ion-text", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "assetSymbol");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const option_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 2, option_r6.senderBalance), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](8, 4, option_r6.senderBalance), " ");
} }
function PayComponent_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-list", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, PayComponent_ng_template_3_ng_container_1_Template, 9, 6, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r2.paymentOptions);
} }
/**
 * Let user define a payment, from one or more payment options.
 *
 * This handles account selection, and uses {@link PayAmountConfirmComponent}
 * for amount selection
 */
class PayComponent {
    constructor() {
        /** Emit the payment submitted by the user. */
        this.paymentSubmitted = new _angular_core__WEBPACK_IMPORTED_MODULE_4__.EventEmitter();
        /** @see PayAmountFormComponent.autofocus */
        this.autofocus = true;
    }
    /** "Change account" button should show for multiple options. */
    get shouldShowChangeButton() {
        return this.paymentOptions !== undefined && 1 < this.paymentOptions.length;
    }
    ngOnInit() {
        this.initSelectedOption();
    }
    /** Emit user-confirmed amount as payment. */
    onAmountConfirmed(amount) {
        const option = (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_0__.defined)(this.selectedOption, 'PayComponent.onAmountConfirmed: unexpected undefined: selectedOption');
        this.paymentSubmitted.emit({ amount, option });
    }
    initSelectedOption() {
        if (this.paymentOptions !== undefined && 0 < this.paymentOptions.length) {
            this.selectedOption = this.paymentOptions[0];
        }
    }
}
PayComponent.ɵfac = function PayComponent_Factory(t) { return new (t || PayComponent)(); };
PayComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: PayComponent, selectors: [["app-pay"]], inputs: { paymentOptions: "paymentOptions", autofocus: "autofocus" }, outputs: { paymentSubmitted: "paymentSubmitted" }, decls: 4, vars: 2, consts: [[4, "ngIf"], ["trigger", "trigger-change-account", "dismiss-on-select", "true", "alignment", "center"], [1, "ion-text-center"], ["id", "trigger-change-account", "color", "secondary", "shape", "round"], [3, "name", "balance", "receiverAddress", "transactionLimit", "autofocus", "amountConfirmed"], ["lines", "full"], [4, "ngFor", "ngForOf"], ["button", "", 1, "", 3, "click"], [1, "w-full", "text-right"], ["color", "primary", 1, "text-3xl", "font-audiowide", "overflow-wrap-anywhere"], [1, "inline-block", "text-left", "text-xl", "font-bold", 2, "width", "6ch"]], template: function PayComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, PayComponent_ng_container_0_Template, 4, 0, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, PayComponent_ng_container_1_Template, 2, 5, "ng-container", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-popover", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, PayComponent_ng_template_3_Template, 2, 1, "ng-template");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.shouldShowChangeButton);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.selectedOption);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonButton, _pay_amount_confirm_pay_amount_confirm_component__WEBPACK_IMPORTED_MODULE_1__.PayAmountConfirmComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonPopover, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonList, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonText], pipes: [src_app_pipes_asset_amount_pipe__WEBPACK_IMPORTED_MODULE_2__.AssetAmountPipe, src_app_pipes_asset_symbol_pipe__WEBPACK_IMPORTED_MODULE_3__.AssetSymbolPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXkuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 29380:
/*!**********************************************!*\
  !*** ./src/app/components/pay/pay.module.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PayComponentModule": () => (/* binding */ PayComponentModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_components_pay_amount_confirm_pay_amount_confirm_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/pay-amount-confirm/pay-amount-confirm.module */ 29158);
/* harmony import */ var src_app_pipes_asset_pipes_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/pipes/asset-pipes.module */ 53631);
/* harmony import */ var _pay_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pay.component */ 94778);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51109);






class PayComponentModule {
}
PayComponentModule.ɵfac = function PayComponentModule_Factory(t) { return new (t || PayComponentModule)(); };
PayComponentModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: PayComponentModule });
PayComponentModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
            src_app_components_pay_amount_confirm_pay_amount_confirm_module__WEBPACK_IMPORTED_MODULE_0__.PayAmountConfirmComponentModule,
            src_app_pipes_asset_pipes_module__WEBPACK_IMPORTED_MODULE_1__.AssetPipesModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](PayComponentModule, { declarations: [_pay_component__WEBPACK_IMPORTED_MODULE_2__.PayComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule,
        src_app_components_pay_amount_confirm_pay_amount_confirm_module__WEBPACK_IMPORTED_MODULE_0__.PayAmountConfirmComponentModule,
        src_app_pipes_asset_pipes_module__WEBPACK_IMPORTED_MODULE_1__.AssetPipesModule], exports: [_pay_component__WEBPACK_IMPORTED_MODULE_2__.PayComponent] }); })();


/***/ }),

/***/ 74770:
/*!*********************************************************************!*\
  !*** ./src/app/components/pure-pay-page/pure-pay-page.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PurePayPageComponent": () => (/* binding */ PurePayPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var algosdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! algosdk */ 7830);
/* harmony import */ var algosdk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(algosdk__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var src_app_utils_assets_assets_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/utils/assets/assets.config */ 43474);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var src_helpers_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/helpers/helpers */ 42289);
/* harmony import */ var xrpl__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! xrpl */ 77962);
/* harmony import */ var xrpl__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(xrpl__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _pay_pay_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../pay/pay.component */ 94778);









function PurePayPageComponent_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "app-pay", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("paymentSubmitted", function PurePayPageComponent_ng_container_3_Template_app_pay_paymentSubmitted_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r4); const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](); return ctx_r3.paymentSubmitted.emit($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("paymentOptions", ctx_r0.paymentOptions)("autofocus", ctx_r0.autofocus);
} }
function PurePayPageComponent_ng_template_4_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "h2", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Unsupported address");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Address not recognised:");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "pre", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](7, "json");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind1"](7, 1, ctx_r5.receiverAddress));
} }
function PurePayPageComponent_ng_template_4_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "h2", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "No Algorand account");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "You do not have an Algorand account");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
} }
function PurePayPageComponent_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, PurePayPageComponent_ng_template_4_ng_container_1_Template, 8, 3, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, PurePayPageComponent_ng_template_4_ng_container_2_Template, 5, 0, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r2.receiverAddressType);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.receiverAddressType === "Algorand" && !ctx_r2.hasAlgorandBalances);
} }
/**
 * @see PayPage
 */
class PurePayPageComponent {
    constructor() {
        this.paymentSubmitted = new _angular_core__WEBPACK_IMPORTED_MODULE_6__.EventEmitter();
        /** @see PayAmountFormComponent.autofocus */
        this.autofocus = true;
        this.assetConfigs = src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.assetConfigs;
    }
    get receiverAddressType() {
        return this.receiverAddress ? addressType(this.receiverAddress) : undefined;
    }
    get hasAlgorandBalances() {
        var _a;
        return 0 < ((_a = this.algorandBalances) !== null && _a !== void 0 ? _a : []).length;
    }
    get hasPaymentOptions() {
        var _a;
        return 0 < ((_a = this.paymentOptions) !== null && _a !== void 0 ? _a : []).length;
    }
    ngOnInit() { }
    /**
     * Recalculate {@link paymentOptions} on change.
     */
    ngOnChanges(changes) {
        this.paymentOptions = this.getPaymentOptions();
    }
    getPaymentOptions() {
        const senderName = this.senderName;
        const receiverAddress = this.receiverAddress;
        if (senderName && receiverAddress) {
            if (this.receiverAddressType === 'Algorand' && this.algorandBalances) {
                return this.algorandBalances.map((senderBalance) => (Object.assign({ senderName,
                    senderBalance,
                    receiverAddress }, this.transactionLimitFor(senderBalance))));
            }
            else if (this.receiverAddressType === 'XRPL' && this.xrplBalances) {
                return this.xrplBalances.map((senderBalance) => (Object.assign({ senderName,
                    senderBalance,
                    receiverAddress }, this.transactionLimitFor(senderBalance))));
            }
        }
    }
    /**
     * Determine the transaction limit to use for the given sender balance.
     *
     * This applies `transactionLimitWithoutOnfidoCheck` configurations based on {@link flagOnfidoCheckIsClear}.
     */
    transactionLimitFor(senderBalance) {
        const transactionLimit = this.flagOnfidoCheckIsClear
            ? undefined
            : (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_3__.ifDefined)(this.assetConfigs, (assetConfigs) => {
                var _a;
                return (_a = (0,src_app_utils_assets_assets_config__WEBPACK_IMPORTED_MODULE_1__.getAssetConfigForLedgerInfo)(assetConfigs, senderBalance.ledgerInfo)) === null || _a === void 0 ? void 0 : _a.transactionLimitWithoutOnfidoCheck;
            });
        return transactionLimit === undefined ? {} : { transactionLimit };
    }
}
PurePayPageComponent.ɵfac = function PurePayPageComponent_Factory(t) { return new (t || PurePayPageComponent)(); };
PurePayPageComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({ type: PurePayPageComponent, selectors: [["app-pure-pay-page"]], inputs: { senderName: "senderName", receiverAddress: "receiverAddress", algorandBalances: "algorandBalances", xrplBalances: "xrplBalances", flagOnfidoCheckIsClear: "flagOnfidoCheckIsClear", autofocus: "autofocus" }, outputs: { paymentSubmitted: "paymentSubmitted" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵNgOnChangesFeature"]], decls: 6, vars: 2, consts: [[1, "ion-text-center", "p-2"], [1, "font-semibold", "font-nasalization"], [4, "ngIf", "ngIfElse"], ["noPaymentOptions", ""], [3, "paymentOptions", "autofocus", "paymentSubmitted"], [4, "ngIf"], [1, "whitespace-pre-wrap", "overflow-wrap-anywhere"]], template: function PurePayPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0)(1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Pay");
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, PurePayPageComponent_ng_container_3_Template, 2, 2, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, PurePayPageComponent_ng_template_4_Template, 3, 2, "ng-template", null, 3, _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵreference"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.hasPaymentOptions)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _pay_pay_component__WEBPACK_IMPORTED_MODULE_5__.PayComponent], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.JsonPipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwdXJlLXBheS1wYWdlLmNvbXBvbmVudC5zY3NzIn0= */"] });
const addressTypes = (address) => {
    const coerce = (t) => t;
    return [
        ...coerce(algosdk__WEBPACK_IMPORTED_MODULE_0___default().isValidAddress(address) ? ['Algorand'] : []),
        ...coerce(xrpl__WEBPACK_IMPORTED_MODULE_4__.isValidAddress(address) ? ['XRPL'] : []),
    ];
};
const addressType = (address) => {
    const types = addressTypes(address);
    switch (types.length) {
        case 0:
            return undefined;
        case 1:
            return types[0];
        default:
            throw Error(`addressType: ${JSON.stringify(types)} has multiple types: ${JSON.stringify(types)}`);
    }
};


/***/ }),

/***/ 12033:
/*!******************************************************************!*\
  !*** ./src/app/components/pure-pay-page/pure-pay-page.module.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PurePayPageComponentModule": () => (/* binding */ PurePayPageComponentModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_components_pay_pay_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/pay/pay.module */ 29380);
/* harmony import */ var _pure_pay_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pure-pay-page.component */ 74770);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 51109);





class PurePayPageComponentModule {
}
PurePayPageComponentModule.ɵfac = function PurePayPageComponentModule_Factory(t) { return new (t || PurePayPageComponentModule)(); };
PurePayPageComponentModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: PurePayPageComponentModule });
PurePayPageComponentModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, src_app_components_pay_pay_module__WEBPACK_IMPORTED_MODULE_0__.PayComponentModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](PurePayPageComponentModule, { declarations: [_pure_pay_page_component__WEBPACK_IMPORTED_MODULE_1__.PurePayPageComponent], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, src_app_components_pay_pay_module__WEBPACK_IMPORTED_MODULE_0__.PayComponentModule], exports: [_pure_pay_page_component__WEBPACK_IMPORTED_MODULE_1__.PurePayPageComponent] }); })();


/***/ }),

/***/ 43474:
/*!***********************************************!*\
  !*** ./src/app/utils/assets/assets.config.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getAssetConfigForLedgerInfo": () => (/* binding */ getAssetConfigForLedgerInfo)
/* harmony export */ });
/* harmony import */ var _assets_algo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets.algo */ 23648);
/* harmony import */ var _assets_algo_asa__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assets.algo.asa */ 45883);
/* harmony import */ var _assets_xrp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets.xrp */ 42339);
/* harmony import */ var _assets_xrp_token__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./assets.xrp.token */ 23726);




/**
 * Look up the asset config for the given asset's ledger info, if any.
 */
const getAssetConfigForLedgerInfo = (assetConfigs, ledgerInfo) => {
    var _a, _b, _c, _d, _e, _f;
    if (ledgerInfo.type === _assets_algo__WEBPACK_IMPORTED_MODULE_0__.LEDGER_TYPE_ALGORAND) {
        if ((0,_assets_algo__WEBPACK_IMPORTED_MODULE_0__.isLedgerInfoAlgo)(ledgerInfo)) {
            return (_a = assetConfigs === null || assetConfigs === void 0 ? void 0 : assetConfigs[_assets_algo__WEBPACK_IMPORTED_MODULE_0__.LEDGER_TYPE_ALGORAND]) === null || _a === void 0 ? void 0 : _a[_assets_algo__WEBPACK_IMPORTED_MODULE_0__.ASSET_SYMBOL_ALGO];
        }
        else if ((0,_assets_algo_asa__WEBPACK_IMPORTED_MODULE_1__.isLedgerInfoAsa)(ledgerInfo)) {
            return (_c = (_b = assetConfigs === null || assetConfigs === void 0 ? void 0 : assetConfigs[_assets_algo__WEBPACK_IMPORTED_MODULE_0__.LEDGER_TYPE_ALGORAND]) === null || _b === void 0 ? void 0 : _b.ASA) === null || _c === void 0 ? void 0 : _c[ledgerInfo.assetId];
        }
    }
    else if (ledgerInfo.type === _assets_xrp__WEBPACK_IMPORTED_MODULE_2__.LEDGER_TYPE_XRPL) {
        if ((0,_assets_xrp__WEBPACK_IMPORTED_MODULE_2__.isLedgerInfoXrp)(ledgerInfo)) {
            return (_d = assetConfigs === null || assetConfigs === void 0 ? void 0 : assetConfigs[_assets_xrp__WEBPACK_IMPORTED_MODULE_2__.LEDGER_TYPE_XRPL]) === null || _d === void 0 ? void 0 : _d[_assets_xrp__WEBPACK_IMPORTED_MODULE_2__.ASSET_SYMBOL_XRP];
        }
        if ((0,_assets_xrp_token__WEBPACK_IMPORTED_MODULE_3__.isLedgerInfoXrplToken)(ledgerInfo)) {
            return (_f = (_e = assetConfigs === null || assetConfigs === void 0 ? void 0 : assetConfigs[_assets_xrp__WEBPACK_IMPORTED_MODULE_2__.LEDGER_TYPE_XRPL]) === null || _e === void 0 ? void 0 : _e.XrplToken) === null || _f === void 0 ? void 0 : _f[ledgerInfo.currency];
        }
    }
};


/***/ }),

/***/ 82516:
/*!*************************************************!*\
  !*** ./src/app/views/pay/pay-routing.module.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PayPageRoutingModule": () => (/* binding */ PayPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _pay_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pay.page */ 50618);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);




const routes = [
    {
        path: '',
        component: _pay_page__WEBPACK_IMPORTED_MODULE_0__.PayPage,
    },
];
class PayPageRoutingModule {
}
PayPageRoutingModule.ɵfac = function PayPageRoutingModule_Factory(t) { return new (t || PayPageRoutingModule)(); };
PayPageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: PayPageRoutingModule });
PayPageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](PayPageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 28636:
/*!*****************************************!*\
  !*** ./src/app/views/pay/pay.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PayPageModule": () => (/* binding */ PayPageModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_components_pay_from_to_pay_from_to_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/pay-from-to/pay-from-to.module */ 5675);
/* harmony import */ var src_app_components_pure_pay_page_pure_pay_page_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/pure-pay-page/pure-pay-page.module */ 12033);
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ 72271);
/* harmony import */ var _pay_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pay-routing.module */ 82516);
/* harmony import */ var _pay_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pay.page */ 50618);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 51109);








class PayPageModule {
}
PayPageModule.ɵfac = function PayPageModule_Factory(t) { return new (t || PayPageModule)(); };
PayPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({ type: PayPageModule });
PayPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
            _pay_routing_module__WEBPACK_IMPORTED_MODULE_3__.PayPageRoutingModule,
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
            src_app_components_pure_pay_page_pure_pay_page_module__WEBPACK_IMPORTED_MODULE_1__.PurePayPageComponentModule,
            src_app_components_pay_from_to_pay_from_to_module__WEBPACK_IMPORTED_MODULE_0__.PayFromToModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](PayPageModule, { declarations: [_pay_page__WEBPACK_IMPORTED_MODULE_4__.PayPage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule,
        _pay_routing_module__WEBPACK_IMPORTED_MODULE_3__.PayPageRoutingModule,
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule,
        src_app_components_pure_pay_page_pure_pay_page_module__WEBPACK_IMPORTED_MODULE_1__.PurePayPageComponentModule,
        src_app_components_pay_from_to_pay_from_to_module__WEBPACK_IMPORTED_MODULE_0__.PayFromToModule], exports: [_pay_page__WEBPACK_IMPORTED_MODULE_4__.PayPage] }); })();


/***/ }),

/***/ 50618:
/*!***************************************!*\
  !*** ./src/app/views/pay/pay.page.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PayPage": () => (/* binding */ PayPage)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var _datorama_akita__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @datorama/akita */ 17898);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 27187);
/* harmony import */ var src_app_services_xrpl_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/xrpl.utils */ 68170);
/* harmony import */ var src_app_utils_assets_assets_algo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/utils/assets/assets.algo */ 23648);
/* harmony import */ var src_app_utils_assets_assets_algo_asa__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/utils/assets/assets.algo.asa */ 45883);
/* harmony import */ var src_app_utils_assets_assets_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/utils/assets/assets.common */ 95844);
/* harmony import */ var src_app_utils_assets_assets_xrp__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/utils/assets/assets.xrp */ 42339);
/* harmony import */ var src_app_utils_assets_assets_xrp_token__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/utils/assets/assets.xrp.token */ 23726);
/* harmony import */ var src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/utils/errors/panic */ 17790);
/* harmony import */ var src_app_utils_loading_helpers__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/utils/loading.helpers */ 50271);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/environments/environment */ 92340);
/* harmony import */ var src_helpers_helpers__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/helpers/helpers */ 42289);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_state_session_algorand_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/state/session-algorand.service */ 17956);
/* harmony import */ var src_app_state_session_xrpl_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/state/session-xrpl.service */ 36187);
/* harmony import */ var src_app_state_session_query__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/state/session.query */ 55545);
/* harmony import */ var src_app_utils_notification_swal_helper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/utils/notification/swal-helper */ 1733);
/* harmony import */ var src_app_components_header_header_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/components/header/header.component */ 43646);
/* harmony import */ var _components_pure_pay_page_pure_pay_page_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../components/pure-pay-page/pure-pay-page.component */ 74770);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/common */ 38143);























class PayPage {
  constructor(route, navCtrl, sessionAlgorandService, sessionXrplService, sessionQuery, loadingCtrl, notification) {
    this.route = route;
    this.navCtrl = navCtrl;
    this.sessionAlgorandService = sessionAlgorandService;
    this.sessionXrplService = sessionXrplService;
    this.sessionQuery = sessionQuery;
    this.loadingCtrl = loadingCtrl;
    this.notification = notification;
    /** @see PayAmountFormComponent.autofocus */

    this.autofocus = true;
    this.senderName = this.sessionQuery.wallet.pipe((0,_datorama_akita__WEBPACK_IMPORTED_MODULE_1__.filterNilValue)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_18__.pluck)('owner_name'));
    this.receiverAddress = this.route.queryParams.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_18__.pluck)('receiverAddress'));
    this.algorandBalances = this.sessionQuery.algorandBalances;
    this.xrplBalances = this.sessionQuery.xrplBalances;
    this.onfidoCheckIsClear = this.sessionQuery.onfidoCheckIsClear;
  }

  ngOnInit() {}

  onPaymentSubmitted({
    amount,
    option: {
      receiverAddress
    }
  }) {
    var _this = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const result = yield (0,src_app_utils_loading_helpers__WEBPACK_IMPORTED_MODULE_9__.withLoadingOverlayOpts)(_this.loadingCtrl, {
        message: 'Confirming Transaction'
      }, () => _this.sendByLedgerType(amount, receiverAddress));
      yield _this.notifyResult(result, amount, receiverAddress);
    })();
  }
  /**
   * Send an amount to `receiverAddress` using the amount's ledger type and asset info.
   *
   * This currently handles:
   *
   * - Algorand: Algo & ASA
   * - XRPL: XRP & tokens
   *
   * @todo Move this into an appropriate aggregated payment service somewhere?
   */


  sendByLedgerType(amount, receiverAddress) {
    var _this2 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if ((0,src_app_utils_assets_assets_algo__WEBPACK_IMPORTED_MODULE_3__.isAssetAmountAlgo)(amount)) {
        return {
          algorandResult: yield _this2.sessionAlgorandService.sendAlgos(receiverAddress, amount.amount)
        };
      } else if ((0,src_app_utils_assets_assets_algo_asa__WEBPACK_IMPORTED_MODULE_4__.isAssetAmountAsa)(amount)) {
        const {
          amount: amountInLedgerUnits,
          assetId
        } = (0,src_app_utils_assets_assets_algo_asa__WEBPACK_IMPORTED_MODULE_4__.convertFromAssetAmountAsaToLedger)(amount);
        return {
          algorandResult: yield _this2.sessionAlgorandService.sendAssetFunds(assetId, receiverAddress, amountInLedgerUnits)
        };
      } else if ((0,src_app_utils_assets_assets_xrp__WEBPACK_IMPORTED_MODULE_6__.isAssetAmountXrp)(amount)) {
        return {
          xrplResult: yield _this2.sessionXrplService.sendFunds(receiverAddress, (0,src_app_utils_assets_assets_xrp__WEBPACK_IMPORTED_MODULE_6__.convertFromAssetAmountXrpToLedger)(amount))
        };
      } else if ((0,src_app_utils_assets_assets_xrp_token__WEBPACK_IMPORTED_MODULE_7__.isAssetAmountXrplToken)(amount)) {
        return {
          xrplResult: yield _this2.sessionXrplService.sendFunds(receiverAddress, (0,src_app_utils_assets_assets_xrp_token__WEBPACK_IMPORTED_MODULE_7__.convertFromAssetAmountXrplTokenToLedger)(amount))
        };
      } else {
        throw (0,src_app_utils_errors_panic__WEBPACK_IMPORTED_MODULE_8__.panic)('PayPage.sendAmount: unexpected amount', {
          amount
        });
      }
    })();
  }

  notifyResult(result, amount, receiverAddress) {
    var _this3 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if ('algorandResult' in result) {
        const {
          algorandResult: confirmation
        } = result;

        _this3.notifySuccess({
          amount: `${(0,src_app_utils_assets_assets_common__WEBPACK_IMPORTED_MODULE_5__.formatAssetAmount)(amount)} ${(0,src_app_utils_assets_assets_common__WEBPACK_IMPORTED_MODULE_5__.formatAssetSymbol)(amount)}`,
          address: receiverAddress,
          txId: confirmation.txId,
          timestamp: new Date(),
          txUrlPrefix: src_environments_environment__WEBPACK_IMPORTED_MODULE_10__.environment.algorandTransactionUrlPrefix
        });
      } else if ('xrplResult' in result) {
        const {
          xrplResult: txResponse
        } = result;
        const {
          succeeded,
          resultCode
        } = (0,src_app_services_xrpl_utils__WEBPACK_IMPORTED_MODULE_2__.checkTxResponseSucceeded)(txResponse);

        if (succeeded) {
          _this3.notifySuccess({
            amount: `${(0,src_app_utils_assets_assets_common__WEBPACK_IMPORTED_MODULE_5__.formatAssetAmount)(amount)} ${(0,src_app_utils_assets_assets_common__WEBPACK_IMPORTED_MODULE_5__.formatAssetSymbol)(amount)}`,
            address: receiverAddress,
            txId: txResponse.id.toString(),
            timestamp: new Date()
          });
        } else {
          yield _this3.notifyXrplFailure({
            resultCode
          });
        }
      } else {
        throw (0,src_helpers_helpers__WEBPACK_IMPORTED_MODULE_11__.never)(result);
      }
    })();
  }

  notifySuccess({
    amount,
    address,
    txId,
    timestamp,
    txUrlPrefix
  }) {
    const txIdHtml = txUrlPrefix ? `<a href="${txUrlPrefix}${txId}" target="_blank" >${txId}</a>` : `${txId}`;
    this.notification.swal.fire({
      icon: 'success',
      titleText: 'Money sent!',
      text: 'Your money was sent successfully.',
      html: `<div >
              <h2 class="text-primary font-bold">${amount}</h2>
              <p class="text-xs"><b>Receiver:</b> ${address}</p>
              <p class="text-xs"><b>Transaction ID:</b> ${txIdHtml}</p>
              <p class="text-xs">Completed on ${timestamp.toLocaleString()}</p>
            </div>`,
      confirmButtonText: 'DONE'
    }).then(({
      isConfirmed
    }) => {
      if (isConfirmed) {
        this.navCtrl.navigateRoot('wallet');
      }
    });
  }

  notifyXrplFailure({
    resultCode
  }) {
    var _this4 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const categoryLocalError = resultCode.startsWith('tel');
      const categoryRetry = resultCode.startsWith('ter');
      const retryable = categoryLocalError || categoryRetry;
      yield _this4.notification.swal.fire({
        icon: retryable ? 'warning' : 'error',
        titleText: 'Transaction failed',
        html: [...(categoryLocalError ? ['<p>(Local error)</p>'] : []), ...(categoryRetry ? ['<p>(Retry possible)</p>'] : []), `<p>Result code: ${resultCode}</p>`, '<p>See <a href="https://xrpl.org/transaction-results.html" target="_blank">Transaction Results</a> for more details.</p>'].join('\n')
      });
    })();
  }

}

PayPage.ɵfac = function PayPage_Factory(t) {
  return new (t || PayPage)(_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_20__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_21__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](src_app_state_session_algorand_service__WEBPACK_IMPORTED_MODULE_12__.SessionAlgorandService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](src_app_state_session_xrpl_service__WEBPACK_IMPORTED_MODULE_13__.SessionXrplService), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](src_app_state_session_query__WEBPACK_IMPORTED_MODULE_14__.SessionQuery), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_21__.LoadingController), _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdirectiveInject"](src_app_utils_notification_swal_helper__WEBPACK_IMPORTED_MODULE_15__.SwalHelper));
};

PayPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵdefineComponent"]({
  type: PayPage,
  selectors: [["app-pay-page"]],
  inputs: {
    autofocus: "autofocus"
  },
  decls: 10,
  vars: 16,
  consts: [[1, "ion-no-border"], ["fixed", ""], [3, "senderName", "receiverAddress", "algorandBalances", "xrplBalances", "flagOnfidoCheckIsClear", "autofocus", "paymentSubmitted"]],
  template: function PayPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](0, "ion-header", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelement"](1, "app-header");
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementStart"](2, "ion-content")(3, "ion-grid", 1)(4, "app-pure-pay-page", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵlistener"]("paymentSubmitted", function PayPage_Template_app_pure_pay_page_paymentSubmitted_4_listener($event) {
        return ctx.onPaymentSubmitted($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](5, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](6, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](7, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](8, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipe"](9, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵelementEnd"]()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵproperty"]("senderName", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](5, 6, ctx.senderName))("receiverAddress", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](6, 8, ctx.receiverAddress))("algorandBalances", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](7, 10, ctx.algorandBalances))("xrplBalances", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](8, 12, ctx.xrplBalances))("flagOnfidoCheckIsClear", _angular_core__WEBPACK_IMPORTED_MODULE_19__["ɵɵpipeBind1"](9, 14, ctx.onfidoCheckIsClear))("autofocus", ctx.autofocus);
    }
  },
  directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonHeader, src_app_components_header_header_component__WEBPACK_IMPORTED_MODULE_16__.HeaderComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonGrid, _components_pure_pay_page_pure_pay_page_component__WEBPACK_IMPORTED_MODULE_17__.PurePayPageComponent],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_22__.AsyncPipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwYXkucGFnZS5zY3NzIn0= */"]
});

/***/ })

}]);
//# sourceMappingURL=default-src_app_views_pay_pay_module_ts.js.map