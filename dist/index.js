(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["vue-elucidate"] = factory(require("vue"));
	else
		root["vue-elucidate"] = factory(root["vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if (item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function (modules, mediaQuery) {
		if (typeof modules === "string") modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for (var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if (typeof id === "number") alreadyImportedModules[id] = true;
		}
		for (i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if (mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if (mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(12)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/* see js/src/javascript/index.js */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

 JS Beautifier
---------------


  Written by Einar Lielmanis, <einar@jsbeautifier.org>
      http://jsbeautifier.org/

  Originally converted to javascript by Vital, <vital76@gmail.com>
  "End braces on own line" added by Chris J. Shull, <chrisjshull@gmail.com>
  Parsing improvements for brace-less statements by Liam Newman <bitwiseman@gmail.com>


  Usage:
    js_beautify(js_source_text);
    js_beautify(js_source_text, options);

  The options are:
    indent_size (default 4)          - indentation size,
    indent_char (default space)      - character to indent with,
    preserve_newlines (default true) - whether existing line breaks should be preserved,
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk,

    jslint_happy (default false) - if true, then jslint-stricter mode is enforced.

            jslint_happy        !jslint_happy
            ---------------------------------
            function ()         function()

            switch () {         switch() {
            case 1:               case 1:
              break;                break;
            }                   }

    space_after_anon_function (default false) - should the space before an anonymous function's parens be added, "function()" vs "function ()",
          NOTE: This option is overriden by jslint_happy (i.e. if jslint_happy is true, space_after_anon_function is true by design)

    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none" | any of the former + ",preserve-inline"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
            preserve-inline will try to preserve inline blocks of curly braces

    space_before_conditional (default true) - should the space before conditional statement be added, "if(true)" vs "if (true)",

    unescape_strings (default false) - should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"

    wrap_line_length (default unlimited) - lines should wrap at next opportunity after this number of characters.
          NOTE: This is not a hard limit. Lines will continue until a point where a newline would
                be preserved if it were present.

    end_with_newline (default false)  - end output with a newline


    e.g

    js_beautify(js_source_text, {
      'indent_size': 1,
      'indent_char': '\t'
    });

*/

(function () {
    var legacy_beautify_js =
    /******/function (modules) {
        // webpackBootstrap
        /******/ // The module cache
        /******/var installedModules = {};
        /******/
        /******/ // The require function
        /******/function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/if (installedModules[moduleId]) {
                /******/return installedModules[moduleId].exports;
                /******/
            }
            /******/ // Create a new module (and put it into the cache)
            /******/var module = installedModules[moduleId] = {
                /******/i: moduleId,
                /******/l: false,
                /******/exports: {}
                /******/ };
            /******/
            /******/ // Execute the module function
            /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ // Flag the module as loaded
            /******/module.l = true;
            /******/
            /******/ // Return the exports of the module
            /******/return module.exports;
            /******/
        }
        /******/
        /******/
        /******/ // expose the modules object (__webpack_modules__)
        /******/__webpack_require__.m = modules;
        /******/
        /******/ // expose the module cache
        /******/__webpack_require__.c = installedModules;
        /******/
        /******/ // identity function for calling harmony imports with the correct context
        /******/__webpack_require__.i = function (value) {
            return value;
        };
        /******/
        /******/ // define getter function for harmony exports
        /******/__webpack_require__.d = function (exports, name, getter) {
            /******/if (!__webpack_require__.o(exports, name)) {
                /******/Object.defineProperty(exports, name, {
                    /******/configurable: false,
                    /******/enumerable: true,
                    /******/get: getter
                    /******/ });
                /******/
            }
            /******/
        };
        /******/
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/__webpack_require__.n = function (module) {
            /******/var getter = module && module.__esModule ?
            /******/function getDefault() {
                return module['default'];
            } :
            /******/function getModuleExports() {
                return module;
            };
            /******/__webpack_require__.d(getter, 'a', getter);
            /******/return getter;
            /******/
        };
        /******/
        /******/ // Object.prototype.hasOwnProperty.call
        /******/__webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/ // __webpack_public_path__
        /******/__webpack_require__.p = "";
        /******/
        /******/ // Load entry module and return exports
        /******/return __webpack_require__(__webpack_require__.s = 6);
        /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports) {

        /* jshint curly: false */
        // This section of code is taken from acorn.
        //
        // Acorn was written by Marijn Haverbeke and released under an MIT
        // license. The Unicode regexps (for identifiers and whitespace) were
        // taken from [Esprima](http://esprima.org) by Ariya Hidayat.
        //
        // Git repositories for Acorn are available at
        //
        //     http://marijnhaverbeke.nl/git/acorn
        //     https://github.com/marijnh/acorn.git

        // ## Character categories

        // Big ugly regular expressions that match characters in the
        // whitespace, identifier, and identifier-start categories. These
        // are only applied when a character is found to actually have a
        // code point above 128.

        var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
        var nonASCIIidentifierStartChars = '\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC';
        var nonASCIIidentifierChars = '\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u0620-\u0649\u0672-\u06D3\u06E7-\u06E8\u06FB-\u06FC\u0730-\u074A\u0800-\u0814\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0840-\u0857\u08E4-\u08FE\u0900-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962-\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09D7\u09DF-\u09E0\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5F-\u0B60\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2-\u0CE3\u0CE6-\u0CEF\u0D02\u0D03\u0D46-\u0D48\u0D57\u0D62-\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E34-\u0E3A\u0E40-\u0E45\u0E50-\u0E59\u0EB4-\u0EB9\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F41-\u0F47\u0F71-\u0F84\u0F86-\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1029\u1040-\u1049\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u170E-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17B2\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1920-\u192B\u1930-\u193B\u1951-\u196D\u19B0-\u19C0\u19C8-\u19C9\u19D0-\u19D9\u1A00-\u1A15\u1A20-\u1A53\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1B46-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C00-\u1C22\u1C40-\u1C49\u1C5B-\u1C7D\u1CD0-\u1CD2\u1D00-\u1DBE\u1E01-\u1F15\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2D81-\u2D96\u2DE0-\u2DFF\u3021-\u3028\u3099\u309A\uA640-\uA66D\uA674-\uA67D\uA69F\uA6F0-\uA6F1\uA7F8-\uA800\uA806\uA80B\uA823-\uA827\uA880-\uA881\uA8B4-\uA8C4\uA8D0-\uA8D9\uA8F3-\uA8F7\uA900-\uA909\uA926-\uA92D\uA930-\uA945\uA980-\uA983\uA9B3-\uA9C0\uAA00-\uAA27\uAA40-\uAA41\uAA4C-\uAA4D\uAA50-\uAA59\uAA7B\uAAE0-\uAAE9\uAAF2-\uAAF3\uABC0-\uABE1\uABEC\uABED\uABF0-\uABF9\uFB20-\uFB28\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F';
        var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
        var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

        // Whether a single character denotes a newline.

        exports.newline = /[\n\r\u2028\u2029]/;

        // Matches a whole line break (where CRLF is considered a single
        // line break). Used to count lines.

        // in javascript, these two differ
        // in python they are the same, different methods are called on them
        exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
        exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');

        // Test whether a given character code starts an identifier.

        exports.isIdentifierStart = function (code) {
            // permit $ (36) and @ (64). @ is used in ES7 decorators.
            if (code < 65) return code === 36 || code === 64;
            // 65 through 91 are uppercase letters.
            if (code < 91) return true;
            // permit _ (95).
            if (code < 97) return code === 95;
            // 97 through 123 are lowercase letters.
            if (code < 123) return true;
            return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
        };

        // Test whether a given character is part of an identifier.

        exports.isIdentifierChar = function (code) {
            if (code < 48) return code === 36;
            if (code < 58) return true;
            if (code < 65) return false;
            if (code < 91) return true;
            if (code < 97) return code === 95;
            if (code < 123) return true;
            return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
        };

        /***/
    },
    /* 1 */
    /***/function (module, exports, __webpack_require__) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
            The MIT License (MIT)
        
            Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
        
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
        
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
        */

        var mergeOpts = __webpack_require__(3).mergeOpts;
        var acorn = __webpack_require__(0);
        var Output = __webpack_require__(4).Output;
        var Tokenizer = __webpack_require__(7).Tokenizer;

        function remove_redundant_indentation(output, frame) {
            // This implementation is effective but has some issues:
            //     - can cause line wrap to happen too soon due to indent removal
            //           after wrap points are calculated
            // These issues are minor compared to ugly indentation.

            if (frame.multiline_frame || frame.mode === MODE.ForInitializer || frame.mode === MODE.Conditional) {
                return;
            }

            // remove one indent from each line inside this section
            var start_index = frame.start_line_index;

            output.remove_indent(start_index);
        }

        function in_array(what, arr) {
            for (var i = 0; i < arr.length; i += 1) {
                if (arr[i] === what) {
                    return true;
                }
            }
            return false;
        }

        function trim(s) {
            return s.replace(/^\s+|\s+$/g, '');
        }

        function ltrim(s) {
            return s.replace(/^\s+/g, '');
        }

        // function rtrim(s) {
        //     return s.replace(/\s+$/g, '');
        // }


        function generateMapFromStrings(list) {
            var result = {};
            for (var x = 0; x < list.length; x++) {
                // make the mapped names underscored instead of dash
                result[list[x].replace(/-/g, '_')] = list[x];
            }
            return result;
        }

        function sanitizeOperatorPosition(opPosition) {
            opPosition = opPosition || OPERATOR_POSITION.before_newline;

            if (!in_array(opPosition, validPositionValues)) {
                throw new Error("Invalid Option Value: The option 'operator_position' must be one of the following values\n" + validPositionValues + "\nYou passed in: '" + opPosition + "'");
            }

            return opPosition;
        }

        var validPositionValues = ['before-newline', 'after-newline', 'preserve-newline'];

        // Generate map from array
        var OPERATOR_POSITION = generateMapFromStrings(validPositionValues);

        var OPERATOR_POSITION_BEFORE_OR_PRESERVE = [OPERATOR_POSITION.before_newline, OPERATOR_POSITION.preserve_newline];

        var MODE = {
            BlockStatement: 'BlockStatement', // 'BLOCK'
            Statement: 'Statement', // 'STATEMENT'
            ObjectLiteral: 'ObjectLiteral', // 'OBJECT',
            ArrayLiteral: 'ArrayLiteral', //'[EXPRESSION]',
            ForInitializer: 'ForInitializer', //'(FOR-EXPRESSION)',
            Conditional: 'Conditional', //'(COND-EXPRESSION)',
            Expression: 'Expression' //'(EXPRESSION)'
        };

        function Beautifier(js_source_text, options) {
            "use strict";

            var output;
            var tokens = [],
                token_pos;
            var tokenizer;
            var current_token;
            var last_type, last_last_text, indent_string;
            var flags, previous_flags, flag_store;
            var prefix;

            var handlers, opt;
            var baseIndentString = '';

            handlers = {
                'TK_START_EXPR': handle_start_expr,
                'TK_END_EXPR': handle_end_expr,
                'TK_START_BLOCK': handle_start_block,
                'TK_END_BLOCK': handle_end_block,
                'TK_WORD': handle_word,
                'TK_RESERVED': handle_word,
                'TK_SEMICOLON': handle_semicolon,
                'TK_STRING': handle_string,
                'TK_EQUALS': handle_equals,
                'TK_OPERATOR': handle_operator,
                'TK_COMMA': handle_comma,
                'TK_BLOCK_COMMENT': handle_block_comment,
                'TK_COMMENT': handle_comment,
                'TK_DOT': handle_dot,
                'TK_UNKNOWN': handle_unknown,
                'TK_EOF': handle_eof
            };

            function create_flags(flags_base, mode) {
                var next_indent_level = 0;
                if (flags_base) {
                    next_indent_level = flags_base.indentation_level;
                    if (!output.just_added_newline() && flags_base.line_indent_level > next_indent_level) {
                        next_indent_level = flags_base.line_indent_level;
                    }
                }

                var next_flags = {
                    mode: mode,
                    parent: flags_base,
                    last_text: flags_base ? flags_base.last_text : '', // last token text
                    last_word: flags_base ? flags_base.last_word : '', // last 'TK_WORD' passed
                    declaration_statement: false,
                    declaration_assignment: false,
                    multiline_frame: false,
                    inline_frame: false,
                    if_block: false,
                    else_block: false,
                    do_block: false,
                    do_while: false,
                    import_block: false,
                    in_case_statement: false, // switch(..){ INSIDE HERE }
                    in_case: false, // we're on the exact line with "case 0:"
                    case_body: false, // the indented case-action block
                    indentation_level: next_indent_level,
                    line_indent_level: flags_base ? flags_base.line_indent_level : next_indent_level,
                    start_line_index: output.get_line_number(),
                    ternary_depth: 0
                };
                return next_flags;
            }

            // Some interpreters have unexpected results with foo = baz || bar;
            options = options ? options : {};

            // Allow the setting of language/file-type specific options
            // with inheritance of overall settings
            options = mergeOpts(options, 'js');

            opt = {};

            // compatibility, re
            if (options.brace_style === "expand-strict") {
                //graceful handling of deprecated option
                options.brace_style = "expand";
            } else if (options.brace_style === "collapse-preserve-inline") {
                //graceful handling of deprecated option
                options.brace_style = "collapse,preserve-inline";
            } else if (options.braces_on_own_line !== undefined) {
                //graceful handling of deprecated option
                options.brace_style = options.braces_on_own_line ? "expand" : "collapse";
            } else if (!options.brace_style) //Nothing exists to set it
                {
                    options.brace_style = "collapse";
                }

            var brace_style_split = options.brace_style.split(/[^a-zA-Z0-9_\-]+/);
            opt.brace_style = brace_style_split[0];
            opt.brace_preserve_inline = brace_style_split[1] ? brace_style_split[1] : false;

            opt.indent_size = options.indent_size ? parseInt(options.indent_size, 10) : 4;
            opt.indent_char = options.indent_char ? options.indent_char : ' ';
            opt.eol = options.eol ? options.eol : 'auto';
            opt.preserve_newlines = options.preserve_newlines === undefined ? true : options.preserve_newlines;
            opt.unindent_chained_methods = options.unindent_chained_methods === undefined ? false : options.unindent_chained_methods;
            opt.break_chained_methods = options.break_chained_methods === undefined ? false : options.break_chained_methods;
            opt.max_preserve_newlines = options.max_preserve_newlines === undefined ? 0 : parseInt(options.max_preserve_newlines, 10);
            opt.space_in_paren = options.space_in_paren === undefined ? false : options.space_in_paren;
            opt.space_in_empty_paren = options.space_in_empty_paren === undefined ? false : options.space_in_empty_paren;
            opt.jslint_happy = options.jslint_happy === undefined ? false : options.jslint_happy;
            opt.space_after_anon_function = options.space_after_anon_function === undefined ? false : options.space_after_anon_function;
            opt.keep_array_indentation = options.keep_array_indentation === undefined ? false : options.keep_array_indentation;
            opt.space_before_conditional = options.space_before_conditional === undefined ? true : options.space_before_conditional;
            opt.unescape_strings = options.unescape_strings === undefined ? false : options.unescape_strings;
            opt.wrap_line_length = options.wrap_line_length === undefined ? 0 : parseInt(options.wrap_line_length, 10);
            opt.e4x = options.e4x === undefined ? false : options.e4x;
            opt.end_with_newline = options.end_with_newline === undefined ? false : options.end_with_newline;
            opt.comma_first = options.comma_first === undefined ? false : options.comma_first;
            opt.operator_position = sanitizeOperatorPosition(options.operator_position);

            // For testing of beautify ignore:start directive
            opt.test_output_raw = options.test_output_raw === undefined ? false : options.test_output_raw;

            // force opt.space_after_anon_function to true if opt.jslint_happy
            if (opt.jslint_happy) {
                opt.space_after_anon_function = true;
            }

            if (options.indent_with_tabs) {
                opt.indent_char = '\t';
                opt.indent_size = 1;
            }

            if (opt.eol === 'auto') {
                opt.eol = '\n';
                if (js_source_text && acorn.lineBreak.test(js_source_text || '')) {
                    opt.eol = js_source_text.match(acorn.lineBreak)[0];
                }
            }

            opt.eol = opt.eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

            //----------------------------------
            indent_string = '';
            while (opt.indent_size > 0) {
                indent_string += opt.indent_char;
                opt.indent_size -= 1;
            }

            var preindent_index = 0;
            if (js_source_text && js_source_text.length) {
                while (js_source_text.charAt(preindent_index) === ' ' || js_source_text.charAt(preindent_index) === '\t') {
                    preindent_index += 1;
                }
                baseIndentString = js_source_text.substring(0, preindent_index);
                js_source_text = js_source_text.substring(preindent_index);
            }

            last_type = 'TK_START_BLOCK'; // last token type
            last_last_text = ''; // pre-last token text
            output = new Output(indent_string, baseIndentString);

            // If testing the ignore directive, start with output disable set to true
            output.raw = opt.test_output_raw;

            // Stack of parsing/formatting states, including MODE.
            // We tokenize, parse, and output in an almost purely a forward-only stream of token input
            // and formatted output.  This makes the beautifier less accurate than full parsers
            // but also far more tolerant of syntax errors.
            //
            // For example, the default mode is MODE.BlockStatement. If we see a '{' we push a new frame of type
            // MODE.BlockStatement on the the stack, even though it could be object literal.  If we later
            // encounter a ":", we'll switch to to MODE.ObjectLiteral.  If we then see a ";",
            // most full parsers would die, but the beautifier gracefully falls back to
            // MODE.BlockStatement and continues on.
            flag_store = [];
            set_mode(MODE.BlockStatement);

            this.beautify = function () {

                /*jshint onevar:true */
                var sweet_code;
                tokenizer = new Tokenizer(js_source_text, opt, indent_string);
                tokens = tokenizer.tokenize();
                token_pos = 0;

                current_token = get_token();
                while (current_token) {
                    handlers[current_token.type]();

                    last_last_text = flags.last_text;
                    last_type = current_token.type;
                    flags.last_text = current_token.text;

                    token_pos += 1;
                    current_token = get_token();
                }

                sweet_code = output.get_code(opt.end_with_newline, opt.eol);

                return sweet_code;
            };

            function handle_whitespace_and_comments(local_token, preserve_statement_flags) {
                var newlines = local_token.newlines;
                var keep_whitespace = opt.keep_array_indentation && is_array(flags.mode);
                var temp_token = current_token;

                for (var h = 0; h < local_token.comments_before.length; h++) {
                    // The cleanest handling of inline comments is to treat them as though they aren't there.
                    // Just continue formatting and the behavior should be logical.
                    // Also ignore unknown tokens.  Again, this should result in better behavior.
                    current_token = local_token.comments_before[h];
                    handle_whitespace_and_comments(current_token, preserve_statement_flags);
                    handlers[current_token.type](preserve_statement_flags);
                }
                current_token = temp_token;

                if (keep_whitespace) {
                    for (var i = 0; i < newlines; i += 1) {
                        print_newline(i > 0, preserve_statement_flags);
                    }
                } else {
                    if (opt.max_preserve_newlines && newlines > opt.max_preserve_newlines) {
                        newlines = opt.max_preserve_newlines;
                    }

                    if (opt.preserve_newlines) {
                        if (local_token.newlines > 1) {
                            print_newline(false, preserve_statement_flags);
                            for (var j = 1; j < newlines; j += 1) {
                                print_newline(true, preserve_statement_flags);
                            }
                        }
                    }
                }
            }

            // we could use just string.split, but
            // IE doesn't like returning empty strings
            function split_linebreaks(s) {
                //return s.split(/\x0d\x0a|\x0a/);

                s = s.replace(acorn.allLineBreaks, '\n');
                var out = [],
                    idx = s.indexOf("\n");
                while (idx !== -1) {
                    out.push(s.substring(0, idx));
                    s = s.substring(idx + 1);
                    idx = s.indexOf("\n");
                }
                if (s.length) {
                    out.push(s);
                }
                return out;
            }

            var newline_restricted_tokens = ['break', 'continue', 'return', 'throw', 'yield'];

            function allow_wrap_or_preserved_newline(force_linewrap) {
                force_linewrap = force_linewrap === undefined ? false : force_linewrap;

                // Never wrap the first token on a line
                if (output.just_added_newline()) {
                    return;
                }

                var shouldPreserveOrForce = opt.preserve_newlines && current_token.wanted_newline || force_linewrap;
                var operatorLogicApplies = in_array(flags.last_text, tokenizer.positionable_operators) || in_array(current_token.text, tokenizer.positionable_operators);

                if (operatorLogicApplies) {
                    var shouldPrintOperatorNewline = in_array(flags.last_text, tokenizer.positionable_operators) && in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE) || in_array(current_token.text, tokenizer.positionable_operators);
                    shouldPreserveOrForce = shouldPreserveOrForce && shouldPrintOperatorNewline;
                }

                if (shouldPreserveOrForce) {
                    print_newline(false, true);
                } else if (opt.wrap_line_length) {
                    if (last_type === 'TK_RESERVED' && in_array(flags.last_text, newline_restricted_tokens)) {
                        // These tokens should never have a newline inserted
                        // between them and the following expression.
                        return;
                    }
                    var proposed_line_length = output.current_line.get_character_count() + current_token.text.length + (output.space_before_token ? 1 : 0);
                    if (proposed_line_length >= opt.wrap_line_length) {
                        print_newline(false, true);
                    }
                }
            }

            function print_newline(force_newline, preserve_statement_flags) {
                if (!preserve_statement_flags) {
                    if (flags.last_text !== ';' && flags.last_text !== ',' && flags.last_text !== '=' && last_type !== 'TK_OPERATOR') {
                        var next_token = get_token(1);
                        while (flags.mode === MODE.Statement && !(flags.if_block && next_token && next_token.type === 'TK_RESERVED' && next_token.text === 'else') && !flags.do_block) {
                            restore_mode();
                        }
                    }
                }

                if (output.add_new_line(force_newline)) {
                    flags.multiline_frame = true;
                }
            }

            function print_token_line_indentation() {
                if (output.just_added_newline()) {
                    if (opt.keep_array_indentation && is_array(flags.mode) && current_token.wanted_newline) {
                        output.current_line.push(current_token.whitespace_before);
                        output.space_before_token = false;
                    } else if (output.set_indent(flags.indentation_level)) {
                        flags.line_indent_level = flags.indentation_level;
                    }
                }
            }

            function print_token(printable_token) {
                if (output.raw) {
                    output.add_raw_token(current_token);
                    return;
                }

                if (opt.comma_first && last_type === 'TK_COMMA' && output.just_added_newline()) {
                    if (output.previous_line.last() === ',') {
                        var popped = output.previous_line.pop();
                        // if the comma was already at the start of the line,
                        // pull back onto that line and reprint the indentation
                        if (output.previous_line.is_empty()) {
                            output.previous_line.push(popped);
                            output.trim(true);
                            output.current_line.pop();
                            output.trim();
                        }

                        // add the comma in front of the next token
                        print_token_line_indentation();
                        output.add_token(',');
                        output.space_before_token = true;
                    }
                }

                printable_token = printable_token || current_token.text;
                print_token_line_indentation();
                output.add_token(printable_token);
            }

            function indent() {
                flags.indentation_level += 1;
            }

            function deindent() {
                if (flags.indentation_level > 0 && (!flags.parent || flags.indentation_level > flags.parent.indentation_level)) {
                    flags.indentation_level -= 1;
                }
            }

            function set_mode(mode) {
                if (flags) {
                    flag_store.push(flags);
                    previous_flags = flags;
                } else {
                    previous_flags = create_flags(null, mode);
                }

                flags = create_flags(previous_flags, mode);
            }

            function is_array(mode) {
                return mode === MODE.ArrayLiteral;
            }

            function is_expression(mode) {
                return in_array(mode, [MODE.Expression, MODE.ForInitializer, MODE.Conditional]);
            }

            function restore_mode() {
                if (flag_store.length > 0) {
                    previous_flags = flags;
                    flags = flag_store.pop();
                    if (previous_flags.mode === MODE.Statement && !opt.unindent_chained_methods) {
                        remove_redundant_indentation(output, previous_flags);
                    }
                }
            }

            function start_of_object_property() {
                return flags.parent.mode === MODE.ObjectLiteral && flags.mode === MODE.Statement && (flags.last_text === ':' && flags.ternary_depth === 0 || last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set']));
            }

            function start_of_statement() {
                if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD' || last_type === 'TK_RESERVED' && flags.last_text === 'do' || last_type === 'TK_RESERVED' && in_array(flags.last_text, newline_restricted_tokens) && !current_token.wanted_newline || last_type === 'TK_RESERVED' && flags.last_text === 'else' && !(current_token.type === 'TK_RESERVED' && current_token.text === 'if' && !current_token.comments_before.length) || last_type === 'TK_END_EXPR' && (previous_flags.mode === MODE.ForInitializer || previous_flags.mode === MODE.Conditional) || last_type === 'TK_WORD' && flags.mode === MODE.BlockStatement && !flags.in_case && !(current_token.text === '--' || current_token.text === '++') && last_last_text !== 'function' && current_token.type !== 'TK_WORD' && current_token.type !== 'TK_RESERVED' || flags.mode === MODE.ObjectLiteral && (flags.last_text === ':' && flags.ternary_depth === 0 || last_type === 'TK_RESERVED' && in_array(flags.last_text, ['get', 'set']))) {

                    set_mode(MODE.Statement);
                    if (!opt.unindent_chained_methods) {
                        indent();
                    }

                    handle_whitespace_and_comments(current_token, true);

                    // Issue #276:
                    // If starting a new statement with [if, for, while, do], push to a new line.
                    // if (a) if (b) if(c) d(); else e(); else f();
                    if (!start_of_object_property()) {
                        allow_wrap_or_preserved_newline(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['do', 'for', 'if', 'while']));
                    }

                    return true;
                }
                return false;
            }

            function all_lines_start_with(lines, c) {
                for (var i = 0; i < lines.length; i++) {
                    var line = trim(lines[i]);
                    if (line.charAt(0) !== c) {
                        return false;
                    }
                }
                return true;
            }

            function each_line_matches_indent(lines, indent) {
                var i = 0,
                    len = lines.length,
                    line;
                for (; i < len; i++) {
                    line = lines[i];
                    // allow empty lines to pass through
                    if (line && line.indexOf(indent) !== 0) {
                        return false;
                    }
                }
                return true;
            }

            function is_special_word(word) {
                return in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else']);
            }

            function get_token(offset) {
                var index = token_pos + (offset || 0);
                return index < 0 || index >= tokens.length ? null : tokens[index];
            }

            function handle_start_expr() {
                // The conditional starts the statement if appropriate.
                if (!start_of_statement()) {
                    handle_whitespace_and_comments(current_token);
                }

                var next_mode = MODE.Expression;
                if (current_token.text === '[') {

                    if (last_type === 'TK_WORD' || flags.last_text === ')') {
                        // this is array index specifier, break immediately
                        // a[x], fn()[x]
                        if (last_type === 'TK_RESERVED' && in_array(flags.last_text, tokenizer.line_starters)) {
                            output.space_before_token = true;
                        }
                        set_mode(next_mode);
                        print_token();
                        indent();
                        if (opt.space_in_paren) {
                            output.space_before_token = true;
                        }
                        return;
                    }

                    next_mode = MODE.ArrayLiteral;
                    if (is_array(flags.mode)) {
                        if (flags.last_text === '[' || flags.last_text === ',' && (last_last_text === ']' || last_last_text === '}')) {
                            // ], [ goes to new line
                            // }, [ goes to new line
                            if (!opt.keep_array_indentation) {
                                print_newline();
                            }
                        }
                    }
                } else {
                    if (last_type === 'TK_RESERVED' && flags.last_text === 'for') {
                        next_mode = MODE.ForInitializer;
                    } else if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['if', 'while'])) {
                        next_mode = MODE.Conditional;
                    } else {
                        // next_mode = MODE.Expression;
                    }
                }

                if (flags.last_text === ';' || last_type === 'TK_START_BLOCK') {
                    print_newline();
                } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || flags.last_text === '.') {
                    // TODO: Consider whether forcing this is required.  Review failing tests when removed.
                    allow_wrap_or_preserved_newline(current_token.wanted_newline);
                    // do nothing on (( and )( and ][ and ]( and .(
                } else if (!(last_type === 'TK_RESERVED' && current_token.text === '(') && last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
                    output.space_before_token = true;
                } else if (last_type === 'TK_RESERVED' && (flags.last_word === 'function' || flags.last_word === 'typeof') || flags.last_text === '*' && (in_array(last_last_text, ['function', 'yield']) || flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ['{', ',']))) {
                    // function() vs function ()
                    // yield*() vs yield* ()
                    // function*() vs function* ()
                    if (opt.space_after_anon_function) {
                        output.space_before_token = true;
                    }
                } else if (last_type === 'TK_RESERVED' && (in_array(flags.last_text, tokenizer.line_starters) || flags.last_text === 'catch')) {
                    if (opt.space_before_conditional) {
                        output.space_before_token = true;
                    }
                }

                // Should be a space between await and an IIFE
                if (current_token.text === '(' && last_type === 'TK_RESERVED' && flags.last_word === 'await') {
                    output.space_before_token = true;
                }

                // Support of this kind of newline preservation.
                // a = (b &&
                //     (c || d));
                if (current_token.text === '(') {
                    if (last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
                        if (!start_of_object_property()) {
                            allow_wrap_or_preserved_newline();
                        }
                    }
                }

                // Support preserving wrapped arrow function expressions
                // a.b('c',
                //     () => d.e
                // )
                if (current_token.text === '(' && last_type !== 'TK_WORD' && last_type !== 'TK_RESERVED') {
                    allow_wrap_or_preserved_newline();
                }

                set_mode(next_mode);
                print_token();
                if (opt.space_in_paren) {
                    output.space_before_token = true;
                }

                // In all cases, if we newline while inside an expression it should be indented.
                indent();
            }

            function handle_end_expr() {
                // statements inside expressions are not valid syntax, but...
                // statements must all be closed when their container closes
                while (flags.mode === MODE.Statement) {
                    restore_mode();
                }

                handle_whitespace_and_comments(current_token);

                if (flags.multiline_frame) {
                    allow_wrap_or_preserved_newline(current_token.text === ']' && is_array(flags.mode) && !opt.keep_array_indentation);
                }

                if (opt.space_in_paren) {
                    if (last_type === 'TK_START_EXPR' && !opt.space_in_empty_paren) {
                        // () [] no inner space in empty parens like these, ever, ref #320
                        output.trim();
                        output.space_before_token = false;
                    } else {
                        output.space_before_token = true;
                    }
                }
                if (current_token.text === ']' && opt.keep_array_indentation) {
                    print_token();
                    restore_mode();
                } else {
                    restore_mode();
                    print_token();
                }
                remove_redundant_indentation(output, previous_flags);

                // do {} while () // no statement required after
                if (flags.do_while && previous_flags.mode === MODE.Conditional) {
                    previous_flags.mode = MODE.Expression;
                    flags.do_block = false;
                    flags.do_while = false;
                }
            }

            function handle_start_block() {
                handle_whitespace_and_comments(current_token);

                // Check if this is should be treated as a ObjectLiteral
                var next_token = get_token(1);
                var second_token = get_token(2);
                if (second_token && (in_array(second_token.text, [':', ',']) && in_array(next_token.type, ['TK_STRING', 'TK_WORD', 'TK_RESERVED']) || in_array(next_token.text, ['get', 'set', '...']) && in_array(second_token.type, ['TK_WORD', 'TK_RESERVED']))) {
                    // We don't support TypeScript,but we didn't break it for a very long time.
                    // We'll try to keep not breaking it.
                    if (!in_array(last_last_text, ['class', 'interface'])) {
                        set_mode(MODE.ObjectLiteral);
                    } else {
                        set_mode(MODE.BlockStatement);
                    }
                } else if (last_type === 'TK_OPERATOR' && flags.last_text === '=>') {
                    // arrow function: (param1, paramN) => { statements }
                    set_mode(MODE.BlockStatement);
                } else if (in_array(last_type, ['TK_EQUALS', 'TK_START_EXPR', 'TK_COMMA', 'TK_OPERATOR']) || last_type === 'TK_RESERVED' && in_array(flags.last_text, ['return', 'throw', 'import', 'default'])) {
                    // Detecting shorthand function syntax is difficult by scanning forward,
                    //     so check the surrounding context.
                    // If the block is being returned, imported, export default, passed as arg,
                    //     assigned with = or assigned in a nested object, treat as an ObjectLiteral.
                    set_mode(MODE.ObjectLiteral);
                } else {
                    set_mode(MODE.BlockStatement);
                }

                var empty_braces = !next_token.comments_before.length && next_token.text === '}';
                var empty_anonymous_function = empty_braces && flags.last_word === 'function' && last_type === 'TK_END_EXPR';

                if (opt.brace_preserve_inline) // check for inline, set inline_frame if so
                    {
                        // search forward for a newline wanted inside this block
                        var index = 0;
                        var check_token = null;
                        flags.inline_frame = true;
                        do {
                            index += 1;
                            check_token = get_token(index);
                            if (check_token.wanted_newline) {
                                flags.inline_frame = false;
                                break;
                            }
                        } while (check_token.type !== 'TK_EOF' && !(check_token.type === 'TK_END_BLOCK' && check_token.opened === current_token));
                    }

                if ((opt.brace_style === "expand" || opt.brace_style === "none" && current_token.wanted_newline) && !flags.inline_frame) {
                    if (last_type !== 'TK_OPERATOR' && (empty_anonymous_function || last_type === 'TK_EQUALS' || last_type === 'TK_RESERVED' && is_special_word(flags.last_text) && flags.last_text !== 'else')) {
                        output.space_before_token = true;
                    } else {
                        print_newline(false, true);
                    }
                } else {
                    // collapse || inline_frame
                    if (is_array(previous_flags.mode) && (last_type === 'TK_START_EXPR' || last_type === 'TK_COMMA')) {
                        if (last_type === 'TK_COMMA' || opt.space_in_paren) {
                            output.space_before_token = true;
                        }

                        if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' && flags.inline_frame) {
                            allow_wrap_or_preserved_newline();
                            previous_flags.multiline_frame = previous_flags.multiline_frame || flags.multiline_frame;
                            flags.multiline_frame = false;
                        }
                    }
                    if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
                        if (last_type === 'TK_START_BLOCK' && !flags.inline_frame) {
                            print_newline();
                        } else {
                            output.space_before_token = true;
                        }
                    }
                }
                print_token();
                indent();
            }

            function handle_end_block() {
                // statements must all be closed when their container closes
                handle_whitespace_and_comments(current_token);

                while (flags.mode === MODE.Statement) {
                    restore_mode();
                }

                var empty_braces = last_type === 'TK_START_BLOCK';

                if (flags.inline_frame && !empty_braces) {
                    // try inline_frame (only set if opt.braces-preserve-inline) first
                    output.space_before_token = true;
                } else if (opt.brace_style === "expand") {
                    if (!empty_braces) {
                        print_newline();
                    }
                } else {
                    // skip {}
                    if (!empty_braces) {
                        if (is_array(flags.mode) && opt.keep_array_indentation) {
                            // we REALLY need a newline here, but newliner would skip that
                            opt.keep_array_indentation = false;
                            print_newline();
                            opt.keep_array_indentation = true;
                        } else {
                            print_newline();
                        }
                    }
                }
                restore_mode();
                print_token();
            }

            function handle_word() {
                if (current_token.type === 'TK_RESERVED') {
                    if (in_array(current_token.text, ['set', 'get']) && flags.mode !== MODE.ObjectLiteral) {
                        current_token.type = 'TK_WORD';
                    } else if (in_array(current_token.text, ['as', 'from']) && !flags.import_block) {
                        current_token.type = 'TK_WORD';
                    } else if (flags.mode === MODE.ObjectLiteral) {
                        var next_token = get_token(1);
                        if (next_token.text === ':') {
                            current_token.type = 'TK_WORD';
                        }
                    }
                }

                if (start_of_statement()) {
                    // The conditional starts the statement if appropriate.
                    if (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const']) && current_token.type === 'TK_WORD') {
                        flags.declaration_statement = true;
                    }
                } else if (current_token.wanted_newline && !is_expression(flags.mode) && (last_type !== 'TK_OPERATOR' || flags.last_text === '--' || flags.last_text === '++') && last_type !== 'TK_EQUALS' && (opt.preserve_newlines || !(last_type === 'TK_RESERVED' && in_array(flags.last_text, ['var', 'let', 'const', 'set', 'get'])))) {
                    handle_whitespace_and_comments(current_token);
                    print_newline();
                } else {
                    handle_whitespace_and_comments(current_token);
                }

                if (flags.do_block && !flags.do_while) {
                    if (current_token.type === 'TK_RESERVED' && current_token.text === 'while') {
                        // do {} ## while ()
                        output.space_before_token = true;
                        print_token();
                        output.space_before_token = true;
                        flags.do_while = true;
                        return;
                    } else {
                        // do {} should always have while as the next word.
                        // if we don't see the expected while, recover
                        print_newline();
                        flags.do_block = false;
                    }
                }

                // if may be followed by else, or not
                // Bare/inline ifs are tricky
                // Need to unwind the modes correctly: if (a) if (b) c(); else d(); else e();
                if (flags.if_block) {
                    if (!flags.else_block && current_token.type === 'TK_RESERVED' && current_token.text === 'else') {
                        flags.else_block = true;
                    } else {
                        while (flags.mode === MODE.Statement) {
                            restore_mode();
                        }
                        flags.if_block = false;
                        flags.else_block = false;
                    }
                }

                if (current_token.type === 'TK_RESERVED' && (current_token.text === 'case' || current_token.text === 'default' && flags.in_case_statement)) {
                    print_newline();
                    if (flags.case_body || opt.jslint_happy) {
                        // switch cases following one another
                        deindent();
                        flags.case_body = false;
                    }
                    print_token();
                    flags.in_case = true;
                    flags.in_case_statement = true;
                    return;
                }

                if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
                    if (!start_of_object_property()) {
                        allow_wrap_or_preserved_newline();
                    }
                }

                if (current_token.type === 'TK_RESERVED' && current_token.text === 'function') {
                    if (in_array(flags.last_text, ['}', ';']) || output.just_added_newline() && !(in_array(flags.last_text, ['(', '[', '{', ':', '=', ',']) || last_type === 'TK_OPERATOR')) {
                        // make sure there is a nice clean space of at least one blank line
                        // before a new function definition
                        if (!output.just_added_blankline() && !current_token.comments_before.length) {
                            print_newline();
                            print_newline(true);
                        }
                    }
                    if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD') {
                        if (last_type === 'TK_RESERVED' && (in_array(flags.last_text, ['get', 'set', 'new', 'export', 'async']) || in_array(flags.last_text, newline_restricted_tokens))) {
                            output.space_before_token = true;
                        } else if (last_type === 'TK_RESERVED' && flags.last_text === 'default' && last_last_text === 'export') {
                            output.space_before_token = true;
                        } else {
                            print_newline();
                        }
                    } else if (last_type === 'TK_OPERATOR' || flags.last_text === '=') {
                        // foo = function
                        output.space_before_token = true;
                    } else if (!flags.multiline_frame && (is_expression(flags.mode) || is_array(flags.mode))) {
                        // (function
                    } else {
                        print_newline();
                    }

                    print_token();
                    flags.last_word = current_token.text;
                    return;
                }

                prefix = 'NONE';

                if (last_type === 'TK_END_BLOCK') {

                    if (previous_flags.inline_frame) {
                        prefix = 'SPACE';
                    } else if (!(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally', 'from']))) {
                        prefix = 'NEWLINE';
                    } else {
                        if (opt.brace_style === "expand" || opt.brace_style === "end-expand" || opt.brace_style === "none" && current_token.wanted_newline) {
                            prefix = 'NEWLINE';
                        } else {
                            prefix = 'SPACE';
                            output.space_before_token = true;
                        }
                    }
                } else if (last_type === 'TK_SEMICOLON' && flags.mode === MODE.BlockStatement) {
                    // TODO: Should this be for STATEMENT as well?
                    prefix = 'NEWLINE';
                } else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode)) {
                    prefix = 'SPACE';
                } else if (last_type === 'TK_STRING') {
                    prefix = 'NEWLINE';
                } else if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' || flags.last_text === '*' && (in_array(last_last_text, ['function', 'yield']) || flags.mode === MODE.ObjectLiteral && in_array(last_last_text, ['{', ',']))) {
                    prefix = 'SPACE';
                } else if (last_type === 'TK_START_BLOCK') {
                    if (flags.inline_frame) {
                        prefix = 'SPACE';
                    } else {
                        prefix = 'NEWLINE';
                    }
                } else if (last_type === 'TK_END_EXPR') {
                    output.space_before_token = true;
                    prefix = 'NEWLINE';
                }

                if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, tokenizer.line_starters) && flags.last_text !== ')') {
                    if (flags.inline_frame || flags.last_text === 'else' || flags.last_text === 'export') {
                        prefix = 'SPACE';
                    } else {
                        prefix = 'NEWLINE';
                    }
                }

                if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['else', 'catch', 'finally'])) {
                    if ((!(last_type === 'TK_END_BLOCK' && previous_flags.mode === MODE.BlockStatement) || opt.brace_style === "expand" || opt.brace_style === "end-expand" || opt.brace_style === "none" && current_token.wanted_newline) && !flags.inline_frame) {
                        print_newline();
                    } else {
                        output.trim(true);
                        var line = output.current_line;
                        // If we trimmed and there's something other than a close block before us
                        // put a newline back in.  Handles '} // comment' scenario.
                        if (line.last() !== '}') {
                            print_newline();
                        }
                        output.space_before_token = true;
                    }
                } else if (prefix === 'NEWLINE') {
                    if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
                        // no newline between 'return nnn'
                        output.space_before_token = true;
                    } else if (last_type !== 'TK_END_EXPR') {
                        if ((last_type !== 'TK_START_EXPR' || !(current_token.type === 'TK_RESERVED' && in_array(current_token.text, ['var', 'let', 'const']))) && flags.last_text !== ':') {
                            // no need to force newline on 'var': for (var x = 0...)
                            if (current_token.type === 'TK_RESERVED' && current_token.text === 'if' && flags.last_text === 'else') {
                                // no newline for } else if {
                                output.space_before_token = true;
                            } else {
                                print_newline();
                            }
                        }
                    } else if (current_token.type === 'TK_RESERVED' && in_array(current_token.text, tokenizer.line_starters) && flags.last_text !== ')') {
                        print_newline();
                    }
                } else if (flags.multiline_frame && is_array(flags.mode) && flags.last_text === ',' && last_last_text === '}') {
                    print_newline(); // }, in lists get a newline treatment
                } else if (prefix === 'SPACE') {
                    output.space_before_token = true;
                }
                print_token();
                flags.last_word = current_token.text;

                if (current_token.type === 'TK_RESERVED') {
                    if (current_token.text === 'do') {
                        flags.do_block = true;
                    } else if (current_token.text === 'if') {
                        flags.if_block = true;
                    } else if (current_token.text === 'import') {
                        flags.import_block = true;
                    } else if (flags.import_block && current_token.type === 'TK_RESERVED' && current_token.text === 'from') {
                        flags.import_block = false;
                    }
                }
            }

            function handle_semicolon() {
                if (start_of_statement()) {
                    // The conditional starts the statement if appropriate.
                    // Semicolon can be the start (and end) of a statement
                    output.space_before_token = false;
                } else {
                    handle_whitespace_and_comments(current_token);
                }

                var next_token = get_token(1);
                while (flags.mode === MODE.Statement && !(flags.if_block && next_token && next_token.type === 'TK_RESERVED' && next_token.text === 'else') && !flags.do_block) {
                    restore_mode();
                }

                // hacky but effective for the moment
                if (flags.import_block) {
                    flags.import_block = false;
                }
                print_token();
            }

            function handle_string() {
                if (start_of_statement()) {
                    // The conditional starts the statement if appropriate.
                    // One difference - strings want at least a space before
                    output.space_before_token = true;
                } else {
                    handle_whitespace_and_comments(current_token);
                    if (last_type === 'TK_RESERVED' || last_type === 'TK_WORD' || flags.inline_frame) {
                        output.space_before_token = true;
                    } else if (last_type === 'TK_COMMA' || last_type === 'TK_START_EXPR' || last_type === 'TK_EQUALS' || last_type === 'TK_OPERATOR') {
                        if (!start_of_object_property()) {
                            allow_wrap_or_preserved_newline();
                        }
                    } else {
                        print_newline();
                    }
                }
                print_token();
            }

            function handle_equals() {
                if (start_of_statement()) {
                    // The conditional starts the statement if appropriate.
                } else {
                    handle_whitespace_and_comments(current_token);
                }

                if (flags.declaration_statement) {
                    // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
                    flags.declaration_assignment = true;
                }
                output.space_before_token = true;
                print_token();
                output.space_before_token = true;
            }

            function handle_comma() {
                handle_whitespace_and_comments(current_token, true);

                print_token();
                output.space_before_token = true;
                if (flags.declaration_statement) {
                    if (is_expression(flags.parent.mode)) {
                        // do not break on comma, for(var a = 1, b = 2)
                        flags.declaration_assignment = false;
                    }

                    if (flags.declaration_assignment) {
                        flags.declaration_assignment = false;
                        print_newline(false, true);
                    } else if (opt.comma_first) {
                        // for comma-first, we want to allow a newline before the comma
                        // to turn into a newline after the comma, which we will fixup later
                        allow_wrap_or_preserved_newline();
                    }
                } else if (flags.mode === MODE.ObjectLiteral || flags.mode === MODE.Statement && flags.parent.mode === MODE.ObjectLiteral) {
                    if (flags.mode === MODE.Statement) {
                        restore_mode();
                    }

                    if (!flags.inline_frame) {
                        print_newline();
                    }
                } else if (opt.comma_first) {
                    // EXPR or DO_BLOCK
                    // for comma-first, we want to allow a newline before the comma
                    // to turn into a newline after the comma, which we will fixup later
                    allow_wrap_or_preserved_newline();
                }
            }

            function handle_operator() {
                var isGeneratorAsterisk = current_token.text === '*' && (last_type === 'TK_RESERVED' && in_array(flags.last_text, ['function', 'yield']) || in_array(last_type, ['TK_START_BLOCK', 'TK_COMMA', 'TK_END_BLOCK', 'TK_SEMICOLON']));
                var isUnary = in_array(current_token.text, ['-', '+']) && (in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) || in_array(flags.last_text, tokenizer.line_starters) || flags.last_text === ',');

                if (start_of_statement()) {
                    // The conditional starts the statement if appropriate.
                } else {
                    var preserve_statement_flags = !isGeneratorAsterisk;
                    handle_whitespace_and_comments(current_token, preserve_statement_flags);
                }

                if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
                    // "return" had a special handling in TK_WORD. Now we need to return the favor
                    output.space_before_token = true;
                    print_token();
                    return;
                }

                // hack for actionscript's import .*;
                if (current_token.text === '*' && last_type === 'TK_DOT') {
                    print_token();
                    return;
                }

                if (current_token.text === '::') {
                    // no spaces around exotic namespacing syntax operator
                    print_token();
                    return;
                }

                // Allow line wrapping between operators when operator_position is
                //   set to before or preserve
                if (last_type === 'TK_OPERATOR' && in_array(opt.operator_position, OPERATOR_POSITION_BEFORE_OR_PRESERVE)) {
                    allow_wrap_or_preserved_newline();
                }

                if (current_token.text === ':' && flags.in_case) {
                    flags.case_body = true;
                    indent();
                    print_token();
                    print_newline();
                    flags.in_case = false;
                    return;
                }

                var space_before = true;
                var space_after = true;
                var in_ternary = false;
                if (current_token.text === ':') {
                    if (flags.ternary_depth === 0) {
                        // Colon is invalid javascript outside of ternary and object, but do our best to guess what was meant.
                        space_before = false;
                    } else {
                        flags.ternary_depth -= 1;
                        in_ternary = true;
                    }
                } else if (current_token.text === '?') {
                    flags.ternary_depth += 1;
                }

                // let's handle the operator_position option prior to any conflicting logic
                if (!isUnary && !isGeneratorAsterisk && opt.preserve_newlines && in_array(current_token.text, tokenizer.positionable_operators)) {
                    var isColon = current_token.text === ':';
                    var isTernaryColon = isColon && in_ternary;
                    var isOtherColon = isColon && !in_ternary;

                    switch (opt.operator_position) {
                        case OPERATOR_POSITION.before_newline:
                            // if the current token is : and it's not a ternary statement then we set space_before to false
                            output.space_before_token = !isOtherColon;

                            print_token();

                            if (!isColon || isTernaryColon) {
                                allow_wrap_or_preserved_newline();
                            }

                            output.space_before_token = true;
                            return;

                        case OPERATOR_POSITION.after_newline:
                            // if the current token is anything but colon, or (via deduction) it's a colon and in a ternary statement,
                            //   then print a newline.

                            output.space_before_token = true;

                            if (!isColon || isTernaryColon) {
                                if (get_token(1).wanted_newline) {
                                    print_newline(false, true);
                                } else {
                                    allow_wrap_or_preserved_newline();
                                }
                            } else {
                                output.space_before_token = false;
                            }

                            print_token();

                            output.space_before_token = true;
                            return;

                        case OPERATOR_POSITION.preserve_newline:
                            if (!isOtherColon) {
                                allow_wrap_or_preserved_newline();
                            }

                            // if we just added a newline, or the current token is : and it's not a ternary statement,
                            //   then we set space_before to false
                            space_before = !(output.just_added_newline() || isOtherColon);

                            output.space_before_token = space_before;
                            print_token();
                            output.space_before_token = true;
                            return;
                    }
                }

                if (isGeneratorAsterisk) {
                    allow_wrap_or_preserved_newline();
                    space_before = false;
                    var next_token = get_token(1);
                    space_after = next_token && in_array(next_token.type, ['TK_WORD', 'TK_RESERVED']);
                } else if (current_token.text === '...') {
                    allow_wrap_or_preserved_newline();
                    space_before = last_type === 'TK_START_BLOCK';
                    space_after = false;
                } else if (in_array(current_token.text, ['--', '++', '!', '~']) || isUnary) {
                    // unary operators (and binary +/- pretending to be unary) special cases

                    space_before = false;
                    space_after = false;

                    // http://www.ecma-international.org/ecma-262/5.1/#sec-7.9.1
                    // if there is a newline between -- or ++ and anything else we should preserve it.
                    if (current_token.wanted_newline && (current_token.text === '--' || current_token.text === '++')) {
                        print_newline(false, true);
                    }

                    if (flags.last_text === ';' && is_expression(flags.mode)) {
                        // for (;; ++i)
                        //        ^^^
                        space_before = true;
                    }

                    if (last_type === 'TK_RESERVED') {
                        space_before = true;
                    } else if (last_type === 'TK_END_EXPR') {
                        space_before = !(flags.last_text === ']' && (current_token.text === '--' || current_token.text === '++'));
                    } else if (last_type === 'TK_OPERATOR') {
                        // a++ + ++b;
                        // a - -b
                        space_before = in_array(current_token.text, ['--', '-', '++', '+']) && in_array(flags.last_text, ['--', '-', '++', '+']);
                        // + and - are not unary when preceeded by -- or ++ operator
                        // a-- + b
                        // a * +b
                        // a - -b
                        if (in_array(current_token.text, ['+', '-']) && in_array(flags.last_text, ['--', '++'])) {
                            space_after = true;
                        }
                    }

                    if ((flags.mode === MODE.BlockStatement && !flags.inline_frame || flags.mode === MODE.Statement) && (flags.last_text === '{' || flags.last_text === ';')) {
                        // { foo; --i }
                        // foo(); --bar;
                        print_newline();
                    }
                }

                output.space_before_token = output.space_before_token || space_before;
                print_token();
                output.space_before_token = space_after;
            }

            function handle_block_comment(preserve_statement_flags) {
                if (output.raw) {
                    output.add_raw_token(current_token);
                    if (current_token.directives && current_token.directives.preserve === 'end') {
                        // If we're testing the raw output behavior, do not allow a directive to turn it off.
                        output.raw = opt.test_output_raw;
                    }
                    return;
                }

                if (current_token.directives) {
                    print_newline(false, preserve_statement_flags);
                    print_token();
                    if (current_token.directives.preserve === 'start') {
                        output.raw = true;
                    }
                    print_newline(false, true);
                    return;
                }

                // inline block
                if (!acorn.newline.test(current_token.text) && !current_token.wanted_newline) {
                    output.space_before_token = true;
                    print_token();
                    output.space_before_token = true;
                    return;
                }

                var lines = split_linebreaks(current_token.text);
                var j; // iterator for this case
                var javadoc = false;
                var starless = false;
                var lastIndent = current_token.whitespace_before;
                var lastIndentLength = lastIndent.length;

                // block comment starts with a new line
                print_newline(false, preserve_statement_flags);
                if (lines.length > 1) {
                    javadoc = all_lines_start_with(lines.slice(1), '*');
                    starless = each_line_matches_indent(lines.slice(1), lastIndent);
                }

                // first line always indented
                print_token(lines[0]);
                for (j = 1; j < lines.length; j++) {
                    print_newline(false, true);
                    if (javadoc) {
                        // javadoc: reformat and re-indent
                        print_token(' ' + ltrim(lines[j]));
                    } else if (starless && lines[j].length > lastIndentLength) {
                        // starless: re-indent non-empty content, avoiding trim
                        print_token(lines[j].substring(lastIndentLength));
                    } else {
                        // normal comments output raw
                        output.add_token(lines[j]);
                    }
                }

                // for comments of more than one line, make sure there's a new line after
                print_newline(false, preserve_statement_flags);
            }

            function handle_comment(preserve_statement_flags) {
                if (current_token.wanted_newline) {
                    print_newline(false, preserve_statement_flags);
                } else {
                    output.trim(true);
                }

                output.space_before_token = true;
                print_token();
                print_newline(false, preserve_statement_flags);
            }

            function handle_dot() {
                if (start_of_statement()) {
                    // The conditional starts the statement if appropriate.
                } else {
                    handle_whitespace_and_comments(current_token, true);
                }

                if (last_type === 'TK_RESERVED' && is_special_word(flags.last_text)) {
                    output.space_before_token = true;
                } else {
                    // allow preserved newlines before dots in general
                    // force newlines on dots after close paren when break_chained - for bar().baz()
                    allow_wrap_or_preserved_newline(flags.last_text === ')' && opt.break_chained_methods);
                }

                print_token();
            }

            function handle_unknown(preserve_statement_flags) {
                print_token();

                if (current_token.text[current_token.text.length - 1] === '\n') {
                    print_newline(false, preserve_statement_flags);
                }
            }

            function handle_eof() {
                // Unwind any open statements
                while (flags.mode === MODE.Statement) {
                    restore_mode();
                }
                handle_whitespace_and_comments(current_token);
            }
        }

        module.exports.Beautifier = Beautifier;

        /***/
    },
    /* 2 */
    /***/function (module, exports) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
          The MIT License (MIT)
        
          Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
          Permission is hereby granted, free of charge, to any person
          obtaining a copy of this software and associated documentation files
          (the "Software"), to deal in the Software without restriction,
          including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software,
          and to permit persons to whom the Software is furnished to do so,
          subject to the following conditions:
        
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
          BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
          ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
          CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        */

        function InputScanner(input) {
            var _input = input;
            var _input_length = _input.length;
            var _position = 0;

            this.back = function () {
                _position -= 1;
            };

            this.hasNext = function () {
                return _position < _input_length;
            };

            this.next = function () {
                var val = null;
                if (this.hasNext()) {
                    val = _input.charAt(_position);
                    _position += 1;
                }
                return val;
            };

            this.peek = function (index) {
                var val = null;
                index = index || 0;
                index += _position;
                if (index >= 0 && index < _input_length) {
                    val = _input.charAt(index);
                }
                return val;
            };

            this.peekCharCode = function (index) {
                var val = 0;
                index = index || 0;
                index += _position;
                if (index >= 0 && index < _input_length) {
                    val = _input.charCodeAt(index);
                }
                return val;
            };

            this.test = function (pattern, index) {
                index = index || 0;
                pattern.lastIndex = _position + index;
                return pattern.test(_input);
            };

            this.testChar = function (pattern, index) {
                var val = this.peek(index);
                return val !== null && pattern.test(val);
            };

            this.match = function (pattern) {
                pattern.lastIndex = _position;
                var pattern_match = pattern.exec(_input);
                if (pattern_match && pattern_match.index === _position) {
                    _position += pattern_match[0].length;
                } else {
                    pattern_match = null;
                }
                return pattern_match;
            };
        }

        module.exports.InputScanner = InputScanner;

        /***/
    },
    /* 3 */
    /***/function (module, exports) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
            The MIT License (MIT)
        
            Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
        
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
        
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
        */

        function mergeOpts(allOptions, targetType) {
            var finalOpts = {};
            var name;

            for (name in allOptions) {
                if (name !== targetType) {
                    finalOpts[name] = allOptions[name];
                }
            }

            //merge in the per type settings for the targetType
            if (targetType in allOptions) {
                for (name in allOptions[targetType]) {
                    finalOpts[name] = allOptions[targetType][name];
                }
            }
            return finalOpts;
        }

        module.exports.mergeOpts = mergeOpts;

        /***/
    },
    /* 4 */
    /***/function (module, exports) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
          The MIT License (MIT)
        
          Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
          Permission is hereby granted, free of charge, to any person
          obtaining a copy of this software and associated documentation files
          (the "Software"), to deal in the Software without restriction,
          including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software,
          and to permit persons to whom the Software is furnished to do so,
          subject to the following conditions:
        
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
          BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
          ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
          CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        */

        function OutputLine(parent) {
            var _character_count = 0;
            // use indent_count as a marker for lines that have preserved indentation
            var _indent_count = -1;

            var _items = [];
            var _empty = true;

            this.set_indent = function (level) {
                _character_count = parent.baseIndentLength + level * parent.indent_length;
                _indent_count = level;
            };

            this.get_character_count = function () {
                return _character_count;
            };

            this.is_empty = function () {
                return _empty;
            };

            this.last = function () {
                if (!this._empty) {
                    return _items[_items.length - 1];
                } else {
                    return null;
                }
            };

            this.push = function (input) {
                _items.push(input);
                _character_count += input.length;
                _empty = false;
            };

            this.pop = function () {
                var item = null;
                if (!_empty) {
                    item = _items.pop();
                    _character_count -= item.length;
                    _empty = _items.length === 0;
                }
                return item;
            };

            this.remove_indent = function () {
                if (_indent_count > 0) {
                    _indent_count -= 1;
                    _character_count -= parent.indent_length;
                }
            };

            this.trim = function () {
                while (this.last() === ' ') {
                    _items.pop();
                    _character_count -= 1;
                }
                _empty = _items.length === 0;
            };

            this.toString = function () {
                var result = '';
                if (!this._empty) {
                    if (_indent_count >= 0) {
                        result = parent.indent_cache[_indent_count];
                    }
                    result += _items.join('');
                }
                return result;
            };
        }

        function Output(indent_string, baseIndentString) {
            baseIndentString = baseIndentString || '';
            this.indent_cache = [baseIndentString];
            this.baseIndentLength = baseIndentString.length;
            this.indent_length = indent_string.length;
            this.raw = false;

            var lines = [];
            this.baseIndentString = baseIndentString;
            this.indent_string = indent_string;
            this.previous_line = null;
            this.current_line = null;
            this.space_before_token = false;

            this.add_outputline = function () {
                this.previous_line = this.current_line;
                this.current_line = new OutputLine(this);
                lines.push(this.current_line);
            };

            // initialize
            this.add_outputline();

            this.get_line_number = function () {
                return lines.length;
            };

            // Using object instead of string to allow for later expansion of info about each line
            this.add_new_line = function (force_newline) {
                if (this.get_line_number() === 1 && this.just_added_newline()) {
                    return false; // no newline on start of file
                }

                if (force_newline || !this.just_added_newline()) {
                    if (!this.raw) {
                        this.add_outputline();
                    }
                    return true;
                }

                return false;
            };

            this.get_code = function (end_with_newline, eol) {
                var sweet_code = lines.join('\n').replace(/[\r\n\t ]+$/, '');

                if (end_with_newline) {
                    sweet_code += '\n';
                }

                if (eol !== '\n') {
                    sweet_code = sweet_code.replace(/[\n]/g, eol);
                }

                return sweet_code;
            };

            this.set_indent = function (level) {
                // Never indent your first output indent at the start of the file
                if (lines.length > 1) {
                    while (level >= this.indent_cache.length) {
                        this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
                    }

                    this.current_line.set_indent(level);
                    return true;
                }
                this.current_line.set_indent(0);
                return false;
            };

            this.add_raw_token = function (token) {
                for (var x = 0; x < token.newlines; x++) {
                    this.add_outputline();
                }
                this.current_line.push(token.whitespace_before);
                this.current_line.push(token.text);
                this.space_before_token = false;
            };

            this.add_token = function (printable_token) {
                this.add_space_before_token();
                this.current_line.push(printable_token);
            };

            this.add_space_before_token = function () {
                if (this.space_before_token && !this.just_added_newline()) {
                    this.current_line.push(' ');
                }
                this.space_before_token = false;
            };

            this.remove_indent = function (index) {
                var output_length = lines.length;
                while (index < output_length) {
                    lines[index].remove_indent();
                    index++;
                }
            };

            this.trim = function (eat_newlines) {
                eat_newlines = eat_newlines === undefined ? false : eat_newlines;

                this.current_line.trim(indent_string, baseIndentString);

                while (eat_newlines && lines.length > 1 && this.current_line.is_empty()) {
                    lines.pop();
                    this.current_line = lines[lines.length - 1];
                    this.current_line.trim();
                }

                this.previous_line = lines.length > 1 ? lines[lines.length - 2] : null;
            };

            this.just_added_newline = function () {
                return this.current_line.is_empty();
            };

            this.just_added_blankline = function () {
                if (this.just_added_newline()) {
                    if (lines.length === 1) {
                        return true; // start of the file and newline = blank
                    }

                    var line = lines[lines.length - 2];
                    return line.is_empty();
                }
                return false;
            };
        }

        module.exports.Output = Output;

        /***/
    },
    /* 5 */
    /***/function (module, exports) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
          The MIT License (MIT)
        
          Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
          Permission is hereby granted, free of charge, to any person
          obtaining a copy of this software and associated documentation files
          (the "Software"), to deal in the Software without restriction,
          including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software,
          and to permit persons to whom the Software is furnished to do so,
          subject to the following conditions:
        
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
          BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
          ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
          CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        */

        function Token(type, text, newlines, whitespace_before, parent) {
            this.type = type;
            this.text = text;

            // comments_before are
            // comments that have a new line before them
            // and may or may not have a newline after
            // this is a set of comments before
            this.comments_before = /* inline comment*/[];

            this.comments_after = []; // no new line before and newline after
            this.newlines = newlines || 0;
            this.wanted_newline = newlines > 0;
            this.whitespace_before = whitespace_before || '';
            this.parent = parent || null;
            this.opened = null;
            this.directives = null;
        }

        module.exports.Token = Token;

        /***/
    },
    /* 6 */
    /***/function (module, exports, __webpack_require__) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
            The MIT License (MIT)
        
            Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
        
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
        
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
        */

        var Beautifier = __webpack_require__(1).Beautifier;

        function js_beautify(js_source_text, options) {
            var beautifier = new Beautifier(js_source_text, options);
            return beautifier.beautify();
        }

        module.exports = js_beautify;

        /***/
    },
    /* 7 */
    /***/function (module, exports, __webpack_require__) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
            The MIT License (MIT)
        
            Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
        
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
        
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
        */

        var InputScanner = __webpack_require__(2).InputScanner;
        var Token = __webpack_require__(5).Token;
        var acorn = __webpack_require__(0);

        function trim(s) {
            return s.replace(/^\s+|\s+$/g, '');
        }

        function in_array(what, arr) {
            for (var i = 0; i < arr.length; i += 1) {
                if (arr[i] === what) {
                    return true;
                }
            }
            return false;
        }

        function Tokenizer(input_string, opts) {

            var whitespace = "\n\r\t ".split('');
            var digit = /[0-9]/;
            var digit_bin = /[01]/;
            var digit_oct = /[01234567]/;
            var digit_hex = /[0123456789abcdefABCDEF]/;

            this.positionable_operators = '!= !== % & && * ** + - / : < << <= == === > >= >> >>> ? ^ | ||'.split(' ');
            var punct = this.positionable_operators.concat(
            // non-positionable operators - these do not follow operator position settings
            '! %= &= *= **= ++ += , -- -= /= :: <<= = => >>= >>>= ^= |= ~ ...'.split(' '));

            // words which should always start on new line.
            this.line_starters = 'continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export'.split(',');
            var reserved_words = this.line_starters.concat(['do', 'in', 'of', 'else', 'get', 'set', 'new', 'catch', 'finally', 'typeof', 'yield', 'async', 'await', 'from', 'as']);

            //  /* ... */ comment ends with nearest */ or end of file
            var block_comment_pattern = /([\s\S]*?)((?:\*\/)|$)/g;

            // comment ends just before nearest linefeed or end of file
            var comment_pattern = /([^\n\r\u2028\u2029]*)/g;

            var directives_block_pattern = /\/\* beautify( \w+[:]\w+)+ \*\//g;
            var directive_pattern = / (\w+)[:](\w+)/g;
            var directives_end_ignore_pattern = /([\s\S]*?)((?:\/\*\sbeautify\signore:end\s\*\/)|$)/g;

            var template_pattern = /((<\?php|<\?=)[\s\S]*?\?>)|(<%[\s\S]*?%>)/g;

            var n_newlines, whitespace_before_token, in_html_comment, tokens;
            var input;

            this.tokenize = function () {
                input = new InputScanner(input_string);
                in_html_comment = false;
                tokens = [];

                var next, last;
                var token_values;
                var open = null;
                var open_stack = [];
                var comments = [];

                while (!(last && last.type === 'TK_EOF')) {
                    token_values = tokenize_next();
                    next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
                    while (next.type === 'TK_COMMENT' || next.type === 'TK_BLOCK_COMMENT' || next.type === 'TK_UNKNOWN') {
                        if (next.type === 'TK_BLOCK_COMMENT') {
                            next.directives = token_values[2];
                        }
                        comments.push(next);
                        token_values = tokenize_next();
                        next = new Token(token_values[1], token_values[0], n_newlines, whitespace_before_token);
                    }

                    if (comments.length) {
                        next.comments_before = comments;
                        comments = [];
                    }

                    if (next.type === 'TK_START_BLOCK' || next.type === 'TK_START_EXPR') {
                        next.parent = last;
                        open_stack.push(open);
                        open = next;
                    } else if ((next.type === 'TK_END_BLOCK' || next.type === 'TK_END_EXPR') && open && (next.text === ']' && open.text === '[' || next.text === ')' && open.text === '(' || next.text === '}' && open.text === '{')) {
                        next.parent = open.parent;
                        next.opened = open;

                        open = open_stack.pop();
                    }

                    tokens.push(next);
                    last = next;
                }

                return tokens;
            };

            function get_directives(text) {
                if (!text.match(directives_block_pattern)) {
                    return null;
                }

                var directives = {};
                directive_pattern.lastIndex = 0;
                var directive_match = directive_pattern.exec(text);

                while (directive_match) {
                    directives[directive_match[1]] = directive_match[2];
                    directive_match = directive_pattern.exec(text);
                }

                return directives;
            }

            function tokenize_next() {
                var resulting_string;
                var whitespace_on_this_line = [];

                n_newlines = 0;
                whitespace_before_token = '';

                var c = input.next();

                if (c === null) {
                    return ['', 'TK_EOF'];
                }

                var last_token;
                if (tokens.length) {
                    last_token = tokens[tokens.length - 1];
                } else {
                    // For the sake of tokenizing we can pretend that there was on open brace to start
                    last_token = new Token('TK_START_BLOCK', '{');
                }

                while (in_array(c, whitespace)) {

                    if (acorn.newline.test(c)) {
                        if (!(c === '\n' && input.peek(-2) === '\r')) {
                            n_newlines += 1;
                            whitespace_on_this_line = [];
                        }
                    } else {
                        whitespace_on_this_line.push(c);
                    }

                    c = input.next();

                    if (c === null) {
                        return ['', 'TK_EOF'];
                    }
                }

                if (whitespace_on_this_line.length) {
                    whitespace_before_token = whitespace_on_this_line.join('');
                }

                if (digit.test(c) || c === '.' && input.testChar(digit)) {
                    var allow_decimal = true;
                    var allow_e = true;
                    var local_digit = digit;

                    if (c === '0' && input.testChar(/[XxOoBb]/)) {
                        // switch to hex/oct/bin number, no decimal or e, just hex/oct/bin digits
                        allow_decimal = false;
                        allow_e = false;
                        if (input.testChar(/[Bb]/)) {
                            local_digit = digit_bin;
                        } else if (input.testChar(/[Oo]/)) {
                            local_digit = digit_oct;
                        } else {
                            local_digit = digit_hex;
                        }
                        c += input.next();
                    } else if (c === '.') {
                        // Already have a decimal for this literal, don't allow another
                        allow_decimal = false;
                    } else {
                        // we know this first loop will run.  It keeps the logic simpler.
                        c = '';
                        input.back();
                    }

                    // Add the digits
                    while (input.testChar(local_digit)) {
                        c += input.next();

                        if (allow_decimal && input.peek() === '.') {
                            c += input.next();
                            allow_decimal = false;
                        }

                        // a = 1.e-7 is valid, so we test for . then e in one loop
                        if (allow_e && input.testChar(/[Ee]/)) {
                            c += input.next();

                            if (input.testChar(/[+-]/)) {
                                c += input.next();
                            }

                            allow_e = false;
                            allow_decimal = false;
                        }
                    }

                    return [c, 'TK_WORD'];
                }

                if (acorn.isIdentifierStart(input.peekCharCode(-1))) {
                    if (input.hasNext()) {
                        while (acorn.isIdentifierChar(input.peekCharCode())) {
                            c += input.next();
                            if (!input.hasNext()) {
                                break;
                            }
                        }
                    }

                    if (!(last_token.type === 'TK_DOT' || last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['set', 'get'])) && in_array(c, reserved_words)) {
                        if (c === 'in' || c === 'of') {
                            // hack for 'in' and 'of' operators
                            return [c, 'TK_OPERATOR'];
                        }
                        return [c, 'TK_RESERVED'];
                    }

                    return [c, 'TK_WORD'];
                }

                if (c === '(' || c === '[') {
                    return [c, 'TK_START_EXPR'];
                }

                if (c === ')' || c === ']') {
                    return [c, 'TK_END_EXPR'];
                }

                if (c === '{') {
                    return [c, 'TK_START_BLOCK'];
                }

                if (c === '}') {
                    return [c, 'TK_END_BLOCK'];
                }

                if (c === ';') {
                    return [c, 'TK_SEMICOLON'];
                }

                if (c === '/') {
                    var comment = '';
                    var comment_match;
                    // peek for comment /* ... */
                    if (input.peek() === '*') {
                        input.next();
                        comment_match = input.match(block_comment_pattern);
                        comment = '/*' + comment_match[0];
                        var directives = get_directives(comment);
                        if (directives && directives.ignore === 'start') {
                            comment_match = input.match(directives_end_ignore_pattern);
                            comment += comment_match[0];
                        }
                        comment = comment.replace(acorn.allLineBreaks, '\n');
                        return [comment, 'TK_BLOCK_COMMENT', directives];
                    }
                    // peek for comment // ...
                    if (input.peek() === '/') {
                        input.next();
                        comment_match = input.match(comment_pattern);
                        comment = '//' + comment_match[0];
                        return [comment, 'TK_COMMENT'];
                    }
                }

                var startXmlRegExp = /<()([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;

                if (c === '`' || c === "'" || c === '"' || // string
                (c === '/' || // regexp
                opts.e4x && c === "<" && input.test(startXmlRegExp, -1) // xml
                ) && ( // regex and xml can only appear in specific locations during parsing
                last_token.type === 'TK_RESERVED' && in_array(last_token.text, ['return', 'case', 'throw', 'else', 'do', 'typeof', 'yield']) || last_token.type === 'TK_END_EXPR' && last_token.text === ')' && last_token.parent && last_token.parent.type === 'TK_RESERVED' && in_array(last_token.parent.text, ['if', 'while', 'for']) || in_array(last_token.type, ['TK_COMMENT', 'TK_START_EXPR', 'TK_START_BLOCK', 'TK_END_BLOCK', 'TK_OPERATOR', 'TK_EQUALS', 'TK_EOF', 'TK_SEMICOLON', 'TK_COMMA']))) {

                    var sep = c,
                        esc = false,
                        has_char_escapes = false;

                    resulting_string = c;

                    if (sep === '/') {
                        //
                        // handle regexp
                        //
                        var in_char_class = false;
                        while (input.hasNext() && (esc || in_char_class || input.peek() !== sep) && !input.testChar(acorn.newline)) {
                            resulting_string += input.peek();
                            if (!esc) {
                                esc = input.peek() === '\\';
                                if (input.peek() === '[') {
                                    in_char_class = true;
                                } else if (input.peek() === ']') {
                                    in_char_class = false;
                                }
                            } else {
                                esc = false;
                            }
                            input.next();
                        }
                    } else if (opts.e4x && sep === '<') {
                        //
                        // handle e4x xml literals
                        //

                        var xmlRegExp = /[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[\s\S]+?}|!\[CDATA\[[\s\S]*?\]\])(\s+{[\s\S]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{[\s\S]+?}))*\s*(\/?)\s*>/g;
                        input.back();
                        var xmlStr = '';
                        var match = input.match(startXmlRegExp);
                        if (match) {
                            // Trim root tag to attempt to
                            var rootTag = match[2].replace(/^{\s+/, '{').replace(/\s+}$/, '}');
                            var isCurlyRoot = rootTag.indexOf('{') === 0;
                            var depth = 0;
                            while (match) {
                                var isEndTag = !!match[1];
                                var tagName = match[2];
                                var isSingletonTag = !!match[match.length - 1] || tagName.slice(0, 8) === "![CDATA[";
                                if (!isSingletonTag && (tagName === rootTag || isCurlyRoot && tagName.replace(/^{\s+/, '{').replace(/\s+}$/, '}'))) {
                                    if (isEndTag) {
                                        --depth;
                                    } else {
                                        ++depth;
                                    }
                                }
                                xmlStr += match[0];
                                if (depth <= 0) {
                                    break;
                                }
                                match = input.match(xmlRegExp);
                            }
                            // if we didn't close correctly, keep unformatted.
                            if (!match) {
                                xmlStr += input.match(/[\s\S]*/g)[0];
                            }
                            xmlStr = xmlStr.replace(acorn.allLineBreaks, '\n');
                            return [xmlStr, "TK_STRING"];
                        }
                    } else {
                        //
                        // handle string
                        //
                        var parse_string = function parse_string(delimiter, allow_unescaped_newlines, start_sub) {
                            // Template strings can travers lines without escape characters.
                            // Other strings cannot
                            var current_char;
                            while (input.hasNext()) {
                                current_char = input.peek();
                                if (!(esc || current_char !== delimiter && (allow_unescaped_newlines || !acorn.newline.test(current_char)))) {
                                    break;
                                }

                                // Handle \r\n linebreaks after escapes or in template strings
                                if ((esc || allow_unescaped_newlines) && acorn.newline.test(current_char)) {
                                    if (current_char === '\r' && input.peek(1) === '\n') {
                                        input.next();
                                        current_char = input.peek();
                                    }
                                    resulting_string += '\n';
                                } else {
                                    resulting_string += current_char;
                                }

                                if (esc) {
                                    if (current_char === 'x' || current_char === 'u') {
                                        has_char_escapes = true;
                                    }
                                    esc = false;
                                } else {
                                    esc = current_char === '\\';
                                }

                                input.next();

                                if (start_sub && resulting_string.indexOf(start_sub, resulting_string.length - start_sub.length) !== -1) {
                                    if (delimiter === '`') {
                                        parse_string('}', allow_unescaped_newlines, '`');
                                    } else {
                                        parse_string('`', allow_unescaped_newlines, '${');
                                    }

                                    if (input.hasNext()) {
                                        resulting_string += input.next();
                                    }
                                }
                            }
                        };

                        if (sep === '`') {
                            parse_string('`', true, '${');
                        } else {
                            parse_string(sep);
                        }
                    }

                    if (has_char_escapes && opts.unescape_strings) {
                        resulting_string = unescape_string(resulting_string);
                    }

                    if (input.peek() === sep) {
                        resulting_string += sep;
                        input.next();

                        if (sep === '/') {
                            // regexps may have modifiers /regexp/MOD , so fetch those, too
                            // Only [gim] are valid, but if the user puts in garbage, do what we can to take it.
                            while (input.hasNext() && acorn.isIdentifierStart(input.peekCharCode())) {
                                resulting_string += input.next();
                            }
                        }
                    }
                    return [resulting_string, 'TK_STRING'];
                }

                if (c === '#') {

                    if (tokens.length === 0 && input.peek() === '!') {
                        // shebang
                        resulting_string = c;
                        while (input.hasNext() && c !== '\n') {
                            c = input.next();
                            resulting_string += c;
                        }
                        return [trim(resulting_string) + '\n', 'TK_UNKNOWN'];
                    }

                    // Spidermonkey-specific sharp variables for circular references
                    // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
                    // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
                    var sharp = '#';
                    if (input.hasNext() && input.testChar(digit)) {
                        do {
                            c = input.next();
                            sharp += c;
                        } while (input.hasNext() && c !== '#' && c !== '=');
                        if (c === '#') {
                            //
                        } else if (input.peek() === '[' && input.peek(1) === ']') {
                            sharp += '[]';
                            input.next();
                            input.next();
                        } else if (input.peek() === '{' && input.peek(1) === '}') {
                            sharp += '{}';
                            input.next();
                            input.next();
                        }
                        return [sharp, 'TK_WORD'];
                    }
                }

                if (c === '<' && (input.peek() === '?' || input.peek() === '%')) {
                    input.back();
                    var template_match = input.match(template_pattern);
                    if (template_match) {
                        c = template_match[0];
                        c = c.replace(acorn.allLineBreaks, '\n');
                        return [c, 'TK_STRING'];
                    }
                }

                if (c === '<' && input.match(/\!--/g)) {
                    c = '<!--';
                    while (input.hasNext() && !input.testChar(acorn.newline)) {
                        c += input.next();
                    }
                    in_html_comment = true;
                    return [c, 'TK_COMMENT'];
                }

                if (c === '-' && in_html_comment && input.match(/->/g)) {
                    in_html_comment = false;
                    return ['-->', 'TK_COMMENT'];
                }

                if (c === '.') {
                    if (input.peek() === '.' && input.peek(1) === '.') {
                        c += input.next() + input.next();
                        return [c, 'TK_OPERATOR'];
                    }
                    return [c, 'TK_DOT'];
                }

                if (in_array(c, punct)) {
                    while (input.hasNext() && in_array(c + input.peek(), punct)) {
                        c += input.next();
                        if (!input.hasNext()) {
                            break;
                        }
                    }

                    if (c === ',') {
                        return [c, 'TK_COMMA'];
                    } else if (c === '=') {
                        return [c, 'TK_EQUALS'];
                    } else {
                        return [c, 'TK_OPERATOR'];
                    }
                }

                return [c, 'TK_UNKNOWN'];
            }

            function unescape_string(s) {
                // You think that a regex would work for this
                // return s.replace(/\\x([0-9a-f]{2})/gi, function(match, val) {
                //         return String.fromCharCode(parseInt(val, 16));
                //     })
                // However, dealing with '\xff', '\\xff', '\\\xff' makes this more fun.
                var out = '',
                    escaped = 0;

                var input_scan = new InputScanner(s);
                var matched = null;

                while (input_scan.hasNext()) {
                    // Keep any whitespace, non-slash characters
                    // also keep slash pairs.
                    matched = input_scan.match(/([\s]|[^\\]|\\\\)+/g);

                    if (matched) {
                        out += matched[0];
                    }

                    if (input_scan.peek() === '\\') {
                        input_scan.next();
                        if (input_scan.peek() === 'x') {
                            matched = input_scan.match(/x([0-9A-Fa-f]{2})/g);
                        } else if (input_scan.peek() === 'u') {
                            matched = input_scan.match(/u([0-9A-Fa-f]{4})/g);
                        } else {
                            out += '\\';
                            if (input_scan.hasNext()) {
                                out += input_scan.next();
                            }
                            continue;
                        }

                        // If there's some error decoding, return the original string
                        if (!matched) {
                            return s;
                        }

                        escaped = parseInt(matched[1], 16);

                        if (escaped > 0x7e && escaped <= 0xff && matched[0].indexOf('x') === 0) {
                            // we bail out on \x7f..\xff,
                            // leaving whole string escaped,
                            // as it's probably completely binary
                            return s;
                        } else if (escaped >= 0x00 && escaped < 0x20) {
                            // leave 0x00...0x1f escaped
                            out += '\\' + matched[0];
                            continue;
                        } else if (escaped === 0x22 || escaped === 0x27 || escaped === 0x5c) {
                            // single-quote, apostrophe, backslash - escape these
                            out += '\\' + String.fromCharCode(escaped);
                        } else {
                            out += String.fromCharCode(escaped);
                        }
                    }
                }

                return out;
            }
        }

        module.exports.Tokenizer = Tokenizer;

        /***/
    }]
    /******/);
    var js_beautify = legacy_beautify_js;
    /* Footer */
    if (true) {
        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return { js_beautify: js_beautify };
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        // Add support for CommonJS. Just put this file somewhere on your require.paths
        // and you will be able to `var js_beautify = require("beautify").js_beautify`.
        exports.js_beautify = js_beautify;
    } else if (typeof window !== "undefined") {
        // If we're running a web page and don't have either of the above, add our one global
        window.js_beautify = js_beautify;
    } else if (typeof global !== "undefined") {
        // If we don't even have window, try global.
        global.js_beautify = js_beautify;
    }
})();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 CSS Beautifier
---------------

    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

    Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
        http://jsbeautifier.org/

    Usage:
        css_beautify(source_text);
        css_beautify(source_text, options);

    The options are (default in brackets):
        indent_size (4)                         — indentation size,
        indent_char (space)                     — character to indent with,
        selector_separator_newline (true)       - separate selectors with newline or
                                                  not (e.g. "a,\nbr" or "a, br")
        end_with_newline (false)                - end with a newline
        newline_between_rules (true)            - add a new line after every css rule
        space_around_selector_separator (false) - ensure space around selector separators:
                                                  '>', '+', '~' (e.g. "a>b" -> "a > b")
    e.g

    css_beautify(css_source_text, {
      'indent_size': 1,
      'indent_char': '\t',
      'selector_separator': ' ',
      'end_with_newline': false,
      'newline_between_rules': true,
      'space_around_selector_separator': true
    });
