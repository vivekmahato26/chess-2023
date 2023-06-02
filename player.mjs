
//ES6 Syntax 
const fun = () => console.log("Player imported")

export default fun  // default export
//import name from "./player" default import

export const xqwe = 10; // named export
// import {xqwe} from "./player" named import 
// import {xqwe as x1} from "./player" named import with alias 



//ES5 Syntax
// module.exports =  fun  // default export
//const name = require("./player") default import

// const xqwe = 10;
// module.exports = {xqwe} // named export
// const {xqwe} = require("./player") import 
// const {xqwe:x1} = require("./player") named import with alias 