var actorjs = actorjs || {}; actorjs["persist"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	    PersistLocalStorage: __webpack_require__(1)
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	var PersistLocalStorage = function (type) {

	    this.storage = null;

	    if(type === "local")
	        this.storage = localStorage

	    if(type === "session")
	        this.storage = sessionStorage
	};

	PersistLocalStorage.prototype.read = function(){
	    return JSON.parse(localStorage.getItem('actorjs'));
	}

	PersistLocalStorage.prototype.write = function(event, callback){
	    var store = JSON.parse(localStorage.getItem('actorjs')) || [];
	    store.push(event)
	    localStorage.setItem('actorjs', JSON.stringify(store))
	    callback()
	}


	module.exports = PersistLocalStorage;

/***/ }
/******/ ]);