*/

// http://www.w3.org/TR/CSS21/syndata.html#tokenization
// http://www.w3.org/TR/css3-syntax/

(function () {
    var legacy_beautify_css =
    /******/function (modules) {
        // webpackBootstrap
        /******/ // The module cache
        /******/var installedModules = {};
        /******/
        /******/ // The require function
        /******/function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/if (installedModules[moduleId]) {
                /******/return installedModules[moduleId].exports;
                /******/
            }
            /******/ // Create a new module (and put it into the cache)
            /******/var module = installedModules[moduleId] = {
                /******/i: moduleId,
                /******/l: false,
                /******/exports: {}
                /******/ };
            /******/
            /******/ // Execute the module function
            /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ // Flag the module as loaded
            /******/module.l = true;
            /******/
            /******/ // Return the exports of the module
            /******/return module.exports;
            /******/
        }
        /******/
        /******/
        /******/ // expose the modules object (__webpack_modules__)
        /******/__webpack_require__.m = modules;
        /******/
        /******/ // expose the module cache
        /******/__webpack_require__.c = installedModules;
        /******/
        /******/ // identity function for calling harmony imports with the correct context
        /******/__webpack_require__.i = function (value) {
            return value;
        };
        /******/
        /******/ // define getter function for harmony exports
        /******/__webpack_require__.d = function (exports, name, getter) {
            /******/if (!__webpack_require__.o(exports, name)) {
                /******/Object.defineProperty(exports, name, {
                    /******/configurable: false,
                    /******/enumerable: true,
                    /******/get: getter
                    /******/ });
                /******/
            }
            /******/
        };
        /******/
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/__webpack_require__.n = function (module) {
            /******/var getter = module && module.__esModule ?
            /******/function getDefault() {
                return module['default'];
            } :
            /******/function getModuleExports() {
                return module;
            };
            /******/__webpack_require__.d(getter, 'a', getter);
            /******/return getter;
            /******/
        };
        /******/
        /******/ // Object.prototype.hasOwnProperty.call
        /******/__webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/ // __webpack_public_path__
        /******/__webpack_require__.p = "";
        /******/
        /******/ // Load entry module and return exports
        /******/return __webpack_require__(__webpack_require__.s = 4);
        /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
          The MIT License (MIT)
        
          Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
          Permission is hereby granted, free of charge, to any person
          obtaining a copy of this software and associated documentation files
          (the "Software"), to deal in the Software without restriction,
          including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software,
          and to permit persons to whom the Software is furnished to do so,
          subject to the following conditions:
        
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
          BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
          ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
          CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        */

        var mergeOpts = __webpack_require__(2).mergeOpts;
        var acorn = __webpack_require__(1);
        var Output = __webpack_require__(3).Output;

        var lineBreak = acorn.lineBreak;
        var allLineBreaks = acorn.allLineBreaks;

        function Beautifier(source_text, options) {
            options = options || {};

            // Allow the setting of language/file-type specific options
            // with inheritance of overall settings
            options = mergeOpts(options, 'css');

            source_text = source_text || '';

            var newlinesFromLastWSEat = 0;
            var indentSize = options.indent_size ? parseInt(options.indent_size, 10) : 4;
            var indentCharacter = options.indent_char || ' ';
            var preserve_newlines = options.preserve_newlines === undefined ? false : options.preserve_newlines;
            var selectorSeparatorNewline = options.selector_separator_newline === undefined ? true : options.selector_separator_newline;
            var end_with_newline = options.end_with_newline === undefined ? false : options.end_with_newline;
            var newline_between_rules = options.newline_between_rules === undefined ? true : options.newline_between_rules;
            var space_around_combinator = options.space_around_combinator === undefined ? false : options.space_around_combinator;
            space_around_combinator = space_around_combinator || (options.space_around_selector_separator === undefined ? false : options.space_around_selector_separator);
            var eol = options.eol ? options.eol : 'auto';

            if (options.indent_with_tabs) {
                indentCharacter = '\t';
                indentSize = 1;
            }

            if (eol === 'auto') {
                eol = '\n';
                if (source_text && lineBreak.test(source_text || '')) {
                    eol = source_text.match(lineBreak)[0];
                }
            }

            eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

            // HACK: newline parsing inconsistent. This brute force normalizes the input.
            source_text = source_text.replace(allLineBreaks, '\n');

            // tokenizer
            var whiteRe = /^\s+$/;

            var pos = -1,
                ch;
            var parenLevel = 0;

            function next() {
                ch = source_text.charAt(++pos);
                return ch || '';
            }

            function peek(skipWhitespace) {
                var result = '';
                var prev_pos = pos;
                if (skipWhitespace) {
                    eatWhitespace();
                }
                result = source_text.charAt(pos + 1) || '';
                pos = prev_pos - 1;
                next();
                return result;
            }

            function eatString(endChars) {
                var start = pos;
                while (next()) {
                    if (ch === "\\") {
                        next();
                    } else if (endChars.indexOf(ch) !== -1) {
                        break;
                    } else if (ch === "\n") {
                        break;
                    }
                }
                return source_text.substring(start, pos + 1);
            }

            function peekString(endChar) {
                var prev_pos = pos;
                var str = eatString(endChar);
                pos = prev_pos - 1;
                next();
                return str;
            }

            function eatWhitespace(preserve_newlines_local) {
                var result = 0;
                while (whiteRe.test(peek())) {
                    next();
                    if (ch === '\n' && preserve_newlines_local && preserve_newlines) {
                        output.add_new_line(true);
                        result++;
                    }
                }
                newlinesFromLastWSEat = result;
                return result;
            }

            function skipWhitespace() {
                var result = '';
                if (ch && whiteRe.test(ch)) {
                    result = ch;
                }
                while (whiteRe.test(next())) {
                    result += ch;
                }
                return result;
            }

            function eatComment() {
                var start = pos;
                var singleLine = peek() === "/";
                next();
                while (next()) {
                    if (!singleLine && ch === "*" && peek() === "/") {
                        next();
                        break;
                    } else if (singleLine && ch === "\n") {
                        return source_text.substring(start, pos);
                    }
                }

                return source_text.substring(start, pos) + ch;
            }

            function lookBack(str) {
                return source_text.substring(pos - str.length, pos).toLowerCase() === str;
            }

            // Nested pseudo-class if we are insideRule
            // and the next special character found opens
            // a new block
            function foundNestedPseudoClass() {
                var openParen = 0;
                for (var i = pos + 1; i < source_text.length; i++) {
                    var ch = source_text.charAt(i);
                    if (ch === "{") {
                        return true;
                    } else if (ch === '(') {
                        // pseudoclasses can contain ()
                        openParen += 1;
                    } else if (ch === ')') {
                        if (openParen === 0) {
                            return false;
                        }
                        openParen -= 1;
                    } else if (ch === ";" || ch === "}") {
                        return false;
                    }
                }
                return false;
            }

            // printer
            var baseIndentString = '';
            var preindent_index = 0;
            if (source_text && source_text.length) {
                while (source_text.charAt(preindent_index) === ' ' || source_text.charAt(preindent_index) === '\t') {
                    preindent_index += 1;
                }
                baseIndentString = source_text.substring(0, preindent_index);
                js_source_text = source_text.substring(preindent_index);
            }

            var singleIndent = new Array(indentSize + 1).join(indentCharacter);
            var indentLevel;
            var nestedLevel;
            var output;

            function print_string(output_string) {
                if (output.just_added_newline()) {
                    output.set_indent(indentLevel);
                }
                output.add_token(output_string);
            }

            function preserveSingleSpace(isAfterSpace) {
                if (isAfterSpace) {
                    output.space_before_token = true;
                }
            }

            function indent() {
                indentLevel++;
            }

            function outdent() {
                if (indentLevel > 0) {
                    indentLevel--;
                }
            }

            /*_____________________--------------------_____________________*/

            this.beautify = function () {
                // reset
                output = new Output(singleIndent, baseIndentString);
                indentLevel = 0;
                nestedLevel = 0;

                pos = -1;
                ch = null;
                parenLevel = 0;

                var insideRule = false;
                var insidePropertyValue = false;
                var enteringConditionalGroup = false;
                var top_ch = '';
                var last_top_ch = '';

                while (true) {
                    var whitespace = skipWhitespace();
                    var isAfterSpace = whitespace !== '';
                    var isAfterNewline = whitespace.indexOf('\n') !== -1;
                    last_top_ch = top_ch;
                    top_ch = ch;

                    if (!ch) {
                        break;
                    } else if (ch === '/' && peek() === '*') {
                        /* css comment */
                        var header = indentLevel === 0;

                        if (isAfterNewline || header) {
                            output.add_new_line();
                        }

                        print_string(eatComment());
                        output.add_new_line();
                        if (header) {
                            output.add_new_line(true);
                        }
                    } else if (ch === '/' && peek() === '/') {
                        // single line comment
                        if (!isAfterNewline && last_top_ch !== '{') {
                            output.trim(true);
                        }
                        output.space_before_token = true;
                        print_string(eatComment());
                        output.add_new_line();
                    } else if (ch === '@') {
                        preserveSingleSpace(isAfterSpace);

                        // deal with less propery mixins @{...}
                        if (peek() === '{') {
                            print_string(eatString('}'));
                        } else {
                            print_string(ch);

                            // strip trailing space, if present, for hash property checks
                            var variableOrRule = peekString(": ,;{}()[]/='\"");

                            if (variableOrRule.match(/[ :]$/)) {
                                // we have a variable or pseudo-class, add it and insert one space before continuing
                                next();
                                variableOrRule = eatString(": ").replace(/\s$/, '');
                                print_string(variableOrRule);
                                output.space_before_token = true;
                            }

                            variableOrRule = variableOrRule.replace(/\s$/, '');

                            // might be a nesting at-rule
                            if (variableOrRule in this.NESTED_AT_RULE) {
                                nestedLevel += 1;
                                if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
                                    enteringConditionalGroup = true;
                                }
                            }
                        }
                    } else if (ch === '#' && peek() === '{') {
                        preserveSingleSpace(isAfterSpace);
                        print_string(eatString('}'));
                    } else if (ch === '{') {
                        if (peek(true) === '}') {
                            eatWhitespace();
                            next();
                            output.space_before_token = true;
                            print_string("{}");
                            if (!eatWhitespace(true)) {
                                output.add_new_line();
                            }

                            if (newlinesFromLastWSEat < 2 && newline_between_rules && indentLevel === 0) {
                                output.add_new_line(true);
                            }
                        } else {
                            indent();
                            output.space_before_token = true;
                            print_string(ch);
                            if (!eatWhitespace(true)) {
                                output.add_new_line();
                            }

                            // when entering conditional groups, only rulesets are allowed
                            if (enteringConditionalGroup) {
                                enteringConditionalGroup = false;
                                insideRule = indentLevel > nestedLevel;
                            } else {
                                // otherwise, declarations are also allowed
                                insideRule = indentLevel >= nestedLevel;
                            }
                        }
                    } else if (ch === '}') {
                        outdent();
                        output.add_new_line();
                        print_string(ch);
                        insideRule = false;
                        insidePropertyValue = false;
                        if (nestedLevel) {
                            nestedLevel--;
                        }

                        if (!eatWhitespace(true)) {
                            output.add_new_line();
                        }

                        if (newlinesFromLastWSEat < 2 && newline_between_rules && indentLevel === 0) {
                            output.add_new_line(true);
                        }
                    } else if (ch === ":") {
                        eatWhitespace();
                        if ((insideRule || enteringConditionalGroup) && !(lookBack("&") || foundNestedPseudoClass()) && !lookBack("(")) {
                            // 'property: value' delimiter
                            // which could be in a conditional group query
                            print_string(':');
                            if (!insidePropertyValue) {
                                insidePropertyValue = true;
                                output.space_before_token = true;
                            }
                        } else {
                            // sass/less parent reference don't use a space
                            // sass nested pseudo-class don't use a space

                            // preserve space before pseudoclasses/pseudoelements, as it means "in any child"
                            if (lookBack(" ")) {
                                output.space_before_token = true;
                            }
                            if (peek() === ":") {
                                // pseudo-element
                                next();
                                print_string("::");
                            } else {
                                // pseudo-class
                                print_string(':');
                            }
                        }
                    } else if (ch === '"' || ch === '\'') {
                        preserveSingleSpace(isAfterSpace);
                        print_string(eatString(ch));
                    } else if (ch === ';') {
                        insidePropertyValue = false;
                        print_string(ch);
                        if (!eatWhitespace(true)) {
                            output.add_new_line();
                        }
                    } else if (ch === '(') {
                        // may be a url
                        if (lookBack("url")) {
                            print_string(ch);
                            eatWhitespace();
                            if (next()) {
                                if (ch !== ')' && ch !== '"' && ch !== '\'') {
                                    print_string(eatString(')'));
                                } else {
                                    pos--;
                                }
                            }
                        } else {
                            parenLevel++;
                            preserveSingleSpace(isAfterSpace);
                            print_string(ch);
                            eatWhitespace();
                        }
                    } else if (ch === ')') {
                        print_string(ch);
                        parenLevel--;
                    } else if (ch === ',') {
                        print_string(ch);
                        if (!eatWhitespace(true) && selectorSeparatorNewline && !insidePropertyValue && parenLevel < 1) {
                            output.add_new_line();
                        } else {
                            output.space_before_token = true;
                        }
                    } else if ((ch === '>' || ch === '+' || ch === '~') && !insidePropertyValue && parenLevel < 1) {
                        //handle combinator spacing
                        if (space_around_combinator) {
                            output.space_before_token = true;
                            print_string(ch);
                            output.space_before_token = true;
                        } else {
                            print_string(ch);
                            eatWhitespace();
                            // squash extra whitespace
                            if (ch && whiteRe.test(ch)) {
                                ch = '';
                            }
                        }
                    } else if (ch === ']') {
                        print_string(ch);
                    } else if (ch === '[') {
                        preserveSingleSpace(isAfterSpace);
                        print_string(ch);
                    } else if (ch === '=') {
                        // no whitespace before or after
                        eatWhitespace();
                        print_string('=');
                        if (whiteRe.test(ch)) {
                            ch = '';
                        }
                    } else {
                        preserveSingleSpace(isAfterSpace);
                        print_string(ch);
                    }
                }

                var sweetCode = output.get_code(end_with_newline, eol);

                return sweetCode;
            };

            // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
            this.NESTED_AT_RULE = {
                "@page": true,
                "@font-face": true,
                "@keyframes": true,
                // also in CONDITIONAL_GROUP_RULE below
                "@media": true,
                "@supports": true,
                "@document": true
            };
            this.CONDITIONAL_GROUP_RULE = {
                "@media": true,
                "@supports": true,
                "@document": true
            };
        }

        module.exports.Beautifier = Beautifier;

        /***/
    },
    /* 1 */
    /***/function (module, exports) {

        /* jshint curly: false */
        // This section of code is taken from acorn.
        //
        // Acorn was written by Marijn Haverbeke and released under an MIT
        // license. The Unicode regexps (for identifiers and whitespace) were
        // taken from [Esprima](http://esprima.org) by Ariya Hidayat.
        //
        // Git repositories for Acorn are available at
        //
        //     http://marijnhaverbeke.nl/git/acorn
        //     https://github.com/marijnh/acorn.git

        // ## Character categories

        // Big ugly regular expressions that match characters in the
        // whitespace, identifier, and identifier-start categories. These
        // are only applied when a character is found to actually have a
        // code point above 128.

        var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
        var nonASCIIidentifierStartChars = '\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC';
        var nonASCIIidentifierChars = '\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u0620-\u0649\u0672-\u06D3\u06E7-\u06E8\u06FB-\u06FC\u0730-\u074A\u0800-\u0814\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0840-\u0857\u08E4-\u08FE\u0900-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962-\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09D7\u09DF-\u09E0\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5F-\u0B60\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2-\u0CE3\u0CE6-\u0CEF\u0D02\u0D03\u0D46-\u0D48\u0D57\u0D62-\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E34-\u0E3A\u0E40-\u0E45\u0E50-\u0E59\u0EB4-\u0EB9\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F41-\u0F47\u0F71-\u0F84\u0F86-\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1029\u1040-\u1049\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u170E-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17B2\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1920-\u192B\u1930-\u193B\u1951-\u196D\u19B0-\u19C0\u19C8-\u19C9\u19D0-\u19D9\u1A00-\u1A15\u1A20-\u1A53\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1B46-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C00-\u1C22\u1C40-\u1C49\u1C5B-\u1C7D\u1CD0-\u1CD2\u1D00-\u1DBE\u1E01-\u1F15\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2D81-\u2D96\u2DE0-\u2DFF\u3021-\u3028\u3099\u309A\uA640-\uA66D\uA674-\uA67D\uA69F\uA6F0-\uA6F1\uA7F8-\uA800\uA806\uA80B\uA823-\uA827\uA880-\uA881\uA8B4-\uA8C4\uA8D0-\uA8D9\uA8F3-\uA8F7\uA900-\uA909\uA926-\uA92D\uA930-\uA945\uA980-\uA983\uA9B3-\uA9C0\uAA00-\uAA27\uAA40-\uAA41\uAA4C-\uAA4D\uAA50-\uAA59\uAA7B\uAAE0-\uAAE9\uAAF2-\uAAF3\uABC0-\uABE1\uABEC\uABED\uABF0-\uABF9\uFB20-\uFB28\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F';
        var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
        var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

        // Whether a single character denotes a newline.

        exports.newline = /[\n\r\u2028\u2029]/;

        // Matches a whole line break (where CRLF is considered a single
        // line break). Used to count lines.

        // in javascript, these two differ
        // in python they are the same, different methods are called on them
        exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
        exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');

        // Test whether a given character code starts an identifier.

        exports.isIdentifierStart = function (code) {
            // permit $ (36) and @ (64). @ is used in ES7 decorators.
            if (code < 65) return code === 36 || code === 64;
            // 65 through 91 are uppercase letters.
            if (code < 91) return true;
            // permit _ (95).
            if (code < 97) return code === 95;
            // 97 through 123 are lowercase letters.
            if (code < 123) return true;
            return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
        };

        // Test whether a given character is part of an identifier.

        exports.isIdentifierChar = function (code) {
            if (code < 48) return code === 36;
            if (code < 58) return true;
            if (code < 65) return false;
            if (code < 91) return true;
            if (code < 97) return code === 95;
            if (code < 123) return true;
            return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
        };

        /***/
    },
    /* 2 */
    /***/function (module, exports) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
            The MIT License (MIT)
        
            Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
        
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
        
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
        */

        function mergeOpts(allOptions, targetType) {
            var finalOpts = {};
            var name;

            for (name in allOptions) {
                if (name !== targetType) {
                    finalOpts[name] = allOptions[name];
                }
            }

            //merge in the per type settings for the targetType
            if (targetType in allOptions) {
                for (name in allOptions[targetType]) {
                    finalOpts[name] = allOptions[targetType][name];
                }
            }
            return finalOpts;
        }

        module.exports.mergeOpts = mergeOpts;

        /***/
    },
    /* 3 */
    /***/function (module, exports) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
          The MIT License (MIT)
        
          Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
          Permission is hereby granted, free of charge, to any person
          obtaining a copy of this software and associated documentation files
          (the "Software"), to deal in the Software without restriction,
          including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software,
          and to permit persons to whom the Software is furnished to do so,
          subject to the following conditions:
        
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
          BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
          ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
          CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        */

        function OutputLine(parent) {
            var _character_count = 0;
            // use indent_count as a marker for lines that have preserved indentation
            var _indent_count = -1;

            var _items = [];
            var _empty = true;

            this.set_indent = function (level) {
                _character_count = parent.baseIndentLength + level * parent.indent_length;
                _indent_count = level;
            };

            this.get_character_count = function () {
                return _character_count;
            };

            this.is_empty = function () {
                return _empty;
            };

            this.last = function () {
                if (!this._empty) {
                    return _items[_items.length - 1];
                } else {
                    return null;
                }
            };

            this.push = function (input) {
                _items.push(input);
                _character_count += input.length;
                _empty = false;
            };

            this.pop = function () {
                var item = null;
                if (!_empty) {
                    item = _items.pop();
                    _character_count -= item.length;
                    _empty = _items.length === 0;
                }
                return item;
            };

            this.remove_indent = function () {
                if (_indent_count > 0) {
                    _indent_count -= 1;
                    _character_count -= parent.indent_length;
                }
            };

            this.trim = function () {
                while (this.last() === ' ') {
                    _items.pop();
                    _character_count -= 1;
                }
                _empty = _items.length === 0;
            };

            this.toString = function () {
                var result = '';
                if (!this._empty) {
                    if (_indent_count >= 0) {
                        result = parent.indent_cache[_indent_count];
                    }
                    result += _items.join('');
                }
                return result;
            };
        }

        function Output(indent_string, baseIndentString) {
            baseIndentString = baseIndentString || '';
            this.indent_cache = [baseIndentString];
            this.baseIndentLength = baseIndentString.length;
            this.indent_length = indent_string.length;
            this.raw = false;

            var lines = [];
            this.baseIndentString = baseIndentString;
            this.indent_string = indent_string;
            this.previous_line = null;
            this.current_line = null;
            this.space_before_token = false;

            this.add_outputline = function () {
                this.previous_line = this.current_line;
                this.current_line = new OutputLine(this);
                lines.push(this.current_line);
            };

            // initialize
            this.add_outputline();

            this.get_line_number = function () {
                return lines.length;
            };

            // Using object instead of string to allow for later expansion of info about each line
            this.add_new_line = function (force_newline) {
                if (this.get_line_number() === 1 && this.just_added_newline()) {
                    return false; // no newline on start of file
                }

                if (force_newline || !this.just_added_newline()) {
                    if (!this.raw) {
                        this.add_outputline();
                    }
                    return true;
                }

                return false;
            };

            this.get_code = function (end_with_newline, eol) {
                var sweet_code = lines.join('\n').replace(/[\r\n\t ]+$/, '');

                if (end_with_newline) {
                    sweet_code += '\n';
                }

                if (eol !== '\n') {
                    sweet_code = sweet_code.replace(/[\n]/g, eol);
                }

                return sweet_code;
            };

            this.set_indent = function (level) {
                // Never indent your first output indent at the start of the file
                if (lines.length > 1) {
                    while (level >= this.indent_cache.length) {
                        this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
                    }

                    this.current_line.set_indent(level);
                    return true;
                }
                this.current_line.set_indent(0);
                return false;
            };

            this.add_raw_token = function (token) {
                for (var x = 0; x < token.newlines; x++) {
                    this.add_outputline();
                }
                this.current_line.push(token.whitespace_before);
                this.current_line.push(token.text);
                this.space_before_token = false;
            };

            this.add_token = function (printable_token) {
                this.add_space_before_token();
                this.current_line.push(printable_token);
            };

            this.add_space_before_token = function () {
                if (this.space_before_token && !this.just_added_newline()) {
                    this.current_line.push(' ');
                }
                this.space_before_token = false;
            };

            this.remove_indent = function (index) {
                var output_length = lines.length;
                while (index < output_length) {
                    lines[index].remove_indent();
                    index++;
                }
            };

            this.trim = function (eat_newlines) {
                eat_newlines = eat_newlines === undefined ? false : eat_newlines;

                this.current_line.trim(indent_string, baseIndentString);

                while (eat_newlines && lines.length > 1 && this.current_line.is_empty()) {
                    lines.pop();
                    this.current_line = lines[lines.length - 1];
                    this.current_line.trim();
                }

                this.previous_line = lines.length > 1 ? lines[lines.length - 2] : null;
            };

            this.just_added_newline = function () {
                return this.current_line.is_empty();
            };

            this.just_added_blankline = function () {
                if (this.just_added_newline()) {
                    if (lines.length === 1) {
                        return true; // start of the file and newline = blank
                    }

                    var line = lines[lines.length - 2];
                    return line.is_empty();
                }
                return false;
            };
        }

        module.exports.Output = Output;

        /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
            The MIT License (MIT)
        
            Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
        
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
        
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
        */

        var Beautifier = __webpack_require__(0).Beautifier;

        function css_beautify(source_text, options) {
            var beautifier = new Beautifier(source_text, options);
            return beautifier.beautify();
        }

        module.exports = css_beautify;

        /***/
    }]
    /******/);
    var css_beautify = legacy_beautify_css;
    /* Footer */
    if (true) {
        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return {
                css_beautify: css_beautify
            };
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        // Add support for CommonJS. Just put this file somewhere on your require.paths
        // and you will be able to `var html_beautify = require("beautify").html_beautify`.
        exports.css_beautify = css_beautify;
    } else if (typeof window !== "undefined") {
        // If we're running a web page and don't have either of the above, add our one global
        window.css_beautify = css_beautify;
    } else if (typeof global !== "undefined") {
        // If we don't even have window, try global.
        global.css_beautify = css_beautify;
    }
})();

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Elucidate_vue__ = __webpack_require__(7);



