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

const add = (a, b) => a + b  
const curry = (f, arr = []) => (...args) =>
  (a => (a.length >= f.length ? f(...a) : curry(f, a)))([...arr, ...args])

const curriedAdd = curry(add)

console.log(curriedAdd(1,2))



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