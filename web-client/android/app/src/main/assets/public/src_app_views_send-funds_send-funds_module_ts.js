"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_views_send-funds_send-funds_module_ts"],{

/***/ 12143:
/*!***************************************************************!*\
  !*** ./src/app/views/send-funds/send-funds-routing.module.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routes": () => (/* binding */ routes),
/* harmony export */   "SendFundsPageRoutingModule": () => (/* binding */ SendFundsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _send_funds_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./send-funds.page */ 59162);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);




const routes = [
    {
        path: '',
        component: _send_funds_page__WEBPACK_IMPORTED_MODULE_0__.SendFundsPage,
    },
    {
        path: 'pay',
        loadChildren: () => __webpack_require__.e(/*! import() */ "default-src_app_views_pay_pay_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! ../pay/pay.module */ 28636)).then((m) => m.PayPageModule),
    },
];
class SendFundsPageRoutingModule {
}
SendFundsPageRoutingModule.ɵfac = function SendFundsPageRoutingModule_Factory(t) { return new (t || SendFundsPageRoutingModule)(); };
SendFundsPageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: SendFundsPageRoutingModule });
SendFundsPageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](SendFundsPageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 44725:
/*!*******************************************************!*\
  !*** ./src/app/views/send-funds/send-funds.module.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SendFundsPageModule": () => (/* binding */ SendFundsPageModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 31777);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ 72271);
/* harmony import */ var _send_funds_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./send-funds-routing.module */ 12143);
/* harmony import */ var _send_funds_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./send-funds.page */ 59162);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51109);







class SendFundsPageModule {
}
SendFundsPageModule.ɵfac = function SendFundsPageModule_Factory(t) { return new (t || SendFundsPageModule)(); };
SendFundsPageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: SendFundsPageModule });
SendFundsPageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _send_funds_routing_module__WEBPACK_IMPORTED_MODULE_1__.SendFundsPageRoutingModule,
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SendFundsPageModule, { declarations: [_send_funds_page__WEBPACK_IMPORTED_MODULE_2__.SendFundsPage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
        _send_funds_routing_module__WEBPACK_IMPORTED_MODULE_1__.SendFundsPageRoutingModule,
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule] }); })();


/***/ }),

/***/ 59162:
/*!*****************************************************!*\
  !*** ./src/app/views/send-funds/send-funds.page.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SendFundsPage": () => (/* binding */ SendFundsPage)
/* harmony export */ });
/* harmony import */ var _Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 74475);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ 63153);
/* harmony import */ var _manual_address_manual_address_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../manual-address/manual-address.page */ 91327);
/* harmony import */ var _scanner_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../scanner.helpers */ 52347);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_utils_notification_swal_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/utils/notification/swal-helper */ 1733);
/* harmony import */ var src_app_components_header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/components/header/header.component */ 43646);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var src_app_components_action_item_action_item_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/components/action-item/action-item.component */ 60073);











function SendFundsPage_ion_item_group_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();

    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-item-group")(1, "app-action-item", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function SendFundsPage_ion_item_group_8_Template_app_action_item_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r3);
      const item_r1 = restoredCtx.$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return ctx_r2.execItemAction(item_r1.action);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }

  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("title", item_r1.title)("icon", item_r1.icon)("disabled", item_r1.disabled);
  }
}

class SendFundsPage {
  constructor(navCtrl, modalCtrl, alertCtrl, notification) {
    this.navCtrl = navCtrl;
    this.modalCtrl = modalCtrl;
    this.alertCtrl = alertCtrl;
    this.notification = notification;
    this.actionItems = [{
      title: 'Scan a QR code',
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__.faQrcode,
      action: 'presentScanner'
    }, {
      title: 'Enter address manually',
      icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_7__.faKeyboard,
      action: 'presentAddressModal'
    } // {
    //   title: 'Share my wallet address',
    //   icon: faLink,
    //   disabled: true,
    // },
    ];
  }

  ngOnInit() {}

  presentScanner() {
    var _this = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const scanSuccess = /*#__PURE__*/function () {
        var _ref = (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (address) {
          yield _this.navCtrl.navigateForward('pay', {
            queryParams: {
              receiverAddress: address
            }
          });
        });

        return function scanSuccess(_x) {
          return _ref.apply(this, arguments);
        };
      }();

      yield (0,_scanner_helpers__WEBPACK_IMPORTED_MODULE_2__.handleScan)(_this.modalCtrl, _this.notification.swal, scanSuccess);
    })();
  }

  presentAddressModal() {
    var _this2 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this2.modalCtrl.create({
        component: _manual_address_manual_address_page__WEBPACK_IMPORTED_MODULE_1__.ManualAddressPage
      });
      yield modal.present();
      const {
        data
      } = yield modal.onDidDismiss();

      if ((data === null || data === void 0 ? void 0 : data.success) && (data === null || data === void 0 ? void 0 : data.address)) {
        _this2.navCtrl.navigateForward('pay', {
          queryParams: {
            receiverAddress: data === null || data === void 0 ? void 0 : data.address
          }
        });
      }
    })();
  }

  execItemAction(action) {
    var _this3 = this;

    return (0,_Users_jongbonga_Code_Ntls_Wallet_web_client_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      switch (action) {
        case 'presentScanner':
          yield _this3.presentScanner();
          break;

        case 'presentAddressModal':
          yield _this3.presentAddressModal();
          break;

        default:
          break;
      }
    })();
  }

}

SendFundsPage.ɵfac = function SendFundsPage_Factory(t) {
  return new (t || SendFundsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_utils_notification_swal_helper__WEBPACK_IMPORTED_MODULE_3__.SwalHelper));
};

SendFundsPage.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: SendFundsPage,
  selectors: [["app-send-funds"]],
  decls: 9,
  vars: 1,
  consts: [[1, "ion-no-border"], ["fixed", ""], [1, "ion-text-center", "p-2"], [1, "font-semibold", "font-nasalization"], [4, "ngFor", "ngForOf"], [3, "title", "icon", "disabled", "click"]],
  template: function SendFundsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-header", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "app-header");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "ion-content")(3, "ion-grid", 1)(4, "div", 2)(5, "h1", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "Send Money");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "ion-list");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, SendFundsPage_ion_item_group_8_Template, 2, 3, "ion-item-group", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    }

    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx.actionItems);
    }
  },
  directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, src_app_components_header_header_component__WEBPACK_IMPORTED_MODULE_4__.HeaderComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonList, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonItemGroup, src_app_components_action_item_action_item_component__WEBPACK_IMPORTED_MODULE_5__.ActionItemComponent],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzZW5kLWZ1bmRzLnBhZ2Uuc2NzcyJ9 */"]
});

/***/ })

}]);
//# sourceMappingURL=src_app_views_send-funds_send-funds_module_ts.js.map