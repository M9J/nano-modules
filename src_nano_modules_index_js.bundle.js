"use strict";
(self["webpackChunknano_modules"] = self["webpackChunknano_modules"] || []).push([["src_nano_modules_index_js"],{

/***/ "./src/nano_modules/HelloWorld/HelloWorld.js":
/*!***************************************************!*\
  !*** ./src/nano_modules/HelloWorld/HelloWorld.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HelloWorld)
/* harmony export */ });
class HelloWorld {
  MODULE_NAME = "Demo First Program";
  MODULE_DESCRIPTION = "First Custom Nano Module";
  MODULE_VERSION = "1.0";
  MODULE_MAIN = () => "Hello world";
}


/***/ }),

/***/ "./src/nano_modules/TodayDate/TodayDate.js":
/*!*************************************************!*\
  !*** ./src/nano_modules/TodayDate/TodayDate.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TodayDate)
/* harmony export */ });
class TodayDate {
  MODULE_NAME = "Today Date";
  MODULE_DESCRIPTION = "Prints today's date and time";
  MODULE_VERSION = "0.1";
  MODULE_MAIN = () => this.todayDate();

  todayDate() {
    return new Date().toLocaleString();
  }
}


/***/ }),

/***/ "./src/nano_modules/index.js":
/*!***********************************!*\
  !*** ./src/nano_modules/index.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _HelloWorld_HelloWorld_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HelloWorld/HelloWorld.js */ "./src/nano_modules/HelloWorld/HelloWorld.js");
/* harmony import */ var _TodayDate_TodayDate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TodayDate/TodayDate.js */ "./src/nano_modules/TodayDate/TodayDate.js");



const INDEX = [_TodayDate_TodayDate_js__WEBPACK_IMPORTED_MODULE_1__["default"], _HelloWorld_HelloWorld_js__WEBPACK_IMPORTED_MODULE_0__["default"]];

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (INDEX);
// export default [];


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX25hbm9fbW9kdWxlc19pbmRleF9qcy5idW5kbGUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDTGU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUb0Q7QUFDSDs7QUFFakQsZUFBZSwrREFBUyxFQUFFLGlFQUFVOztBQUVwQyxpRUFBZSxLQUFLLEVBQUM7QUFDckIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9uYW5vX21vZHVsZXMvLi9zcmMvbmFub19tb2R1bGVzL0hlbGxvV29ybGQvSGVsbG9Xb3JsZC5qcyIsIndlYnBhY2s6Ly9uYW5vX21vZHVsZXMvLi9zcmMvbmFub19tb2R1bGVzL1RvZGF5RGF0ZS9Ub2RheURhdGUuanMiLCJ3ZWJwYWNrOi8vbmFub19tb2R1bGVzLy4vc3JjL25hbm9fbW9kdWxlcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBjbGFzcyBIZWxsb1dvcmxkIHtcbiAgTU9EVUxFX05BTUUgPSBcIkRlbW8gRmlyc3QgUHJvZ3JhbVwiO1xuICBNT0RVTEVfREVTQ1JJUFRJT04gPSBcIkZpcnN0IEN1c3RvbSBOYW5vIE1vZHVsZVwiO1xuICBNT0RVTEVfVkVSU0lPTiA9IFwiMS4wXCI7XG4gIE1PRFVMRV9NQUlOID0gKCkgPT4gXCJIZWxsbyB3b3JsZFwiO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9kYXlEYXRlIHtcbiAgTU9EVUxFX05BTUUgPSBcIlRvZGF5IERhdGVcIjtcbiAgTU9EVUxFX0RFU0NSSVBUSU9OID0gXCJQcmludHMgdG9kYXkncyBkYXRlIGFuZCB0aW1lXCI7XG4gIE1PRFVMRV9WRVJTSU9OID0gXCIwLjFcIjtcbiAgTU9EVUxFX01BSU4gPSAoKSA9PiB0aGlzLnRvZGF5RGF0ZSgpO1xuXG4gIHRvZGF5RGF0ZSgpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoKS50b0xvY2FsZVN0cmluZygpO1xuICB9XG59XG4iLCJpbXBvcnQgSGVsbG9Xb3JsZCBmcm9tIFwiLi9IZWxsb1dvcmxkL0hlbGxvV29ybGQuanNcIjtcbmltcG9ydCBUb2RheURhdGUgZnJvbSBcIi4vVG9kYXlEYXRlL1RvZGF5RGF0ZS5qc1wiO1xuXG5jb25zdCBJTkRFWCA9IFtUb2RheURhdGUsIEhlbGxvV29ybGRdO1xuXG5leHBvcnQgZGVmYXVsdCBJTkRFWDtcbi8vIGV4cG9ydCBkZWZhdWx0IFtdO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9