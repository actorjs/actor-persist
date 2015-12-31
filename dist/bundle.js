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
	    PersistFile: __webpack_require__(1),
	    PersistStorage: __webpack_require__(4),
	    PersistXMLHttp: __webpack_require__(5)
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var fs = __webpack_require__(2);
	var os = __webpack_require__(3);

	var PersistFile = function (file) {

	    this.file = file;

	};

	PersistFile.prototype.read = function(callback){
	    fs.readFile(this.file, 'utf8', function (err, data) {
	        if (err) throw err;
	        console.log('It\'s read!');
	        callback(data);
	    });
	};

	PersistFile.prototype.write = function(event, callback){
	    var line = JSON.stringify(event) + os.EOL;
	    fs.appendFile(this.file, line, function (err) {
	        if (err) throw err;
	        console.log('It\'s write!');
	        callback();
	    });
	};


	module.exports = PersistFile;

/***/ },
/* 2 */
/***/ function(module, exports) {

	

/***/ },
/* 3 */
/***/ function(module, exports) {

	exports.endianness = function () { return 'LE' };

	exports.hostname = function () {
	    if (typeof location !== 'undefined') {
	        return location.hostname
	    }
	    else return '';
	};

	exports.loadavg = function () { return [] };

	exports.uptime = function () { return 0 };

	exports.freemem = function () {
	    return Number.MAX_VALUE;
	};

	exports.totalmem = function () {
	    return Number.MAX_VALUE;
	};

	exports.cpus = function () { return [] };

	exports.type = function () { return 'Browser' };

	exports.release = function () {
	    if (typeof navigator !== 'undefined') {
	        return navigator.appVersion;
	    }
	    return '';
	};

	exports.networkInterfaces
	= exports.getNetworkInterfaces
	= function () { return {} };

	exports.arch = function () { return 'javascript' };

	exports.platform = function () { return 'browser' };

	exports.tmpdir = exports.tmpDir = function () {
	    return '/tmp';
	};

	exports.EOL = '\n';


/***/ },
/* 4 */
/***/ function(module, exports) {

	var PersistLocalStorage = function (type) {

	    this.storage = null;

	    if (type === "local")
	        this.storage = localStorage

	    if (type === "session")
	        this.storage = sessionStorage
	};

	PersistLocalStorage.prototype.read = function (path, callback) {

	    var events = JSON.parse(localStorage.getItem('actorjs'));
	    if (events) {
	        events.forEach(function (event) {
	            if (event.path === path)
	                callback(event);
	        })
	    };
	};

	PersistLocalStorage.prototype.write = function (event, callback) {
	    var store = JSON.parse(localStorage.getItem('actorjs')) || [];
	    store.push(event)
	    localStorage.setItem('actorjs', JSON.stringify(store))
	    callback()
	}


	module.exports = PersistLocalStorage;

/***/ },
/* 5 */
/***/ function(module, exports) {

	var PersistXMLHttp = function (url) {
	    this.url = url;
	};

	PersistXMLHttp.prototype.read = function(id, callback){

	    var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	        if (xhttp.readyState == 4 && xhttp.status == 200) {
	            var events = JSON.parse(xhttp.responseText)
	            callback(events);
	        }
	    };
	    xhttp.open("GET", this.url + "?id=" + id, true);
	    xhttp.send();
	}

	PersistXMLHttp.prototype.write = function(event, callback){
	    var xhttp = new XMLHttpRequest();
	    xhttp.onreadystatechange = function() {
	        if (xhttp.readyState == 4 && xhttp.status == 200) {
	            callback();
	        }
	    };
	    xhttp.open("POST", this.url, true);
	    xhttp.setRequestHeader("Content-type", "application/json");
	    xhttp.send(JSON.stringify(event));
	}


	module.exports = PersistXMLHttp;

/***/ }
/******/ ]);