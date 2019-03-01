(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./create-website-discovery.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./create-website-discovery.js":
/*!*************************************!*\
  !*** ./create-website-discovery.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// const mongoose = require('mongoose');
// const WebsiteDiscoveryQuestionsModel = require('../model/WebsiteDiscoveryQuestions.js');
//
// const mongoString = "mongodb+srv://josh-icraft:" + process.env.MONGO_DB_ATLAS_PW + "@cluster0-vqqfc.mongodb.net/test?retryWrites=true"
//
// let database;
//
// function dbConnectAndExecute(dbUrl, fn) {
//     database = mongoose.connect(dbUrl, { useNewUrlParser: true })
//     return dbExecute(database, fn);
// }
//
// const createErrorResponse = (statusCode, message) => ({
//     statusCode: statusCode || 501,
//     headers: { 'Content-Type': 'text/plain' },
//     body: message || 'Incorrect id',
// })
//
// const dbExecute = (db, fn) => {
//     return db.then(fn)
//         .catch((err) => {
//             console.log(err)
//             database.close()
//         })
//         .finally(() => {
//             console.log(db)
//             database.disconnect()
//         })
// }
//
// exports.handler = function (event, content, cb) {
//     const data = JSON.parse(event.body);
//
//     const newDocument = new WebsiteDiscoveryQuestionsModel({
//         createdOn: Date.now(),
//         results: data.results,
//         endResult: data.endResult,
//         selections: data.selections
//     });
//
//     dbConnectAndExecute(mongoString, () => {
//         newDocument
//             .save()
//             .then(() => cb(null, {
//                 statusCode: 200,
//                 body: JSON.stringify({ id: newDocument.id }),
//             }))
//             .catch(err => cb(null, createErrorResponse(err.statusCode, err.message)))
//     })
//
// }

/***/ })

/******/ })));