var plugin = {
  install: function install(Vue, options) {
    Vue.component('Elucidate', __WEBPACK_IMPORTED_MODULE_1__Elucidate_vue__["a" /* default */]);
  }
};

/* harmony default export */ __webpack_exports__["default"] = (plugin);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Elucidate_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5737ffc5_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Elucidate_vue__ = __webpack_require__(39);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_Elucidate_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5737ffc5_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_Elucidate_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CodeSnippet_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RenderedExample_vue__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PropsTable_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_vue_prism__ = __webpack_require__(36);
//
//
//
//
//
//
//
//






__WEBPACK_IMPORTED_MODULE_0_vue___default.a.use(__WEBPACK_IMPORTED_MODULE_4_vue_prism__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'elucidate',
  components: {
    CodeSnippet: __WEBPACK_IMPORTED_MODULE_1__CodeSnippet_vue__["a" /* default */],
    RenderedExample: __WEBPACK_IMPORTED_MODULE_2__RenderedExample_vue__["a" /* default */],
    PropsTable: __WEBPACK_IMPORTED_MODULE_3__PropsTable_vue__["a" /* default */]
  },
  props: {
    example: {
      type: Object,
      required: true
    },
    component: {
      required: true,
      type: null
    }
  }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CodeSnippet_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0dbb6d9a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_CodeSnippet_vue__ = __webpack_require__(17);
function injectStyle (ssrContext) {
  __webpack_require__(10)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CodeSnippet_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_0dbb6d9a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_CodeSnippet_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("a3c865d2", content, true);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".nav-tabs-wrapper .nav-tabs{margin:0;padding:0}.nav-tabs-wrapper .tab{display:inline-block;color:#a9a9a9}.nav-tabs-wrapper .tab:hover{color:grey}.nav-tabs-wrapper .tab.active{color:#222;font-weight:600}.nav-tabs-wrapper .tab:not(:last-of-type){margin-right:1em}.nav-tabs-wrapper .tab a{display:block;padding:.5em 0;text-decoration:none;color:inherit}.vue-tabs{margin-bottom:1rem}", ""]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] });
    } else {
      newStyles[id].parts.push(part);
    }
  }
  return styles;
};

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_nav_tabs__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_nav_tabs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_nav_tabs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_beautify__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_js_beautify___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_js_beautify__);
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'code-snippet',
  components: {
    VueTabs: __WEBPACK_IMPORTED_MODULE_0_vue_nav_tabs__["VueTabs"],
    VTab: __WEBPACK_IMPORTED_MODULE_0_vue_nav_tabs__["VTab"]
  },
  props: {
    example: {
      type: Object,
      required: true
    }
  },
  methods: {
    objectEmpty: function objectEmpty(obj) {
      return Object.keys(obj).length === 0 && obj.constructor === Object;
    },
    beautifyMethod: function beautifyMethod(method) {
      return __WEBPACK_IMPORTED_MODULE_1_js_beautify___default()(method.toString().replace('function', ''));
    }
  },
  computed: {
    shouldShowScriptTab: function shouldShowScriptTab() {
      return this.hasProps || this.hasMethods;
    },
    hasProps: function hasProps() {
      if (!this.example.props) return false;
      return !this.objectEmpty(this.example.props);
    },
    hasMethods: function hasMethods() {
      if (!this.example.methods) return false;
      return !this.objectEmpty(this.example.methods);
    },
    renderProps: function renderProps() {
      if (this.hasProps) {
        return 'data () { return ' + JSON.stringify(this.example.props) + '}';
      } else {
        return '';
      }
    },
    renderMethods: function renderMethods() {
      var _this = this;

      if (this.hasMethods) {
        var methodNames = Object.keys(this.example.methods);
        var formattedMethods = methodNames.map(function (name) {
          return _this.beautifyMethod(_this.example.methods[name]);
        }).join(',');
        return 'methods: {' + formattedMethods + '}';
      } else {
        return '';
      }
    },
    script: function script() {
      var optionalComma = this.hasProps && this.hasMethods ? ',' : '';

      var template = 'export default {' + this.renderProps + optionalComma + this.renderMethods;
      return __WEBPACK_IMPORTED_MODULE_1_js_beautify___default()(template, { indent_size: 2, end_with_newline: true });
    }
  }
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * vue-nav-tabs v0.5.4
 * (c) 2017-present cristij <joracristi@gmail.com>
 * Released under the MIT License.
 */


