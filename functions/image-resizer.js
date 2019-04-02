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
/******/ 	return __webpack_require__(__webpack_require__.s = "./image-resizer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./image-resizer.js":
/*!**************************!*\
  !*** ./image-resizer.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

// const im = require('imagemagick');
// let axios = require('axios');
//
// exports.handler = async (event, content, cb) => {
//
//     let body = JSON.parse(event.body)
//     // console.log(body)
//     let ext = body.ext.substr(1, body.ext.length)
//     // console.log(body)
//     const operation = event.queryStringParameters ? event.queryStringParameters.operation : null;
//     let data = JSON.parse(event.body);
//             im.resize({
//                 srcPath: body.img,
//                 width: body.w
//
//             })
//     // return await operate(data);
//     // switch (operation) {
//     //     case 'ping':
//     //         return sendRes(200, 'pong');
//     //     case 'convert':
//     //         return await operate(data);
//     //     default:
//     //         return sendRes(401, `Unrecognized operation "${operation}"`);
//     //
//     // }
// }
//     // axios.get(body.img)
//     //     .then(function (response) {
//     //         im.resize({
//     //             srcPath: body.img,
//     //             width: body.w,
//     //
//     //         })
//              // console.log(response.data);
//             // const pipeline = sharp()
//             //     .rotate()
//             //     .resize(300,300)
//             //     .jpeg({
//             //         quality: 10,
//             //     })
//             //     .toBuffer()
//             //     .then( data => {
//             //         // console.log(data)
//             //         cb({
//             //             statusCode: 200,
//             //             body: {
//             //                 img: data,
//             //                 message: "Hello, World"
//             //             }
//             //         })
//             //     })
//             //     .catch( err => {
//             //         console.log(err)
//             //         cb(err)
//             //     });
//             //
//             // request(body.img).pipe(pipeline)
//
//             // let img = sharp({ url: body.img, encoding: null })
//             //     img
//             //     .resize(body.w)
//             //     // .toFormat(ext)
//             //
//             //     .jpeg({
//             //         quality: 10,
//             //     })
//             //     .toBuffer()
//             //
//             //     .then( data => {
//             //         // console.log(data)
//             //         cb({
//             //             statusCode: 200,
//             //             body: {
//             //                 img: data,
//             //                 message: "Hello, World"
//             //             }
//             //         })
//             //     })
//             //     .catch( err => {
//             //          console.log(err)
//             //         cb(err)
//             //     } );
//         // })
// //         .catch(function (error) {
// //              console.log(error);
// //             cb(error)
// // });
//
//
//
// const sendRes = (status, body) => {
//     var response = {
//         statusCode: status,
//         headers: {
//             "Content-Type": "text/html"
//         },
//         body: body
//     };
//     return response;
// }
//
// const operate = async (body) => {
//     const customArgs = body.customArgs.split(',') || [];
//     let outputExtension = 'png';
//     let inputFile = null, outputFile = null;
//
//     try {
//         if (body.base64Image) {
//             inputFile = '/tmp/inputFile.png';
//             const buffer = new Buffer(body.base64Image, 'base64');
//             fs.writeFileSync(inputFile, buffer);
//             customArgs.unshift(inputFile); // customArgs should be like [inputFile, options, outputfile]
//         }
//
//         outputFile = `/tmp/outputFile.${outputExtension}`;
//         customArgs.push(outputFile);
//
//         await performConvert(customArgs);
//         let fileBuffer = new Buffer(fs.readFileSync(outputFile));
//         fs.unlinkSync(outputFile);
//         return sendRes(200, '<img src="data:image/png;base64,' + fileBuffer.toString('base64') + '"//>');
//
//     } catch (e) {
//         console.log(`Error:${e}`);
//         return sendRes(500, e);
//     }
// }
//
// const performConvert = (params) => {
//     return new Promise(function (res, rej) {
//         im.convert(params, (err) => {
//             if (err) {
//                 console.log(`Error${err}`);
//                 rej(err);
//             } else {
//                 res('operation completed successfully');
//             }
//         });
//     });
// }

/***/ })

/******/ })));