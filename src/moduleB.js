console.log('running module B')

const internalVariable = 'Hey from Module B'

function internalFunction () {
    console.log('Running inside the internalFuntion of Module B')
}

module.exports = {
    internalFunction: internalFunction,
    internalVariable: internalVariable
}

console.log('Finished Running Module B')