Object.defineProperty(exports, '__esModule', { value: true });

var VueTabs = {
    name: 'vue-tabs',
    props: {
        activeTabColor: String,
        activeTextColor: String,
        disabledColor: String,
        disabledTextColor: String,
        /**
         * Tab title position: center | bottom | top
         */
        textPosition: {
            type: String,
            default: 'center'
        },
        /**
         * Tab type: tabs | pills
         */
        type: {
            type: String,
            default: 'tabs'
        },
        direction: {
            type: String,
            default: 'horizontal'
        },
        /**
         * Centers the tabs and makes the container div full width
         */
        centered: Boolean,
        value: [String, Number, Object]
    },
    data: function data() {
        return {
            activeTabIndex: 0,
            tabs: []
        };
    },

    computed: {
        isTabShape: function isTabShape() {
            return this.type === 'tabs';
        },
        isStacked: function isStacked() {
            return this.direction === 'vertical';
        },
        classList: function classList() {
            var navType = this.isTabShape ? 'nav-tabs' : 'nav-pills';
            var centerClass = this.centered ? 'nav-justified' : '';
            var isStacked = this.isStacked ? 'nav-stacked' : '';
            return 'nav ' + navType + ' ' + centerClass + ' ' + isStacked;
        },
        stackedClass: function stackedClass() {
            return this.isStacked ? 'stacked' : '';
        },
        activeTabStyle: function activeTabStyle() {
            return {
                backgroundColor: this.activeTabColor,
                color: this.activeTextColor
            };
        }
    },
    methods: {
        navigateToTab: function navigateToTab(index, route) {
            this.changeTab(this.activeTabIndex, index, route);
        },
        activateTab: function activateTab(index) {
            this.activeTabIndex = index;
            var tab = this.tabs[index];
            tab.active = true;
            this.$emit('input', tab.title);
        },
        changeTab: function changeTab(oldIndex, newIndex, route) {
            var oldTab = this.tabs[oldIndex];
            var newTab = this.tabs[newIndex];
            if (newTab.disabled) return;
            this.activeTabIndex = newIndex;
            oldTab.active = false;
            newTab.active = true;
            this.$emit('input', this.tabs[newIndex].title);
            this.$emit('tab-change', newIndex, newTab, oldTab);
            this.tryChangeRoute(route);
        },
        tryChangeRoute: function tryChangeRoute(route) {
            if (this.$router && route) {
                this.$router.push(route);
            }
        },
        addTab: function addTab(item) {
            var index = this.$slots.default.indexOf(item.$vnode);
            this.tabs.splice(index, 0, item);
        },
        removeTab: function removeTab(item) {
            var tabs = this.tabs;
            var index = tabs.indexOf(item);
            if (index > -1) {
                tabs.splice(index, 1);
            }
        },
        getTabs: function getTabs() {
            if (this.$slots.default) {
                return this.$slots.default.filter(function (comp) {
                    return comp.componentOptions;
                });
            }
            return [];
        },
        findTabAndActivate: function findTabAndActivate(tabNameOrIndex) {
            var indexToActivate = this.tabs.findIndex(function (tab, index) {
                return tab.title === tabNameOrIndex || index === tabNameOrIndex;
            });
            if (indexToActivate === this.activeTabIndex) return;
            if (indexToActivate !== -1) {
                this.changeTab(this.activeTabIndex, indexToActivate);
            } else {
                this.changeTab(this.activeTabIndex, 0);
            }
        },
        renderTabTitle: function renderTabTitle(index) {
            var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
            var h = this.$createElement;

            if (this.tabs.length === 0) return;
            var tab = this.tabs[index];
            var active = tab.active,
                title = tab.title;

            var titleStyles = { color: this.activeTabColor };
            if (position === 'center') titleStyles.color = this.activeTextColor;
            var simpleTitle = h('span', { 'class': 'title title_' + position, style: active ? titleStyles : {} }, [position === 'center' && this.renderIcon(index), title]);

            if (tab.$slots.title) return tab.$slots.title;
            return simpleTitle;
        },
        renderIcon: function renderIcon(index) {
            var h = this.$createElement;

            if (this.tabs.length === 0) return;
            var tab = this.tabs[index];
            var icon = tab.icon;

            var simpleIcon = h('i', { 'class': icon }, ['\xA0']);
            if (!tab.$slots.title && icon) return simpleIcon;
        },
        tabStyles: function tabStyles(tab) {
            if (tab.disabled) {
                return {
                    backgroundColor: this.disabledColor,
                    color: this.disabledTextColor
                };
            }
            return {};
        },
        renderTabs: function renderTabs() {
            var _this = this;

            var h = this.$createElement;

            return this.tabs.map(function (tab, index) {
                if (!tab) return;
                var route = tab.route,
                    id = tab.id,
                    title = tab.title,
                    icon = tab.icon;

                var active = _this.activeTabIndex === index;
                return h('li', {
                    attrs: { name: 'tab',
                        role: 'presentation' },
                    on: {
                        'click': function click() {
                            return !tab.disabled && _this.navigateToTab(index, route);
                        }
                    },

                    'class': ['tab', { active: active }, { disabled: tab.disabled }],
                    key: title }, [_this.textPosition === 'top' && _this.renderTabTitle(index, _this.textPosition), h('a', {
                    attrs: { href: 'javascript:void(0)',

                        'aria-selected': active,
                        'aria-controls': '#' + id,
                        role: 'tab' },
                    style: active ? _this.activeTabStyle : _this.tabStyles(tab),
                    'class': { 'active_tab': active } }, [_this.textPosition !== 'center' && !tab.$slots.title && _this.renderIcon(index), _this.textPosition === 'center' && _this.renderTabTitle(index, _this.textPosition)]), _this.textPosition === 'bottom' && _this.renderTabTitle(index, _this.textPosition)]);
            });
        }
    },
    render: function render() {
        var h = arguments[0];

        var tabList = this.renderTabs();
        return h('div', { 'class': ['vue-tabs', this.stackedClass] }, [h('div', { 'class': [{ 'nav-tabs-navigation': !this.isStacked }, { 'left-vertical-tabs': this.isStacked }] }, [h('div', { 'class': ['nav-tabs-wrapper', this.stackedClass] }, [h('ul', { 'class': this.classList, attrs: { role: 'tablist' }
        }, [tabList])])]), h('div', { 'class': ['tab-content', { 'right-text-tabs': this.isStacked }] }, [this.$slots.default])]);
    },

    watch: {
        tabs: function tabs(newList) {
            if (newList.length > 0 && !this.value) {
                this.activateTab(this.activeTabIndex);
            }
            if (newList.length > 0 && this.value) {
                this.findTabAndActivate(this.value);
            }
        },
        value: function value(newVal) {
            this.findTabAndActivate(newVal);
        }
    }
};

