"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_views_home_home_module_ts"],{

/***/ 96279:
/*!***************************************************!*\
  !*** ./src/app/views/home/home-routing.module.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageRoutingModule": () => (/* binding */ HomePageRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 65485);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 16503);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 51109);




const routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage,
    },
];
class HomePageRoutingModule {
}
HomePageRoutingModule.ɵfac = function HomePageRoutingModule_Factory(t) { return new (t || HomePageRoutingModule)(); };
HomePageRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: HomePageRoutingModule });
HomePageRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](HomePageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule] }); })();


/***/ }),

/***/ 30842:
/*!*******************************************!*\
  !*** ./src/app/views/home/home.module.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageModule": () => (/* binding */ HomePageModule)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 31777);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/modules/shared/shared.module */ 72271);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home-routing.module */ 96279);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./home.page */ 16503);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51109);







class HomePageModule {
}
HomePageModule.ɵfac = function HomePageModule_Factory(t) { return new (t || HomePageModule)(); };
HomePageModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: HomePageModule });
HomePageModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _home_routing_module__WEBPACK_IMPORTED_MODULE_1__.HomePageRoutingModule,
            src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule,
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](HomePageModule, { declarations: [_home_page__WEBPACK_IMPORTED_MODULE_2__.HomePage], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
        _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
        _home_routing_module__WEBPACK_IMPORTED_MODULE_1__.HomePageRoutingModule,
        src_app_modules_shared_shared_module__WEBPACK_IMPORTED_MODULE_0__.SharedModule] }); })();


/***/ }),

/***/ 16503:
/*!*****************************************!*\
  !*** ./src/app/views/home/home.page.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePage": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ 63153);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 51109);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 95472);
/* harmony import */ var src_app_components_header_header_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/app/components/header/header.component */ 43646);
/* harmony import */ var src_app_components_profile_card_horizontal_profile_card_horizontal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/components/profile-card-horizontal/profile-card-horizontal.component */ 2644);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 38143);
/* harmony import */ var src_app_components_action_item_action_item_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/components/action-item/action-item.component */ 60073);







function HomePage_app_action_item_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "app-action-item", 5);
} if (rf & 2) {
    const item_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("title", item_r1.title)("icon", item_r1.icon)("path", item_r1.path)("disabled", item_r1.disabled);
} }
class HomePage {
    constructor() {
        this.actionItems = [
            {
                title: 'My Wallet',
                icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faWallet,
                path: '../wallet',
            },
            {
                title: 'My Profile',
                icon: _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_4__.faUserCircle,
                disabled: true,
            },
        ];
    }
    ngOnInit() { }
}
HomePage.ɵfac = function HomePage_Factory(t) { return new (t || HomePage)(); };
HomePage.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: HomePage, selectors: [["app-home"]], decls: 9, vars: 5, consts: [[1, "ion-no-border"], ["fixed", ""], [1, "ion-text-center", "font-nasalization"], [3, "title", "fullName", "cellphone", "avatar"], [3, "title", "icon", "path", "disabled", 4, "ngFor", "ngForOf"], [3, "title", "icon", "path", "disabled"]], template: function HomePage_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-header");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "ion-content")(3, "ion-grid", 1)(4, "h2", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Welcome to Nautilus");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "ion-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](7, "app-profile-card-horizontal", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, HomePage_app_action_item_8_Template, 1, 4, "app-action-item", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("title", "Dr")("fullName", "Nautilus Wallet")("cellphone", "+1 (123) 456-7890")("avatar", "assets/img/logo.svg");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.actionItems);
    } }, directives: [_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonHeader, src_app_components_header_header_component__WEBPACK_IMPORTED_MODULE_0__.HeaderComponent, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonList, src_app_components_profile_card_horizontal_profile_card_horizontal_component__WEBPACK_IMPORTED_MODULE_1__.ProfileCardHorizontalComponent, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, src_app_components_action_item_action_item_component__WEBPACK_IMPORTED_MODULE_2__.ActionItemComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLnBhZ2Uuc2NzcyJ9 */"] });


/***/ })

}]);
//# sourceMappingURL=src_app_views_home_home_module_ts.js.map