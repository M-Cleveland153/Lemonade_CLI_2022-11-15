"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.writeOrderToFile = exports.writeFileSync = exports.updateOrderTotal = exports.readAllFiles = exports.promptIngredientQuestions = exports.map = exports.createQuestionsArray = exports.createOrderObject = exports.createLemonadesArray = exports.createLemonade = exports.calculateLemonadePrice = exports.buildQuestionArray = exports.addPriceToLemonades = exports.addLemonadeToOrder = void 0;
var _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
//file system (built in to Node)

var curry = function curry(f) {
  var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return function (a) {
      return a.length === f.length ? f.apply(void 0, _toConsumableArray(a)) : curry(f, a);
    }([].concat(_toConsumableArray(arr), args));
  };
};

//curry((a, b) => a + b)
// ((f, arr = []) => (...args) => (a => (a.length === f.length ? f(...a) : curry(f, a)))([...arr, ...args]))[(a, b) => a + b/f]
// (...args) => args.length === 2 ?((a, b) => a + b)(...args) : curry((a, b) => a + b, args)

//Transducer: takes a reducer and returns a new reducer
// transformer ==> reducer ==> reducer
var map = function map(f) {
  return function (reducer) {
    return function (acc, curr, idx, arr) {
      return reducer(acc, f(curr, idx), idx, arr);
    };
  };
};
exports.map = map;
var calculateLemonadePrice = function calculateLemonadePrice(lemonade) {
  var result = 0.75;
  for (var key in lemonade) {
    switch (key) {
      case 'lemonJuice':
        result += lemonade[key] * 0.3;
        break;
      case 'water':
        result += lemonade[key] * 0.01;
        break;
      case 'sugar':
        result += lemonade[key] * 0.2;
        break;
      case 'iceCubes':
        result += lemonade[key] * 0.05;
        break;
      default:
        break;
    }
  }
  return result;
};

//takes the entire order object, pull the lemonades array our, use the for loop
exports.calculateLemonadePrice = calculateLemonadePrice;
var calculateOrderTotal = function calculateOrderTotal(lemonades) {
  var result = 0;
  var _iterator = _createForOfIteratorHelper(lemonades),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _lemonade = _step.value;
      result += _lemonade.price;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return result;
};
var writeFileSync = function writeFileSync(fileName, order) {
  // stringify serializes the order object from JS to JSON
  // this creates a new file in the folder Cooksys Lemonade Stand that we created
  // ... I am not sure how it knows which folder to use.
  _fs["default"].writeFileSync(fileName, JSON.stringify(order)); //[42:14 in CLI part 2]
};
exports.writeFileSync = writeFileSync;
var readAllFiles = function readAllFiles(dirName) {
  console.log(_fs["default"].readdirSync(dirName));
  // const orders = []  // added with Helena
  var _iterator2 = _createForOfIteratorHelper(_fs["default"].readdirSync(dirName)),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var name = _step2.value;
      orders.push(JSON.parse(_fs["default"].readFileSync(dirName + '/' + name)));
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return orders;
};
exports.readAllFiles = readAllFiles;
var buildQuestionArray = function buildQuestionArray(val, i) {
  return [{
    type: 'number',
    name: "lemonJuice".concat(i),
    message: "How many cups of lemon juice do you want in lemonade ".concat(i + 1, "?")
  }, {
    type: 'number',
    name: "water".concat(i),
    message: "How many cups of water do you want in lemonade ".concat(i + 1, "?")
  }, {
    type: 'number',
    name: "sugar".concat(i),
    message: "How many cups of sugar do you want in lemonade ".concat(i + 1, "?")
  }, {
    type: 'number',
    name: "iceCubes".concat(i),
    message: "How many ice cubes do you want in lemonade ".concat(i + 1, "?")
  }];
};
exports.buildQuestionArray = buildQuestionArray;
var createLemonade = curry(function (response, curr, i) {
  return {
    lemonJuice: Number.parseInt(response['lemonJuice' + i]),
    water: Number.parseInt(response['water' + i]),
    sugar: Number.parseInt(response['sugar' + i]),
    iceCubes: Number.parseInt(response['iceCubes' + i])
  };
});
exports.createLemonade = createLemonade;
var addLemonadeToOrder = function addLemonadeToOrder(acc, curr) {
  return _objectSpread(_objectSpread({}, acc), {}, {
    lemonades: [].concat(_toConsumableArray(acc.lemonades), [_objectSpread(_objectSpread({}, curr), {}, {
      price: calculateLemonadePrice(lemonade)
    })])
  });
};
exports.addLemonadeToOrder = addLemonadeToOrder;
var updateOrderTotal = function updateOrderTotal(order) {
  return _objectSpread(_objectSpread({}, order), {}, {
    total: calculateOrderTotal(order.lemonades)
  });
};