var VTab = {
    name: 'v-tab',
    props: {
        title: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        /***
         * Function to execute before tab switch. Return value must be boolean
         * If the return result is false, tab switch is restricted
         */
        beforeChange: {
            type: Function
        },
        id: String,
        route: {
            type: [String, Object]
        },
        disabled: Boolean,
        transitionName: String,
        transitionMode: String
    },
    computed: {
        isValidParent: function isValidParent() {
            return this.$parent.$options.name === 'vue-tabs';
        },
        hash: function hash() {
            return '#' + this.id;
        }
    },
    data: function data() {
        return {
            active: false,
            validationError: null
        };
    },
    mounted: function mounted() {
        this.$parent.addTab(this);
    },
    destroyed: function destroyed() {
        if (this.$el && this.$el.parentNode) {
            this.$el.parentNode.removeChild(this.$el);
        }
        this.$parent.removeTab(this);
    },
    render: function render() {
        var h = arguments[0];

        return h('section', { 'class': 'tab-container',
            attrs: { role: 'tabpanel' },
            directives: [{
                name: 'show',
                value: this.active
            }]
        }, [this.$slots.default]);
    }
};

var VueTabsPlugin = {
    install: function install(Vue) {
        Vue.component('vue-tabs', VueTabs);
        Vue.component('v-tab', VTab);
    }
};
// Automatic installation if Vue has been added to the global scope.
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueTabsPlugin);
    window.VueTabs = VueTabsPlugin;
}

