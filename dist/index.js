/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 970:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 25:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(970);
const github = __nccwpck_require__(25);

const VERSION_REGEX = /(?<major>\d+)\.(?<minor>\d+)\.(?<patch>\d+)(?<snapshot>-snapshot)?/i;
try {
    const current = core.getInput("current");
    const increment = core.getInput("increment");
    let snapshot = core.getInput("snapshot");
    let result;
    if (!!current) {
        console.log("Current Version: " + current);
    }
    if (current.match(VERSION_REGEX)) {
        result = current;
    } else {
        result = "0.0.0";
    }

    if (snapshot == "true") {
        snapshot = true;
    } else {
        snapshot = false;
    }
    console.log("Is snapshot: " + snapshot);
    switch (increment) {
        case "major":
            result = result.replace(VERSION_REGEX, (match, major, minor, patch, _) => {
                return `${parseInt(major) + 1}.0.0${snapshot ? "-snapshot" : ""}`;
            });
            break;
        case "minor":
            result = result.replace(VERSION_REGEX, (match, major, minor, patch, _) => {
                return `${major}.${parseInt(minor) + 1}.0${snapshot ? "-snapshot" : ""}`;
            });
            break;
        case "patch":
            result = result.replace(VERSION_REGEX, (match, major, minor, patch, _) => {
                return `${major}.${minor}.${parseInt(patch) + 1}${snapshot ? "-snapshot" : ""}`;
            });
            break;
        default:
            throw new Error("Invalid increment type");
    }
    core.setOutput("version", result);
} catch (error) {
    core.setFailed(error.message);
    return;
}
})();

module.exports = __webpack_exports__;
/******/ })()
;