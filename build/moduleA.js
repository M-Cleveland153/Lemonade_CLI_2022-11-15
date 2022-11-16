"use strict";

console.log('Running Module A');
require('./moduleB');
require('./moduleB');
require('./moduleB');
require('./moduleB');
require('./moduleB');
var moduleBImports = require('./moduleB');
moduleBImports.internalFunction();
var moduleBImportsAgain = require('./moduleB');
moduleBImportsAgain.internalFunction();
console.log(moduleBImportsAgain.internalVariable);
console.log('Finished running module A');