exports['default'] = VueTabsPlugin;
exports.VueTabs = VueTabs;
exports.VTab = VTab;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

*/

/**
The following batches are equivalent:

var beautify_js = require('js-beautify');
var beautify_js = require('js-beautify').js;
var beautify_js = require('js-beautify').js_beautify;

var beautify_css = require('js-beautify').css;
var beautify_css = require('js-beautify').css_beautify;

var beautify_html = require('js-beautify').html;
var beautify_html = require('js-beautify').html_beautify;

All methods returned accept two arguments, the source string and an options object.
**/

function get_beautify(js_beautify, css_beautify, html_beautify) {
    // the default is js
    var beautify = function beautify(src, config) {
        return js_beautify.js_beautify(src, config);
    };

    // short aliases
    beautify.js = js_beautify.js_beautify;
    beautify.css = css_beautify.css_beautify;
    beautify.html = html_beautify.html_beautify;

    // legacy aliases
    beautify.js_beautify = js_beautify.js_beautify;
    beautify.css_beautify = css_beautify.css_beautify;
    beautify.html_beautify = html_beautify.html_beautify;

    return beautify;
}

if (true) {
    // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(5), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_RESULT__ = function (js_beautify, css_beautify, html_beautify) {
        return get_beautify(js_beautify, css_beautify, html_beautify);
    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {
    (function (mod) {
        var js_beautify = require('./lib/beautify');
        var css_beautify = require('./lib/beautify-css');
        var html_beautify = require('./lib/beautify-html');

        mod.exports = get_beautify(js_beautify, css_beautify, html_beautify);
    })(module);
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
    http://jsbeautifier.org/

  Usage:
    style_html(html_source);

    style_html(html_source, options);

  The options are:
    indent_inner_html (default false)  — indent <head> and <body> sections,
    indent_size (default 4)          — indentation size,
    indent_char (default space)      — character to indent with,
    wrap_line_length (default 250)            -  maximum amount of characters per line (0 = disable)
    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
    unformatted (defaults to inline tags) - list of tags, that shouldn't be reformatted
    content_unformatted (defaults to pre tag) - list of tags, that its content shouldn't be reformatted
    indent_scripts (default normal)  - "keep"|"separate"|"normal"
    preserve_newlines (default true) - whether existing line breaks before elements should be preserved
                                        Only works before elements, not inside tags or for text.
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk
    indent_handlebars (default false) - format and indent {{#foo}} and {{/foo}}
    end_with_newline (false)          - end with a newline
    extra_liners (default [head,body,/html]) -List of tags that should have an extra newline before them.

    e.g.

    style_html(html_source, {
      'indent_inner_html': false,
      'indent_size': 2,
      'indent_char': ' ',
      'wrap_line_length': 78,
      'brace_style': 'expand',
      'preserve_newlines': true,
      'max_preserve_newlines': 5,
      'indent_handlebars': false,
      'extra_liners': ['/html']
    });
*/

(function () {
    var legacy_beautify_html =
    /******/function (modules) {
        // webpackBootstrap
        /******/ // The module cache
        /******/var installedModules = {};
        /******/
        /******/ // The require function
        /******/function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/if (installedModules[moduleId]) {
                /******/return installedModules[moduleId].exports;
                /******/
            }
            /******/ // Create a new module (and put it into the cache)
            /******/var module = installedModules[moduleId] = {
                /******/i: moduleId,
                /******/l: false,
                /******/exports: {}
                /******/ };
            /******/
            /******/ // Execute the module function
            /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ // Flag the module as loaded
            /******/module.l = true;
            /******/
            /******/ // Return the exports of the module
            /******/return module.exports;
            /******/
        }
        /******/
        /******/
        /******/ // expose the modules object (__webpack_modules__)
        /******/__webpack_require__.m = modules;
        /******/
        /******/ // expose the module cache
        /******/__webpack_require__.c = installedModules;
        /******/
        /******/ // identity function for calling harmony imports with the correct context
        /******/__webpack_require__.i = function (value) {
            return value;
        };
        /******/
        /******/ // define getter function for harmony exports
        /******/__webpack_require__.d = function (exports, name, getter) {
            /******/if (!__webpack_require__.o(exports, name)) {
                /******/Object.defineProperty(exports, name, {
                    /******/configurable: false,
                    /******/enumerable: true,
                    /******/get: getter
                    /******/ });
                /******/
            }
            /******/
        };
        /******/
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/__webpack_require__.n = function (module) {
            /******/var getter = module && module.__esModule ?
            /******/function getDefault() {
                return module['default'];
            } :
            /******/function getModuleExports() {
                return module;
            };
            /******/__webpack_require__.d(getter, 'a', getter);
            /******/return getter;
            /******/
        };
        /******/
        /******/ // Object.prototype.hasOwnProperty.call
        /******/__webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/ // __webpack_public_path__
        /******/__webpack_require__.p = "";
        /******/
        /******/ // Load entry module and return exports
        /******/return __webpack_require__(__webpack_require__.s = 3);
        /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
          The MIT License (MIT)
        
          Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
          Permission is hereby granted, free of charge, to any person
          obtaining a copy of this software and associated documentation files
          (the "Software"), to deal in the Software without restriction,
          including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software,
          and to permit persons to whom the Software is furnished to do so,
          subject to the following conditions:
        
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
          BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
          ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
          CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        */

        var mergeOpts = __webpack_require__(2).mergeOpts;
        var acorn = __webpack_require__(1);

        var lineBreak = acorn.lineBreak;
        var allLineBreaks = acorn.allLineBreaks;

        // function trim(s) {
        //     return s.replace(/^\s+|\s+$/g, '');
        // }

        function ltrim(s) {
            return s.replace(/^\s+/g, '');
        }

        function rtrim(s) {
            return s.replace(/\s+$/g, '');
        }

        function Beautifier(html_source, options, js_beautify, css_beautify) {
            //Wrapper function to invoke all the necessary constructors and deal with the output.
            html_source = html_source || '';

            var multi_parser, indent_inner_html, indent_body_inner_html, indent_head_inner_html, indent_size, indent_character, wrap_line_length, brace_style, unformatted, content_unformatted, preserve_newlines, max_preserve_newlines, indent_handlebars, wrap_attributes, wrap_attributes_indent_size, is_wrap_attributes_force, is_wrap_attributes_force_expand_multiline, is_wrap_attributes_force_aligned, end_with_newline, extra_liners, eol;

            options = options || {};

            // Allow the setting of language/file-type specific options
            // with inheritance of overall settings
            options = mergeOpts(options, 'html');

            // backwards compatibility to 1.3.4
            if ((options.wrap_line_length === undefined || parseInt(options.wrap_line_length, 10) === 0) && options.max_char !== undefined && parseInt(options.max_char, 10) !== 0) {
                options.wrap_line_length = options.max_char;
            }

            indent_inner_html = options.indent_inner_html === undefined ? false : options.indent_inner_html;
            indent_body_inner_html = options.indent_body_inner_html === undefined ? true : options.indent_body_inner_html;
            indent_head_inner_html = options.indent_head_inner_html === undefined ? true : options.indent_head_inner_html;
            indent_size = options.indent_size === undefined ? 4 : parseInt(options.indent_size, 10);
            indent_character = options.indent_char === undefined ? ' ' : options.indent_char;
            brace_style = options.brace_style === undefined ? 'collapse' : options.brace_style;
            wrap_line_length = parseInt(options.wrap_line_length, 10) === 0 ? 32786 : parseInt(options.wrap_line_length || 250, 10);
            unformatted = options.unformatted || [
            // https://www.w3.org/TR/html5/dom.html#phrasing-content
            'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */'select', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var', 'video', 'wbr', 'text',
            // prexisting - not sure of full effect of removing, leaving in
            'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'];
            content_unformatted = options.content_unformatted || ['pre'];
            preserve_newlines = options.preserve_newlines === undefined ? true : options.preserve_newlines;
            max_preserve_newlines = preserve_newlines ? isNaN(parseInt(options.max_preserve_newlines, 10)) ? 32786 : parseInt(options.max_preserve_newlines, 10) : 0;
            indent_handlebars = options.indent_handlebars === undefined ? false : options.indent_handlebars;
            wrap_attributes = options.wrap_attributes === undefined ? 'auto' : options.wrap_attributes;
            wrap_attributes_indent_size = isNaN(parseInt(options.wrap_attributes_indent_size, 10)) ? indent_size : parseInt(options.wrap_attributes_indent_size, 10);
            is_wrap_attributes_force = wrap_attributes.substr(0, 'force'.length) === 'force';
            is_wrap_attributes_force_expand_multiline = wrap_attributes === 'force-expand-multiline';
            is_wrap_attributes_force_aligned = wrap_attributes === 'force-aligned';
            end_with_newline = options.end_with_newline === undefined ? false : options.end_with_newline;
            extra_liners = _typeof(options.extra_liners) === 'object' && options.extra_liners ? options.extra_liners.concat() : typeof options.extra_liners === 'string' ? options.extra_liners.split(',') : 'head,body,/html'.split(',');
            eol = options.eol ? options.eol : 'auto';

            if (options.indent_with_tabs) {
                indent_character = '\t';
                indent_size = 1;
            }

            if (eol === 'auto') {
                eol = '\n';
                if (html_source && lineBreak.test(html_source || '')) {
                    eol = html_source.match(lineBreak)[0];
                }
            }

            eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

            // HACK: newline parsing inconsistent. This brute force normalizes the input.
            html_source = html_source.replace(allLineBreaks, '\n');

            function Parser() {

                this.pos = 0; //Parser position
                this.token = '';
                this.current_mode = 'CONTENT'; //reflects the current Parser mode: TAG/CONTENT
                this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
                    parent: 'parent1',
                    parentcount: 1,
                    parent1: ''
                };
                this.tag_type = '';
                this.token_text = this.last_token = this.last_text = this.token_type = '';
                this.newlines = 0;
                this.indent_content = indent_inner_html;
                this.indent_body_inner_html = indent_body_inner_html;
                this.indent_head_inner_html = indent_head_inner_html;

                this.Utils = { //Uilities made available to the various functions
                    whitespace: "\n\r\t ".split(''),

                    single_token: options.void_elements || [
                    // HTLM void elements - aka self-closing tags - aka singletons
                    // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
                    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr',
                    // NOTE: Optional tags - are not understood.
                    // https://www.w3.org/TR/html5/syntax.html#optional-tags
                    // The rules for optional tags are too complex for a simple list
                    // Also, the content of these tags should still be indented in many cases.
                    // 'li' is a good exmple.

                    // Doctype and xml elements
                    '!doctype', '?xml',
                    // ?php tag
                    '?php',
                    // other tags that were in this list, keeping just in case
                    'basefont', 'isindex'],
                    extra_liners: extra_liners, //for tags that need a line of whitespace before them
                    in_array: function in_array(what, arr) {
                        for (var i = 0; i < arr.length; i++) {
                            if (what === arr[i]) {
                                return true;
                            }
                        }
                        return false;
                    }
                };

                // Return true if the given text is composed entirely of whitespace.
                this.is_whitespace = function (text) {
                    for (var n = 0; n < text.length; n++) {
                        if (!this.Utils.in_array(text.charAt(n), this.Utils.whitespace)) {
                            return false;
                        }
                    }
                    return true;
                };

                this.traverse_whitespace = function () {
                    var input_char = '';

                    input_char = this.input.charAt(this.pos);
                    if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                        this.newlines = 0;
                        while (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                            if (preserve_newlines && input_char === '\n' && this.newlines <= max_preserve_newlines) {
                                this.newlines += 1;
                            }

                            this.pos++;
                            input_char = this.input.charAt(this.pos);
                        }
                        return true;
                    }
                    return false;
                };

                // Append a space to the given content (string array) or, if we are
                // at the wrap_line_length, append a newline/indentation.
                // return true if a newline was added, false if a space was added
                this.space_or_wrap = function (content) {
                    if (this.line_char_count >= this.wrap_line_length) {
                        //insert a line when the wrap_line_length is reached
                        this.print_newline(false, content);
                        this.print_indentation(content);
                        return true;
                    } else {
                        this.line_char_count++;
                        content.push(' ');
                        return false;
                    }
                };

                this.get_content = function () {
                    //function to capture regular content between tags
                    var input_char = '',
                        content = [],
                        handlebarsStarted = 0;

                    while (this.input.charAt(this.pos) !== '<' || handlebarsStarted === 2) {
                        if (this.pos >= this.input.length) {
                            return content.length ? content.join('') : ['', 'TK_EOF'];
                        }

                        if (handlebarsStarted < 2 && this.traverse_whitespace()) {
                            this.space_or_wrap(content);
                            continue;
                        }

                        input_char = this.input.charAt(this.pos);

                        if (indent_handlebars) {
                            if (input_char === '{') {
                                handlebarsStarted += 1;
                            } else if (handlebarsStarted < 2) {
                                handlebarsStarted = 0;
                            }

                            if (input_char === '}' && handlebarsStarted > 0) {
                                if (handlebarsStarted-- === 0) {
                                    break;
                                }
                            }
                            // Handlebars parsing is complicated.
                            // {{#foo}} and {{/foo}} are formatted tags.
                            // {{something}} should get treated as content, except:
                            // {{else}} specifically behaves like {{#if}} and {{/if}}
                            var peek3 = this.input.substr(this.pos, 3);
                            if (peek3 === '{{#' || peek3 === '{{/') {
                                // These are tags and not content.
                                break;
                            } else if (peek3 === '{{!') {
                                return [this.get_tag(), 'TK_TAG_HANDLEBARS_COMMENT'];
                            } else if (this.input.substr(this.pos, 2) === '{{') {
                                if (this.get_tag(true) === '{{else}}') {
                                    break;
                                }
                            }
                        }

                        this.pos++;
                        this.line_char_count++;
                        content.push(input_char); //letter at-a-time (or string) inserted to an array
                    }
                    return content.length ? content.join('') : '';
                };

                this.get_contents_to = function (name) {
                    //get the full content of a script or style to pass to js_beautify
                    if (this.pos === this.input.length) {
                        return ['', 'TK_EOF'];
                    }
                    var content = '';
                    var reg_match = new RegExp('</' + name + '\\s*>', 'igm');
                    reg_match.lastIndex = this.pos;
                    var reg_array = reg_match.exec(this.input);
                    var end_script = reg_array ? reg_array.index : this.input.length; //absolute end of script
                    if (this.pos < end_script) {
                        //get everything in between the script tags
                        content = this.input.substring(this.pos, end_script);
                        this.pos = end_script;
                    }
                    return content;
                };

                this.record_tag = function (tag) {
                    //function to record a tag and its parent in this.tags Object
                    if (this.tags[tag + 'count']) {
                        //check for the existence of this tag type
                        this.tags[tag + 'count']++;
                        this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
                    } else {
                        //otherwise initialize this tag type
                        this.tags[tag + 'count'] = 1;
                        this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
                    }
                    this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent; //set the parent (i.e. in the case of a div this.tags.div1parent)
                    this.tags.parent = tag + this.tags[tag + 'count']; //and make this the current parent (i.e. in the case of a div 'div1')
                };

                this.retrieve_tag = function (tag) {
                    //function to retrieve the opening tag to the corresponding closer
                    if (this.tags[tag + 'count']) {
                        //if the openener is not in the Object we ignore it
                        var temp_parent = this.tags.parent; //check to see if it's a closable tag.
                        while (temp_parent) {
                            //till we reach '' (the initial value);
                            if (tag + this.tags[tag + 'count'] === temp_parent) {
                                //if this is it use it
                                break;
                            }
                            temp_parent = this.tags[temp_parent + 'parent']; //otherwise keep on climbing up the DOM Tree
                        }
                        if (temp_parent) {
                            //if we caught something
                            this.indent_level = this.tags[tag + this.tags[tag + 'count']]; //set the indent_level accordingly
                            this.tags.parent = this.tags[temp_parent + 'parent']; //and set the current parent
                        }
                        delete this.tags[tag + this.tags[tag + 'count'] + 'parent']; //delete the closed tags parent reference...
                        delete this.tags[tag + this.tags[tag + 'count']]; //...and the tag itself
                        if (this.tags[tag + 'count'] === 1) {
                            delete this.tags[tag + 'count'];
                        } else {
                            this.tags[tag + 'count']--;
                        }
                    }
                };

                this.indent_to_tag = function (tag) {
                    // Match the indentation level to the last use of this tag, but don't remove it.
                    if (!this.tags[tag + 'count']) {
                        return;
                    }
                    var temp_parent = this.tags.parent;
                    while (temp_parent) {
                        if (tag + this.tags[tag + 'count'] === temp_parent) {
                            break;
                        }
                        temp_parent = this.tags[temp_parent + 'parent'];
                    }
                    if (temp_parent) {
                        this.indent_level = this.tags[tag + this.tags[tag + 'count']];
                    }
                };

                this.get_tag = function (peek) {
                    //function to get a full tag and parse its type
                    var input_char = '',
                        content = [],
                        comment = '',
                        space = false,
                        first_attr = true,
                        has_wrapped_attrs = false,
                        tag_start,
                        tag_end,
                        tag_start_char,
                        orig_pos = this.pos,
                        orig_line_char_count = this.line_char_count,
                        is_tag_closed = false,
                        tail;

                    peek = peek !== undefined ? peek : false;

                    do {
                        if (this.pos >= this.input.length) {
                            if (peek) {
                                this.pos = orig_pos;
                                this.line_char_count = orig_line_char_count;
                            }
                            return content.length ? content.join('') : ['', 'TK_EOF'];
                        }

                        input_char = this.input.charAt(this.pos);
                        this.pos++;

                        if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                            //don't want to insert unnecessary space
                            space = true;
                            continue;
                        }

                        if (input_char === "'" || input_char === '"') {
                            input_char += this.get_unformatted(input_char);
                            space = true;
                        }

                        if (input_char === '=') {
                            //no space before =
                            space = false;
                        }
                        tail = this.input.substr(this.pos - 1);
                        if (is_wrap_attributes_force_expand_multiline && has_wrapped_attrs && !is_tag_closed && (input_char === '>' || input_char === '/')) {
                            if (tail.match(/^\/?\s*>/)) {
                                space = false;
                                is_tag_closed = true;
                                this.print_newline(false, content);
                                this.print_indentation(content);
                            }
                        }
                        if (content.length && content[content.length - 1] !== '=' && input_char !== '>' && space) {
                            //no space after = or before >
                            var wrapped = this.space_or_wrap(content);
                            var indentAttrs = wrapped && input_char !== '/' && !is_wrap_attributes_force;
                            space = false;

                            if (is_wrap_attributes_force && input_char !== '/') {
                                var force_first_attr_wrap = false;
                                if (is_wrap_attributes_force_expand_multiline && first_attr) {
                                    var is_only_attribute = tail.match(/^\S*(="([^"]|\\")*")?\s*\/?\s*>/) !== null;
                                    force_first_attr_wrap = !is_only_attribute;
                                }
                                if (!first_attr || force_first_attr_wrap) {
                                    this.print_newline(false, content);
                                    this.print_indentation(content);
                                    indentAttrs = true;
                                }
                            }
                            if (indentAttrs) {
                                has_wrapped_attrs = true;

                                //indent attributes an auto, forced, or forced-align line-wrap
                                var alignment_size = wrap_attributes_indent_size;
                                if (is_wrap_attributes_force_aligned) {
                                    alignment_size = content.indexOf(' ') + 1;
                                }

                                for (var count = 0; count < alignment_size; count++) {
                                    // only ever further indent with spaces since we're trying to align characters
                                    content.push(' ');
                                }
                            }
                            if (first_attr) {
                                for (var i = 0; i < content.length; i++) {
                                    if (content[i] === ' ') {
                                        first_attr = false;
                                        break;
                                    }
                                }
                            }
                        }

                        if (indent_handlebars && tag_start_char === '<') {
                            // When inside an angle-bracket tag, put spaces around
                            // handlebars not inside of strings.
                            if (input_char + this.input.charAt(this.pos) === '{{') {
                                input_char += this.get_unformatted('}}');
                                if (content.length && content[content.length - 1] !== ' ' && content[content.length - 1] !== '<') {
                                    input_char = ' ' + input_char;
                                }
                                space = true;
                            }
                        }

                        if (input_char === '<' && !tag_start_char) {
                            tag_start = this.pos - 1;
                            tag_start_char = '<';
                        }

                        if (indent_handlebars && !tag_start_char) {
                            if (content.length >= 2 && content[content.length - 1] === '{' && content[content.length - 2] === '{') {
                                if (input_char === '#' || input_char === '/' || input_char === '!') {
                                    tag_start = this.pos - 3;
                                } else {
                                    tag_start = this.pos - 2;
                                }
                                tag_start_char = '{';
                            }
                        }

                        this.line_char_count++;
                        content.push(input_char); //inserts character at-a-time (or string)

                        if (content[1] && (content[1] === '!' || content[1] === '?' || content[1] === '%')) {
                            //if we're in a comment, do something special
                            // We treat all comments as literals, even more than preformatted tags
                            // we just look for the appropriate close tag
                            content = [this.get_comment(tag_start)];
                            break;
                        }

                        if (indent_handlebars && content[1] && content[1] === '{' && content[2] && content[2] === '!') {
                            //if we're in a comment, do something special
                            // We treat all comments as literals, even more than preformatted tags
                            // we just look for the appropriate close tag
                            content = [this.get_comment(tag_start)];
                            break;
                        }

                        if (indent_handlebars && tag_start_char === '{' && content.length > 2 && content[content.length - 2] === '}' && content[content.length - 1] === '}') {
                            break;
                        }
                    } while (input_char !== '>');

                    var tag_complete = content.join('');
                    var tag_index;
                    var tag_offset;

                    // must check for space first otherwise the tag could have the first attribute included, and
                    // then not un-indent correctly
                    if (tag_complete.indexOf(' ') !== -1) {
                        //if there's whitespace, thats where the tag name ends
                        tag_index = tag_complete.indexOf(' ');
                    } else if (tag_complete.indexOf('\n') !== -1) {
                        //if there's a line break, thats where the tag name ends
                        tag_index = tag_complete.indexOf('\n');
                    } else if (tag_complete.charAt(0) === '{') {
                        tag_index = tag_complete.indexOf('}');
                    } else {
                        //otherwise go with the tag ending
                        tag_index = tag_complete.indexOf('>');
                    }
                    if (tag_complete.charAt(0) === '<' || !indent_handlebars) {
                        tag_offset = 1;
                    } else {
                        tag_offset = tag_complete.charAt(2) === '#' ? 3 : 2;
                    }
                    var tag_check = tag_complete.substring(tag_offset, tag_index).toLowerCase();
                    if (tag_complete.charAt(tag_complete.length - 2) === '/' || this.Utils.in_array(tag_check, this.Utils.single_token)) {
                        //if this tag name is a single tag type (either in the list or has a closing /)
                        if (!peek) {
                            this.tag_type = 'SINGLE';
                        }
                    } else if (indent_handlebars && tag_complete.charAt(0) === '{' && tag_check === 'else') {
                        if (!peek) {
                            this.indent_to_tag('if');
                            this.tag_type = 'HANDLEBARS_ELSE';
                            this.indent_content = true;
                            this.traverse_whitespace();
                        }
                    } else if (this.is_unformatted(tag_check, unformatted) || this.is_unformatted(tag_check, content_unformatted)) {
                        // do not reformat the "unformatted" or "content_unformatted" tags
                        comment = this.get_unformatted('</' + tag_check + '>', tag_complete); //...delegate to get_unformatted function
                        content.push(comment);
                        tag_end = this.pos - 1;
                        this.tag_type = 'SINGLE';
                    } else if (tag_check === 'script' && (tag_complete.search('type') === -1 || tag_complete.search('type') > -1 && tag_complete.search(/\b(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/) > -1)) {
                        if (!peek) {
                            this.record_tag(tag_check);
                            this.tag_type = 'SCRIPT';
                        }
                    } else if (tag_check === 'style' && (tag_complete.search('type') === -1 || tag_complete.search('type') > -1 && tag_complete.search('text/css') > -1)) {
                        if (!peek) {
                            this.record_tag(tag_check);
                            this.tag_type = 'STYLE';
                        }
                    } else if (tag_check.charAt(0) === '!') {
                        //peek for <! comment
                        // for comments content is already correct.
                        if (!peek) {
                            this.tag_type = 'SINGLE';
                            this.traverse_whitespace();
                        }
                    } else if (!peek) {
                        if (tag_check.charAt(0) === '/') {
                            //this tag is a double tag so check for tag-ending
                            this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
                            this.tag_type = 'END';
                        } else {
                            //otherwise it's a start-tag
                            this.record_tag(tag_check); //push it on the tag stack
                            if (tag_check.toLowerCase() !== 'html') {
                                this.indent_content = true;
                            }
                            this.tag_type = 'START';
                        }

                        // Allow preserving of newlines after a start or end tag
                        if (this.traverse_whitespace()) {
                            this.space_or_wrap(content);
                        }

                        if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) {
                            //check if this double needs an extra line
                            this.print_newline(false, this.output);
                            if (this.output.length && this.output[this.output.length - 2] !== '\n') {
                                this.print_newline(true, this.output);
                            }
                        }
                    }

                    if (peek) {
                        this.pos = orig_pos;
                        this.line_char_count = orig_line_char_count;
                    }

                    return content.join(''); //returns fully formatted tag
                };

                this.get_comment = function (start_pos) {
                    //function to return comment content in its entirety
                    // this is will have very poor perf, but will work for now.
                    var comment = '',
                        delimiter = '>',
                        matched = false;

                    this.pos = start_pos;
                    var input_char = this.input.charAt(this.pos);
                    this.pos++;

                    while (this.pos <= this.input.length) {
                        comment += input_char;

                        // only need to check for the delimiter if the last chars match
                        if (comment.charAt(comment.length - 1) === delimiter.charAt(delimiter.length - 1) && comment.indexOf(delimiter) !== -1) {
                            break;
                        }

                        // only need to search for custom delimiter for the first few characters
                        if (!matched && comment.length < 10) {
                            if (comment.indexOf('<![if') === 0) {
                                //peek for <![if conditional comment
                                delimiter = '<![endif]>';
                                matched = true;
                            } else if (comment.indexOf('<![cdata[') === 0) {
                                //if it's a <[cdata[ comment...
                                delimiter = ']]>';
                                matched = true;
                            } else if (comment.indexOf('<![') === 0) {
                                // some other ![ comment? ...
                                delimiter = ']>';
                                matched = true;
                            } else if (comment.indexOf('<!--') === 0) {
                                // <!-- comment ...
                                delimiter = '-->';
                                matched = true;
                            } else if (comment.indexOf('{{!--') === 0) {
                                // {{!-- handlebars comment
                                delimiter = '--}}';
                                matched = true;
                            } else if (comment.indexOf('{{!') === 0) {
                                // {{! handlebars comment
                                if (comment.length === 5 && comment.indexOf('{{!--') === -1) {
                                    delimiter = '}}';
                                    matched = true;
                                }
                            } else if (comment.indexOf('<?') === 0) {
                                // {{! handlebars comment
                                delimiter = '?>';
                                matched = true;
                            } else if (comment.indexOf('<%') === 0) {
                                // {{! handlebars comment
                                delimiter = '%>';
                                matched = true;
                            }
                        }

                        input_char = this.input.charAt(this.pos);
                        this.pos++;
                    }

                    return comment;
                };

                function tokenMatcher(delimiter) {
                    var token = '';

                    var add = function add(str) {
                        var newToken = token + str.toLowerCase();
                        token = newToken.length <= delimiter.length ? newToken : newToken.substr(newToken.length - delimiter.length, delimiter.length);
                    };

                    var doesNotMatch = function doesNotMatch() {
                        return token.indexOf(delimiter) === -1;
                    };

                    return {
                        add: add,
                        doesNotMatch: doesNotMatch
                    };
                }

                this.get_unformatted = function (delimiter, orig_tag) {
                    //function to return unformatted content in its entirety
                    if (orig_tag && orig_tag.toLowerCase().indexOf(delimiter) !== -1) {
                        return '';
                    }
                    var input_char = '';
                    var content = '';
                    var space = true;

                    var delimiterMatcher = tokenMatcher(delimiter);

                    do {

                        if (this.pos >= this.input.length) {
                            return content;
                        }

                        input_char = this.input.charAt(this.pos);
                        this.pos++;

                        if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                            if (!space) {
                                this.line_char_count--;
                                continue;
                            }
                            if (input_char === '\n' || input_char === '\r') {
                                content += '\n';
                                /*  Don't change tab indention for unformatted blocks.  If using code for html editing, this will greatly affect <pre> tags if they are specified in the 'unformatted array'
                                for (var i=0; i<this.indent_level; i++) {
                                content += this.indent_string;
                                }
                                space = false; //...and make sure other indentation is erased
                                */
                                this.line_char_count = 0;
                                continue;
                            }
                        }
                        content += input_char;
                        delimiterMatcher.add(input_char);
                        this.line_char_count++;
                        space = true;

                        if (indent_handlebars && input_char === '{' && content.length && content.charAt(content.length - 2) === '{') {
                            // Handlebars expressions in strings should also be unformatted.
                            content += this.get_unformatted('}}');
                            // Don't consider when stopping for delimiters.
                        }
                    } while (delimiterMatcher.doesNotMatch());

                    return content;
                };

                this.get_token = function () {
                    //initial handler for token-retrieval
                    var token;

                    if (this.last_token === 'TK_TAG_SCRIPT' || this.last_token === 'TK_TAG_STYLE') {
                        //check if we need to format javascript
                        var type = this.last_token.substr(7);
                        token = this.get_contents_to(type);
                        if (typeof token !== 'string') {
                            return token;
                        }
                        return [token, 'TK_' + type];
                    }
                    if (this.current_mode === 'CONTENT') {
                        token = this.get_content();
                        if (typeof token !== 'string') {
                            return token;
                        } else {
                            return [token, 'TK_CONTENT'];
                        }
                    }

                    if (this.current_mode === 'TAG') {
                        token = this.get_tag();
                        if (typeof token !== 'string') {
                            return token;
                        } else {
                            var tag_name_type = 'TK_TAG_' + this.tag_type;
                            return [token, tag_name_type];
                        }
                    }
                };

                this.get_full_indent = function (level) {
                    level = this.indent_level + level || 0;
                    if (level < 1) {
                        return '';
                    }

                    return Array(level + 1).join(this.indent_string);
                };

                this.is_unformatted = function (tag_check, unformatted) {
                    //is this an HTML5 block-level link?
                    if (!this.Utils.in_array(tag_check, unformatted)) {
                        return false;
                    }

                    if (tag_check.toLowerCase() !== 'a' || !this.Utils.in_array('a', unformatted)) {
                        return true;
                    }

                    //at this point we have an  tag; is its first child something we want to remain
                    //unformatted?
                    var next_tag = this.get_tag(true /* peek. */);

                    // test next_tag to see if it is just html tag (no external content)
                    var tag = (next_tag || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);

                    // if next_tag comes back but is not an isolated tag, then
                    // let's treat the 'a' tag as having content
                    // and respect the unformatted option
                    if (!tag || this.Utils.in_array(tag[1], unformatted)) {
                        return true;
                    } else {
                        return false;
                    }
                };

                this.printer = function (js_source, indent_character, indent_size, wrap_line_length, brace_style) {
                    //handles input/output and some other printing functions

                    this.input = js_source || ''; //gets the input for the Parser

                    // HACK: newline parsing inconsistent. This brute force normalizes the input.
                    this.input = this.input.replace(/\r\n|[\r\u2028\u2029]/g, '\n');

                    this.output = [];
                    this.indent_character = indent_character;
                    this.indent_string = '';
                    this.indent_size = indent_size;
                    this.brace_style = brace_style;
                    this.indent_level = 0;
                    this.wrap_line_length = wrap_line_length;
                    this.line_char_count = 0; //count to see if wrap_line_length was exceeded

                    for (var i = 0; i < this.indent_size; i++) {
                        this.indent_string += this.indent_character;
                    }

                    this.print_newline = function (force, arr) {
                        this.line_char_count = 0;
                        if (!arr || !arr.length) {
                            return;
                        }
                        if (force || arr[arr.length - 1] !== '\n') {
                            //we might want the extra line
                            if (arr[arr.length - 1] !== '\n') {
                                arr[arr.length - 1] = rtrim(arr[arr.length - 1]);
                            }
                            arr.push('\n');
                        }
                    };

                    this.print_indentation = function (arr) {
                        for (var i = 0; i < this.indent_level; i++) {
                            arr.push(this.indent_string);
                            this.line_char_count += this.indent_string.length;
                        }
                    };

                    this.print_token = function (text) {
                        // Avoid printing initial whitespace.
                        if (this.is_whitespace(text) && !this.output.length) {
                            return;
                        }
                        if (text || text !== '') {
                            if (this.output.length && this.output[this.output.length - 1] === '\n') {
                                this.print_indentation(this.output);
                                text = ltrim(text);
                            }
                        }
                        this.print_token_raw(text);
                    };

                    this.print_token_raw = function (text) {
                        // If we are going to print newlines, truncate trailing
                        // whitespace, as the newlines will represent the space.
                        if (this.newlines > 0) {
                            text = rtrim(text);
                        }

                        if (text && text !== '') {
                            if (text.length > 1 && text.charAt(text.length - 1) === '\n') {
                                // unformatted tags can grab newlines as their last character
                                this.output.push(text.slice(0, -1));
                                this.print_newline(false, this.output);
                            } else {
                                this.output.push(text);
                            }
                        }

                        for (var n = 0; n < this.newlines; n++) {
                            this.print_newline(n > 0, this.output);
                        }
                        this.newlines = 0;
                    };

                    this.indent = function () {
                        this.indent_level++;
                    };

                    this.unindent = function () {
                        if (this.indent_level > 0) {
                            this.indent_level--;
                        }
                    };
                };
                return this;
            }

            /*_____________________--------------------_____________________*/

            this.beautify = function () {
                multi_parser = new Parser(); //wrapping functions Parser
                multi_parser.printer(html_source, indent_character, indent_size, wrap_line_length, brace_style); //initialize starting values
                while (true) {
                    var t = multi_parser.get_token();
                    multi_parser.token_text = t[0];
                    multi_parser.token_type = t[1];

                    if (multi_parser.token_type === 'TK_EOF') {
                        break;
                    }

                    switch (multi_parser.token_type) {
                        case 'TK_TAG_START':
                            multi_parser.print_newline(false, multi_parser.output);
                            multi_parser.print_token(multi_parser.token_text);
                            if (multi_parser.indent_content) {
                                if ((multi_parser.indent_body_inner_html || !multi_parser.token_text.match(/<body(?:.*)>/)) && (multi_parser.indent_head_inner_html || !multi_parser.token_text.match(/<head(?:.*)>/))) {

                                    multi_parser.indent();
                                }

                                multi_parser.indent_content = false;
                            }
                            multi_parser.current_mode = 'CONTENT';
                            break;
                        case 'TK_TAG_STYLE':
                        case 'TK_TAG_SCRIPT':
                            multi_parser.print_newline(false, multi_parser.output);
                            multi_parser.print_token(multi_parser.token_text);
                            multi_parser.current_mode = 'CONTENT';
                            break;
                        case 'TK_TAG_END':
                            //Print new line only if the tag has no content and has child
                            if (multi_parser.last_token === 'TK_CONTENT' && multi_parser.last_text === '') {
                                var tag_name = (multi_parser.token_text.match(/\w+/) || [])[0];
                                var tag_extracted_from_last_output = null;
                                if (multi_parser.output.length) {
                                    tag_extracted_from_last_output = multi_parser.output[multi_parser.output.length - 1].match(/(?:<|{{#)\s*(\w+)/);
                                }
                                if (tag_extracted_from_last_output === null || tag_extracted_from_last_output[1] !== tag_name && !multi_parser.Utils.in_array(tag_extracted_from_last_output[1], unformatted)) {
                                    multi_parser.print_newline(false, multi_parser.output);
                                }
                            }
                            multi_parser.print_token(multi_parser.token_text);
                            multi_parser.current_mode = 'CONTENT';
                            break;
                        case 'TK_TAG_SINGLE':
                            // Don't add a newline before elements that should remain unformatted.
                            var tag_check = multi_parser.token_text.match(/^\s*<([a-z-]+)/i);
                            if (!tag_check || !multi_parser.Utils.in_array(tag_check[1], unformatted)) {
                                multi_parser.print_newline(false, multi_parser.output);
                            }
                            multi_parser.print_token(multi_parser.token_text);
                            multi_parser.current_mode = 'CONTENT';
                            break;
                        case 'TK_TAG_HANDLEBARS_ELSE':
                            // Don't add a newline if opening {{#if}} tag is on the current line
                            var foundIfOnCurrentLine = false;
                            for (var lastCheckedOutput = multi_parser.output.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
                                if (multi_parser.output[lastCheckedOutput] === '\n') {
                                    break;
                                } else {
                                    if (multi_parser.output[lastCheckedOutput].match(/{{#if/)) {
                                        foundIfOnCurrentLine = true;
                                        break;
                                    }
                                }
                            }
                            if (!foundIfOnCurrentLine) {
                                multi_parser.print_newline(false, multi_parser.output);
                            }
                            multi_parser.print_token(multi_parser.token_text);
                            if (multi_parser.indent_content) {
                                multi_parser.indent();
                                multi_parser.indent_content = false;
                            }
                            multi_parser.current_mode = 'CONTENT';
                            break;
                        case 'TK_TAG_HANDLEBARS_COMMENT':
                            multi_parser.print_token(multi_parser.token_text);
                            multi_parser.current_mode = 'TAG';
                            break;
                        case 'TK_CONTENT':
                            multi_parser.print_token(multi_parser.token_text);
                            multi_parser.current_mode = 'TAG';
                            break;
                        case 'TK_STYLE':
                        case 'TK_SCRIPT':
                            if (multi_parser.token_text !== '') {
                                multi_parser.print_newline(false, multi_parser.output);
                                var text = multi_parser.token_text,
                                    _beautifier,
                                    script_indent_level = 1;
                                if (multi_parser.token_type === 'TK_SCRIPT') {
                                    _beautifier = typeof js_beautify === 'function' && js_beautify;
                                } else if (multi_parser.token_type === 'TK_STYLE') {
                                    _beautifier = typeof css_beautify === 'function' && css_beautify;
                                }

                                if (options.indent_scripts === "keep") {
                                    script_indent_level = 0;
                                } else if (options.indent_scripts === "separate") {
                                    script_indent_level = -multi_parser.indent_level;
                                }

                                var indentation = multi_parser.get_full_indent(script_indent_level);
                                if (_beautifier) {

                                    // call the Beautifier if avaliable
                                    var Child_options = function Child_options() {
                                        this.eol = '\n';
                                    };
                                    Child_options.prototype = options;
                                    var child_options = new Child_options();
                                    text = _beautifier(text.replace(/^\s*/, indentation), child_options);
                                } else {
                                    // simply indent the string otherwise
                                    var white = text.match(/^\s*/)[0];
                                    var _level = white.match(/[^\n\r]*$/)[0].split(multi_parser.indent_string).length - 1;
                                    var reindent = multi_parser.get_full_indent(script_indent_level - _level);
                                    text = text.replace(/^\s*/, indentation).replace(/\r\n|\r|\n/g, '\n' + reindent).replace(/\s+$/, '');
                                }
                                if (text) {
                                    multi_parser.print_token_raw(text);
                                    multi_parser.print_newline(true, multi_parser.output);
                                }
                            }
                            multi_parser.current_mode = 'TAG';
                            break;
                        default:
                            // We should not be getting here but we don't want to drop input on the floor
                            // Just output the text and move on
                            if (multi_parser.token_text !== '') {
                                multi_parser.print_token(multi_parser.token_text);
                            }
                            break;
                    }
                    multi_parser.last_token = multi_parser.token_type;
                    multi_parser.last_text = multi_parser.token_text;
                }
                var sweet_code = multi_parser.output.join('').replace(/[\r\n\t ]+$/, '');

                // establish end_with_newline
                if (end_with_newline) {
                    sweet_code += '\n';
                }

                if (eol !== '\n') {
                    sweet_code = sweet_code.replace(/[\n]/g, eol);
                }

                return sweet_code;
            };
        }

        module.exports.Beautifier = Beautifier;

        /***/
    },
    /* 1 */
    /***/function (module, exports) {

        /* jshint curly: false */
        // This section of code is taken from acorn.
        //
        // Acorn was written by Marijn Haverbeke and released under an MIT
        // license. The Unicode regexps (for identifiers and whitespace) were
        // taken from [Esprima](http://esprima.org) by Ariya Hidayat.
        //
        // Git repositories for Acorn are available at
        //
        //     http://marijnhaverbeke.nl/git/acorn
        //     https://github.com/marijnh/acorn.git

        // ## Character categories

        // Big ugly regular expressions that match characters in the
        // whitespace, identifier, and identifier-start categories. These
        // are only applied when a character is found to actually have a
        // code point above 128.

        var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
        var nonASCIIidentifierStartChars = '\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC';
        var nonASCIIidentifierChars = '\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u0620-\u0649\u0672-\u06D3\u06E7-\u06E8\u06FB-\u06FC\u0730-\u074A\u0800-\u0814\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0840-\u0857\u08E4-\u08FE\u0900-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962-\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09D7\u09DF-\u09E0\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5F-\u0B60\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2-\u0CE3\u0CE6-\u0CEF\u0D02\u0D03\u0D46-\u0D48\u0D57\u0D62-\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E34-\u0E3A\u0E40-\u0E45\u0E50-\u0E59\u0EB4-\u0EB9\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F41-\u0F47\u0F71-\u0F84\u0F86-\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1029\u1040-\u1049\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u170E-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17B2\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1920-\u192B\u1930-\u193B\u1951-\u196D\u19B0-\u19C0\u19C8-\u19C9\u19D0-\u19D9\u1A00-\u1A15\u1A20-\u1A53\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1B46-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C00-\u1C22\u1C40-\u1C49\u1C5B-\u1C7D\u1CD0-\u1CD2\u1D00-\u1DBE\u1E01-\u1F15\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2D81-\u2D96\u2DE0-\u2DFF\u3021-\u3028\u3099\u309A\uA640-\uA66D\uA674-\uA67D\uA69F\uA6F0-\uA6F1\uA7F8-\uA800\uA806\uA80B\uA823-\uA827\uA880-\uA881\uA8B4-\uA8C4\uA8D0-\uA8D9\uA8F3-\uA8F7\uA900-\uA909\uA926-\uA92D\uA930-\uA945\uA980-\uA983\uA9B3-\uA9C0\uAA00-\uAA27\uAA40-\uAA41\uAA4C-\uAA4D\uAA50-\uAA59\uAA7B\uAAE0-\uAAE9\uAAF2-\uAAF3\uABC0-\uABE1\uABEC\uABED\uABF0-\uABF9\uFB20-\uFB28\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F';
        var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
        var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

        // Whether a single character denotes a newline.

        exports.newline = /[\n\r\u2028\u2029]/;

        // Matches a whole line break (where CRLF is considered a single
        // line break). Used to count lines.

        // in javascript, these two differ
        // in python they are the same, different methods are called on them
        exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
        exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');

        // Test whether a given character code starts an identifier.

        exports.isIdentifierStart = function (code) {
            // permit $ (36) and @ (64). @ is used in ES7 decorators.
            if (code < 65) return code === 36 || code === 64;
            // 65 through 91 are uppercase letters.
            if (code < 91) return true;
            // permit _ (95).
            if (code < 97) return code === 95;
            // 97 through 123 are lowercase letters.
            if (code < 123) return true;
            return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
        };

        // Test whether a given character is part of an identifier.

        exports.isIdentifierChar = function (code) {
            if (code < 48) return code === 36;
            if (code < 58) return true;
            if (code < 65) return false;
            if (code < 91) return true;
            if (code < 97) return code === 95;
            if (code < 123) return true;
            return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
        };

        /***/
    },
    /* 2 */
    /***/function (module, exports) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
            The MIT License (MIT)
        
            Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
        
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
        
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
        */

        function mergeOpts(allOptions, targetType) {
            var finalOpts = {};
            var name;

            for (name in allOptions) {
                if (name !== targetType) {
                    finalOpts[name] = allOptions[name];
                }
            }

            //merge in the per type settings for the targetType
            if (targetType in allOptions) {
                for (name in allOptions[targetType]) {
                    finalOpts[name] = allOptions[targetType][name];
                }
            }
            return finalOpts;
        }

        module.exports.mergeOpts = mergeOpts;

        /***/
    },
    /* 3 */
    /***/function (module, exports, __webpack_require__) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
            The MIT License (MIT)
        
            Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
        
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
        
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
        */

        var Beautifier = __webpack_require__(0).Beautifier;

        function style_html(html_source, options, js_beautify, css_beautify) {
            var beautifier = new Beautifier(html_source, options, js_beautify, css_beautify);
            return beautifier.beautify();
        }

        module.exports = style_html;

        /***/
    }]
    /******/);
    var style_html = legacy_beautify_html;
    /* Footer */
    if (true) {
        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function (requireamd) {
            var js_beautify = __webpack_require__(4);
            var css_beautify = __webpack_require__(5);

            return {
                html_beautify: function html_beautify(html_source, options) {
                    return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
                }
            };
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        // Add support for CommonJS. Just put this file somewhere on your require.paths
        // and you will be able to `var html_beautify = require("beautify").html_beautify`.
        var js_beautify = require('./beautify.js');
        var css_beautify = require('./beautify-css.js');

        exports.html_beautify = function (html_source, options) {
            return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
        };
    } else if (typeof window !== "undefined") {
        // If we're running a web page and don't have either of the above, add our one global
        window.html_beautify = function (html_source, options) {
            return style_html(html_source, options, window.js_beautify, window.css_beautify);
        };
    } else if (typeof global !== "undefined") {
        // If we don't even have window, try global.
        global.html_beautify = function (html_source, options) {
            return style_html(html_source, options, global.js_beautify, global.css_beautify);
        };
    }
})();

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('vue-tabs',[_c('v-tab',{attrs:{"title":"Markup"}},[_c('pre',{staticClass:"language-markup",staticStyle:{"margin":"0"}},[_c('code',[_vm._v(_vm._s(_vm.example.markup))])])]),_vm._v(" "),(_vm.shouldShowScriptTab)?_c('v-tab',{attrs:{"title":"Script"}},[_c('pre',{staticClass:"language-javascript",staticStyle:{"margin":"0"}},[_c('code',[_vm._v(_vm._s(_vm.script))])])]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_RenderedExample_vue__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6837cdb8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_RenderedExample_vue__ = __webpack_require__(22);
function injectStyle (ssrContext) {
  __webpack_require__(19)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_RenderedExample_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_6837cdb8_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_RenderedExample_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(20);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("8203d936", content, true);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".preview{background:#f4f5fa;border-radius:.5rem;padding:1rem;margin-bottom:1rem}", ""]);

// exports


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'rendered-example',
  props: {
    example: {
      type: Object,
      required: true
    },
    component: {
      required: true
    }
  },
  created: function created() {
    __WEBPACK_IMPORTED_MODULE_0_vue___default.a.component(this.component.name, this.component);
  },
  mounted: function mounted() {
    var props = this.example.props;

    var MarkedUp = __WEBPACK_IMPORTED_MODULE_0_vue___default.a.extend({
      template: this.example.markup,
      data: function data() {
        return props;
      },
      methods: this.example.methods
    });
    new MarkedUp({ el: this.$refs.rendered });
  }
});

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"preview"},[_c('div',{ref:"rendered"})])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PropsTable_vue__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4bd6db6a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_PropsTable_vue__ = __webpack_require__(35);
function injectStyle (ssrContext) {
  __webpack_require__(24)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PropsTable_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_4bd6db6a_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_PropsTable_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("db1e9560", content, true);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".props-table,.props-table-wrap{overflow:auto}.props-table{border-collapse:collapse;border-spacing:0;width:100%}.props-table th{text-align:left}.props-table td,.props-table th{border-bottom:1px solid rgba(0,0,0,.1);padding:.5rem 0}", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PropsTableRow_vue__ = __webpack_require__(27);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'props-table',
  components: {
    PropsTableRow: __WEBPACK_IMPORTED_MODULE_0__PropsTableRow_vue__["a" /* default */]
  },
  props: {
    component: {
      type: Object
    }
  },
  data: function data() {
    return {
      propsList: this.component.props
    };
  }
});

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PropsTableRow_vue__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b740b282_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_PropsTableRow_vue__ = __webpack_require__(34);
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_PropsTableRow_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_b740b282_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_PropsTableRow_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CollapsibleCodeSnippet_vue__ = __webpack_require__(29);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'props-table-row',
  props: {
    prop: Object,
    name: String
  },
  components: {
    CollapsibleCodeSnippet: __WEBPACK_IMPORTED_MODULE_0__CollapsibleCodeSnippet_vue__["a" /* default */]
  },
  computed: {
    defaultVal: function defaultVal() {
      if (typeof this.prop.default !== 'undefined') {
        if (typeof this.prop.default === 'function') return JSON.stringify(this.prop.default(), null, 2);
        return this.prop.default;
      }
      return 'undefined';
    },
    type: function type() {
      if (typeof this.prop.type === 'undefined') return 'any';
      var type = _typeof(this.prop.type());
      if (type === 'object') {
        if (Array.isArray(this.prop.type())) return 'array';
      }
      return type;
    }
  }
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CollapsibleCodeSnippet_vue__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_46ee7293_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_CollapsibleCodeSnippet_vue__ = __webpack_require__(33);
function injectStyle (ssrContext) {
  __webpack_require__(30)
}
var normalizeComponent = __webpack_require__(0)
/* script */

