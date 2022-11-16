console.log('Running Module A')

require('./moduleB')
require('./moduleB')
require('./moduleB')
require('./moduleB')
require('./moduleB')

const moduleBImports = require('./moduleB')

moduleBImports.internalFunction()

const moduleBImportsAgain = require('./moduleB')

moduleBImportsAgain.internalFunction()

console.log(moduleBImportsAgain.internalVariable)

console.log('Finished running module A')

