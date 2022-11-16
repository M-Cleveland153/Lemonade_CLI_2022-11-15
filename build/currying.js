"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
// const add = (a, b) => a + b

// const curriedAdd = a => b => c => a + b + c

//function syntax:

// function add(a, b, c) {
//     return a + b + c
// }

// function curriedAdd(a) {
//     return function (b) {
//         return function (c) {
//             return a + b + c
//         }
//     }
// }

// console.log(add(1,2,3))
// console.log(curriedAdd(1)(2)(3))

var add = function add(a, b) {
  return a + b;
};
var curry = function curry(f) {
  var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return function (a) {
      return a.length >= f.length ? f.apply(void 0, _toConsumableArray(a)) : curry(f, a);
    }([].concat(_toConsumableArray(arr), args));
  };
};
var curriedAdd = curry(add);
console.log(curriedAdd(1, 2));

// const increment = curriedAdd(1)
// const add5 = curriedAdd(5) 

// console.log(add(1, 2))
// console.log(curriedAdd(1)(2))
// console.log(increment(10))
// console.log(add5(20))

// // rest parameters
// const f = (num, ...a) => console.log(a)

// f(10, 20, 30, 40, 'Hello', true, [1,2,3], {a:'Bye', b: 'Hi' })

// // spread arguments into a function
// const a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// f(...a) // equivalent to f(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)