/* template */

/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_CollapsibleCodeSnippet_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_46ee7293_hasScoped_false_node_modules_vue_loader_lib_selector_type_template_index_0_CollapsibleCodeSnippet_vue__["a" /* default */],
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("da92034c", content, true);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(undefined);
// imports


// module
exports.push([module.i, ".code-snippet-wrap{border:1px solid rgba(0,0,0,.1);padding:.5rem;position:relative}.code-snippet-wrap pre{margin:0}.code-snippet-toggle-wrap{position:absolute;bottom:0;left:0;right:0;padding:.5rem 0;pointer-events:none;text-align:center}.code-snippet-toggle{background:#222;color:#fff;border:0;font-weight:500;border-radius:.5rem;pointer-events:all}.collapsed{height:100px;overflow-y:hidden}", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'collapsible-code-snippet',
  props: {
    code: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      collapsed: true
    };
  },

  methods: {
    toggle: function toggle() {
      this.collapsed = !this.collapsed;
    }
  },
  computed: {
    buttonText: function buttonText() {
      return this.collapsed ? 'Expand snippet' : 'Collapse Snippet';
    }
  }
});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"code-snippet-wrap",class:{'collapsed': _vm.collapsed}},[_c('pre',[_c('code',[_vm._v(_vm._s(_vm.code))])]),_vm._v(" "),_c('div',{staticClass:"code-snippet-toggle-wrap"},[_c('button',{staticClass:"code-snippet-toggle",on:{"click":_vm.toggle}},[_vm._v(_vm._s(_vm.buttonText))])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('tr',[_c('td',{staticClass:"prop-name"},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('td',{staticClass:"prop-type"},[_c('pre',[_vm._v(_vm._s(_vm.type))])]),_vm._v(" "),_c('td',{staticClass:"prop-default"},[(_vm.defaultVal.length > 100)?_c('div',[_c('collapsible-code-snippet',{attrs:{"code":_vm.defaultVal}})],1):_c('div',[_c('pre',[_vm._v(_vm._s(_vm.defaultVal))])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"props-table-wrap"},[_c('table',{staticClass:"props-table"},[_vm._m(0),_vm._v(" "),_c('tbody',_vm._l((_vm.propsList),function(propDef,propName,index){return _c('props-table-row',{key:index,attrs:{"prop":propDef,"name":propName}})}))])])}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('thead',[_c('tr',[_c('th',[_vm._v("Name")]),_vm._v(" "),_c('th',[_vm._v("Type")]),_vm._v(" "),_c('th',[_vm._v("Default")])])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prismjs__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prismjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prismjs__);


var VuePrism = {
    install: function install(Vue, options) {

        Vue.mixin({
            mounted: function mounted() {
                __WEBPACK_IMPORTED_MODULE_0_prismjs___default.a.highlightAll();
            }
        });
    }
};

/* harmony default export */ __webpack_exports__["a"] = (VuePrism);

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/* **********************************************
     Begin prism-core.js
********************************************** */

var _self = typeof window !== 'undefined' ? window // if in browser
: typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope ? self // if in worker
: {} // if in node js
;

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = function () {

	// Private helper vars
	var lang = /\blang(?:uage)?-(\w+)\b/i;
	var uniqueId = 0;

	var _ = _self.Prism = {
		manual: _self.Prism && _self.Prism.manual,
		util: {
			encode: function encode(tokens) {
				if (tokens instanceof Token) {
					return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
				} else if (_.util.type(tokens) === 'Array') {
					return tokens.map(_.util.encode);
				} else {
					return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
				}
			},

			type: function type(o) {
				return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
			},

			objId: function objId(obj) {
				if (!obj['__id']) {
					Object.defineProperty(obj, '__id', { value: ++uniqueId });
				}
				return obj['__id'];
			},

			// Deep clone a language definition (e.g. to extend it)
			clone: function clone(o) {
				var type = _.util.type(o);

				switch (type) {
					case 'Object':
						var clone = {};

						for (var key in o) {
							if (o.hasOwnProperty(key)) {
								clone[key] = _.util.clone(o[key]);
							}
						}

						return clone;

					case 'Array':
						return o.map(function (v) {
							return _.util.clone(v);
						});
				}

				return o;
			}
		},

		languages: {
			extend: function extend(id, redef) {
				var lang = _.util.clone(_.languages[id]);

				for (var key in redef) {
					lang[key] = redef[key];
				}

				return lang;
			},

			/**
    * Insert a token before another token in a language literal
    * As this needs to recreate the object (we cannot actually insert before keys in object literals),
    * we cannot just provide an object, we need anobject and a key.
    * @param inside The key (or language id) of the parent
    * @param before The key to insert before. If not provided, the function appends instead.
    * @param insert Object with the key/value pairs to insert
    * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
    */
			insertBefore: function insertBefore(inside, before, insert, root) {
				root = root || _.languages;
				var grammar = root[inside];

				if (arguments.length == 2) {
					insert = arguments[1];

					for (var newToken in insert) {
						if (insert.hasOwnProperty(newToken)) {
							grammar[newToken] = insert[newToken];
						}
					}

					return grammar;
				}

				var ret = {};

				for (var token in grammar) {

					if (grammar.hasOwnProperty(token)) {

						if (token == before) {

							for (var newToken in insert) {

								if (insert.hasOwnProperty(newToken)) {
									ret[newToken] = insert[newToken];
								}
							}
						}

						ret[token] = grammar[token];
					}
				}

				// Update references in other language definitions
				_.languages.DFS(_.languages, function (key, value) {
					if (value === root[inside] && key != inside) {
						this[key] = ret;
					}
				});

				return root[inside] = ret;
			},

			// Traverse a language definition with Depth First Search
			DFS: function DFS(o, callback, type, visited) {
				visited = visited || {};
				for (var i in o) {
					if (o.hasOwnProperty(i)) {
						callback.call(o, i, o[i], type || i);

						if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
							visited[_.util.objId(o[i])] = true;
							_.languages.DFS(o[i], callback, null, visited);
						} else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
							visited[_.util.objId(o[i])] = true;
							_.languages.DFS(o[i], callback, i, visited);
						}
					}
				}
			}
		},
		plugins: {},

		highlightAll: function highlightAll(async, callback) {
			var env = {
				callback: callback,
				selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
			};

			_.hooks.run("before-highlightall", env);

			var elements = env.elements || document.querySelectorAll(env.selector);

			for (var i = 0, element; element = elements[i++];) {
				_.highlightElement(element, async === true, env.callback);
			}
		},

		highlightElement: function highlightElement(element, async, callback) {
			// Find language
			var language,
			    grammar,
			    parent = element;

			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}

			if (parent) {
				language = (parent.className.match(lang) || [, ''])[1].toLowerCase();
				grammar = _.languages[language];
			}

			// Set language on the element, if not present
			element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

			// Set language on the parent, for styling
			parent = element.parentNode;

			if (/pre/i.test(parent.nodeName)) {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}

			var code = element.textContent;

			var env = {
				element: element,
				language: language,
				grammar: grammar,
				code: code
			};

			_.hooks.run('before-sanity-check', env);

			if (!env.code || !env.grammar) {
				if (env.code) {
					_.hooks.run('before-highlight', env);
					env.element.textContent = env.code;
					_.hooks.run('after-highlight', env);
				}
				_.hooks.run('complete', env);
				return;
			}

			_.hooks.run('before-highlight', env);

			if (async && _self.Worker) {
				var worker = new Worker(_.filename);

				worker.onmessage = function (evt) {
					env.highlightedCode = evt.data;

					_.hooks.run('before-insert', env);

					env.element.innerHTML = env.highlightedCode;

					callback && callback.call(env.element);
					_.hooks.run('after-highlight', env);
					_.hooks.run('complete', env);
				};

				worker.postMessage(JSON.stringify({
					language: env.language,
					code: env.code,
					immediateClose: true
				}));
			} else {
				env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(element);

				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			}
		},

		highlight: function highlight(text, grammar, language) {
			var tokens = _.tokenize(text, grammar);
			return Token.stringify(_.util.encode(tokens), language);
		},

		matchGrammar: function matchGrammar(text, strarr, grammar, index, startPos, oneshot, target) {
			var Token = _.Token;

			for (var token in grammar) {
				if (!grammar.hasOwnProperty(token) || !grammar[token]) {
					continue;
				}

				if (token == target) {
					return;
				}

				var patterns = grammar[token];
				patterns = _.util.type(patterns) === "Array" ? patterns : [patterns];

				for (var j = 0; j < patterns.length; ++j) {
					var pattern = patterns[j],
					    inside = pattern.inside,
					    lookbehind = !!pattern.lookbehind,
					    greedy = !!pattern.greedy,
					    lookbehindLength = 0,
					    alias = pattern.alias;

					if (greedy && !pattern.pattern.global) {
						// Without the global flag, lastIndex won't work
						var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
						pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
					}

					pattern = pattern.pattern || pattern;

					// Don’t cache length as it changes during the loop
					for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

						var str = strarr[i];

						if (strarr.length > text.length) {
							// Something went terribly wrong, ABORT, ABORT!
							return;
						}

						if (str instanceof Token) {
							continue;
						}

						pattern.lastIndex = 0;

						var match = pattern.exec(str),
						    delNum = 1;

						// Greedy patterns can override/remove up to two previously matched tokens
						if (!match && greedy && i != strarr.length - 1) {
							pattern.lastIndex = pos;
							match = pattern.exec(text);
							if (!match) {
								break;
							}

							var from = match.index + (lookbehind ? match[1].length : 0),
							    to = match.index + match[0].length,
							    k = i,
							    p = pos;

							for (var len = strarr.length; k < len && (p < to || !strarr[k].type && !strarr[k - 1].greedy); ++k) {
								p += strarr[k].length;
								// Move the index i to the element in strarr that is closest to from
								if (from >= p) {
									++i;
									pos = p;
								}
							}

							/*
        * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
        * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
        */
							if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
								continue;
							}

							// Number of tokens to delete and replace with the new match
							delNum = k - i;
							str = text.slice(pos, p);
							match.index -= pos;
						}

						if (!match) {
							if (oneshot) {
								break;
							}

							continue;
						}

						if (lookbehind) {
							lookbehindLength = match[1].length;
						}

						var from = match.index + lookbehindLength,
						    match = match[0].slice(lookbehindLength),
						    to = from + match.length,
						    before = str.slice(0, from),
						    after = str.slice(to);

						var args = [i, delNum];

						if (before) {
							++i;
							pos += before.length;
							args.push(before);
						}

						var wrapped = new Token(token, inside ? _.tokenize(match, inside) : match, alias, match, greedy);

						args.push(wrapped);

						if (after) {
							args.push(after);
						}

						Array.prototype.splice.apply(strarr, args);

						if (delNum != 1) _.matchGrammar(text, strarr, grammar, i, pos, true, token);

						if (oneshot) break;
					}
				}
			}
		},

		tokenize: function tokenize(text, grammar, language) {
			var strarr = [text];

			var rest = grammar.rest;

			if (rest) {
				for (var token in rest) {
					grammar[token] = rest[token];
				}

				delete grammar.rest;
			}

			_.matchGrammar(text, strarr, grammar, 0, 0, false);

			return strarr;
		},

		hooks: {
			all: {},

			add: function add(name, callback) {
				var hooks = _.hooks.all;

				hooks[name] = hooks[name] || [];

				hooks[name].push(callback);
			},

			run: function run(name, env) {
				var callbacks = _.hooks.all[name];

				if (!callbacks || !callbacks.length) {
					return;
				}

				for (var i = 0, callback; callback = callbacks[i++];) {
					callback(env);
				}
			}
		}
	};

	var Token = _.Token = function (type, content, alias, matchedStr, greedy) {
		this.type = type;
		this.content = content;
		this.alias = alias;
		// Copy of the full string this token was created from
		this.length = (matchedStr || "").length | 0;
		this.greedy = !!greedy;
	};

	Token.stringify = function (o, language, parent) {
		if (typeof o == 'string') {
			return o;
		}

		if (_.util.type(o) === 'Array') {
			return o.map(function (element) {
				return Token.stringify(element, language, o);
			}).join('');
		}

		var env = {
			type: o.type,
			content: Token.stringify(o.content, language, parent),
			tag: 'span',
			classes: ['token', o.type],
			attributes: {},
			language: language,
			parent: parent
		};

		if (env.type == 'comment') {
			env.attributes['spellcheck'] = 'true';
		}

		if (o.alias) {
			var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
			Array.prototype.push.apply(env.classes, aliases);
		}

		_.hooks.run('wrap', env);

		var attributes = Object.keys(env.attributes).map(function (name) {
			return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
		}).join(' ');

		return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';
	};

	if (!_self.document) {
		if (!_self.addEventListener) {
			// in Node.js
			return _self.Prism;
		}
		// In worker
		_self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
			    lang = message.language,
			    code = message.code,
			    immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);

		return _self.Prism;
	}

	//Get current script and highlight
	var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

	if (script) {
		_.filename = script.src;

		if (!_.manual && !script.hasAttribute('data-manual')) {
			if (document.readyState !== "loading") {
				if (window.requestAnimationFrame) {
					window.requestAnimationFrame(_.highlightAll);
				} else {
					window.setTimeout(_.highlightAll, 16);
				}
			} else {
				document.addEventListener('DOMContentLoaded', _.highlightAll);
			}
		}
	}

	return _self.Prism;
}();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}

/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': /<!--[\s\S]*?-->/,
	'prolog': /<\?[\s\S]+?\?>/,
	'doctype': /<!DOCTYPE[\s\S]+?>/i,
	'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\s\S])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:('|")[\s\S]*?(\1)|[^\s>]+)/i,
				inside: {
					'punctuation': /[=>"']/
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] = Prism.languages.markup['entity'];

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function (env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;

/* **********************************************
     Begin prism-css.js
********************************************** */

Prism.languages.css = {
	'comment': /\/\*[\s\S]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': /url\((?:(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
	'string': {
		pattern: /("|')(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'property': /(\b|\B)[\w-]+(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
			lookbehind: true,
			inside: Prism.languages.css,
			alias: 'language-css'
		}
	});

	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|').*?\1/i,
			inside: {
				'attr-name': {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				'punctuation': /^\s*=\s*['"]|['"]\s*$/,
				'attr-value': {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: 'language-css'
		}
	}, Prism.languages.markup.tag);
}

/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [{
		pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
		lookbehind: true
	}, {
		pattern: /(^|[^\\:])\/\/.*/,
		lookbehind: true
	}],
	'string': {
		pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /(\.|\\)/
		}
	},
	'keyword': /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};

/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b-?(0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
	'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true,
		greedy: true
	}
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\\\|\\?[^\\])*?`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript'
		}
	});
}

Prism.languages.js = Prism.languages.javascript;

/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
		return;
	}

	self.Prism.fileHighlight = function () {

		var Extensions = {
			'js': 'javascript',
			'py': 'python',
			'rb': 'ruby',
			'ps1': 'powershell',
			'psm1': 'powershell',
			'sh': 'bash',
			'bat': 'batch',
			'h': 'c',
			'tex': 'latex'
		};

		Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
			var src = pre.getAttribute('data-src');

			var language,
			    parent = pre;
			var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}

			if (parent) {
				language = (pre.className.match(lang) || [, ''])[1];
			}

			if (!language) {
				var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
				language = Extensions[extension] || extension;
			}

			var code = document.createElement('code');
			code.className = 'language-' + language;

			pre.textContent = '';

			code.textContent = 'Loading…';

			pre.appendChild(code);

			var xhr = new XMLHttpRequest();

			xhr.open('GET', src, true);

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {

					if (xhr.status < 400 && xhr.responseText) {
						code.textContent = xhr.responseText;

						Prism.highlightElement(code);
					} else if (xhr.status >= 400) {
						code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
					} else {
						code.textContent = '✖ Error: File does not exist or is empty';
					}
				}
			};

			xhr.send(null);
		});
	};

	document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);
})();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(38)))

/***/ }),
/* 38 */
/***/ (function(module, exports) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('rendered-example',{attrs:{"example":_vm.example,"component":_vm.component}}),_vm._v(" "),_c('code-snippet',{attrs:{"example":_vm.example}}),_vm._v(" "),_c('props-table',{attrs:{"component":_vm.component}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ })
/******/ ]);
});