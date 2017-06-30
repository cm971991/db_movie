// region android 4.3 Promise
require('es6-promise').polyfill()
// endregion

// region startWidth
if (!String.prototype.startsWith) {
  (function() {
    'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
    let defineProperty = (function() {
      // IE 8 only supports `Object.defineProperty` on DOM elements
      try {
        let object = {};
        let $defineProperty = Object.defineProperty;
        let result = $defineProperty(object, object, object) && $defineProperty;
      } catch(error) {}
      return result;
    }());
    let toString = {}.toString;
    let startsWith = function(search) {
      if (this === null) {
        throw TypeError();
      }
      let string = String(this);
      if (search && toString.call(search) === '[object RegExp]') {
        throw TypeError();
      }
      let stringLength = string.length;
      let searchString = String(search);
      let searchLength = searchString.length;
      let position = arguments.length > 1 ? arguments[1] : undefined;
      // `ToInteger`
      let pos = position ? Number(position) : 0;
      if (pos !== pos) { // better `isNaN`
        pos = 0;
      }
      let start = Math.min(Math.max(pos, 0), stringLength);
      // Avoid the `indexOf` call if no match is possible
      if (searchLength + start > stringLength) {
        return false;
      }
      let index = -1;
      while (++index < searchLength) {
        if (string.charCodeAt(start + index) !== searchString.charCodeAt(index)) {
          return false;
        }
      }
      return true;
    };
    if (defineProperty) {
      defineProperty(String.prototype, 'startsWith', {
        'value': startsWith,
        'configurable': true,
        'writable': true
      });
    } else {
      String.prototype.startsWith = startsWith;
    }
  }());
}
// endregion

// region find
if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    'use strict';
    if (this === null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    let list = Object(this);
    let length = list.length >>> 0;
    let thisArg = arguments[1];
    let value;

    for (let i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}
// endregion
