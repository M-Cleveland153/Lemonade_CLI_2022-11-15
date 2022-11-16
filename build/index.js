"use strict";

var _vorpal = _interopRequireDefault(require("vorpal"));
var _lib = require("./lib");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
//have to destructure because that is a named import

var vorpal = (0, _vorpal["default"])();
vorpal.command('createOrder <name> <phoneNumber>', 'Creates an order and saves it as a JSON file').action(function (_ref) {
  var name = _ref.name,
    phoneNumber = _ref.phoneNumber;
  // prompt user for how many lemonades they want
  return this.prompt({
    type: 'number',
    name: 'numLemonades',
    "default": 1,
    message: 'How many lemonades would you like to order?'
  }).then(_lib.createQuestionsArray).then((0, _lib.promptIngredientQuestions)(this)) //the command object is passed in as this [46:18]
  .then(_lib.createLemonadesArray).then(_lib.addPriceToLemonades).then((0, _lib.createOrderObject)(name, phoneNumber)).then(_lib.writeOrderToFile);
});
vorpal.command('getOrders <lemonadeStand>', 'Get all orders for the given lemonade stand').action(function (_ref2, callback) {
  var lemonadeStand = _ref2.lemonadeStand;
  var orders = (0, _lib.readAllFiles)(lemonadeStand);
  this.log("There are ".concat(orders.length, " orders at ").concat(lemonadeStand));
  var _iterator = _createForOfIteratorHelper(orders),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var order = _step.value;
      this.log("Order:");
      this.log("Total Price: ".concat(order.total));
      this.log("Lemonades:");
      this.log(order.lemonades);
      this.log("Customer:");
      this.log(order.customer);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  callback();
});
vorpal.delimiter('lemonade-stand$').show(); //runs the CLI