// split: (a: [key: string, value: string]) -> [[string, string, string], string]
exports.updateOrderTotal = updateOrderTotal;
var split = function split(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    key = _ref2[0],
    val = _ref2[1];
  return [key.split(/(\d+)/), val];
}; // [['lemonJuice', '0', ''], val]           [18:20 in Promises part 2]

//parseNums: ([[key: 'lemonJuice', idx: string], val:string]) -> [string, number, number]
var parseNums = function parseNums(_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
    _ref4$ = _slicedToArray(_ref4[0], 2),
    key = _ref4$[0],
    idx = _ref4$[1],
    val = _ref4[1];
  return [key, Number.parseInt(idx), Number.parseInt(val)];
};
var makeLemonades = function makeLemonades(acc, _ref5) {
  var _ref6 = _slicedToArray(_ref5, 3),
    key = _ref6[0],
    idx = _ref6[1],
    val = _ref6[2];
  return acc[idx] ? (acc[idx][key] = val) && acc : [].concat(_toConsumableArray(acc), [_defineProperty({}, key, val)]);
};

// (...reducers) -> reducer -> reduce
var compose = function compose() {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }
  return function (x) {
    return fns.reduceRight(function (y, f) {
      return f(y);
    }, x);
  };
};
var createLemonadesArray = function createLemonadesArray(response) {
  return Object.entries(response).reduce(compose(map(split), map(parseNums))(makeLemonades), []);
};
exports.createLemonadesArray = createLemonadesArray;
var createQuestionsArray = function createQuestionsArray(_ref8) {
  var numLemonades = _ref8.numLemonades;
  return _toConsumableArray(Array(Number.parseInt(numLemonades))).flatMap(buildQuestionArray);
};
exports.createQuestionsArray = createQuestionsArray;
var promptIngredientQuestions = function promptIngredientQuestions(command) {
  return function (questions) {
    return command.prompt(questions);
  };
};
exports.promptIngredientQuestions = promptIngredientQuestions;
var addPriceToLemonades = function addPriceToLemonades(lemonadesWithoutPrice) {
  return lemonadesWithoutPrice.map(function (lemonade) {
    return _objectSpread(_objectSpread({}, lemonade), {}, {
      price: calculateLemonadePrice(lemonade)
    });
  });
};
exports.addPriceToLemonades = addPriceToLemonades;
var createOrderObject = function createOrderObject(name, phoneNumber) {
  return function (lemonades) {
    return {
      customer: {
        name: name,
        phoneNumber: phoneNumber
      },
      lemonadeStand: {
        name: 'Cooksys Lemonade Stand'
      },
      lemonades: lemonades,
      total: lemonades.reduce(function (acc, curr) {
        return acc + curr.price;
      }, 0)
    };
  };
};
exports.createOrderObject = createOrderObject;
var writeOrderToFile = function writeOrderToFile(order) {
  return writeFileSync(order.lemonadeStand.name + '/' + order.customer.name + '.json', order);
};
exports.writeOrderToFile = writeOrderToFile;