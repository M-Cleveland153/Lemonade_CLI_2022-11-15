"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.moduleBFunction = moduleBFunction;
exports.moduleBVariable2 = exports.moduleBVariable = void 0;
console.log('Running Module B');
var moduleBVariable = 'Named Variable from Module B';
exports.moduleBVariable = moduleBVariable;
var moduleBVariable2 = 50;
exports.moduleBVariable2 = moduleBVariable2;
function moduleBFunction() {
  console.log('Running from Module B');
}
var _default = {
  a: moduleBVariable,
  b: moduleBVariable2,
  c: moduleBFunction
};
exports["default"] = _default;
console.log('Finished running module B');