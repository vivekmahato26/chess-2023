
//ES6 Syntax 
// const fun = () => console.log("Player imported")

// export default fun  // default export
//import name from "./player" default import

// export const xqwe = 10; // named export
// import {xqwe} from "./player" named import 
// import {xqwe as x1} from "./player" named import with alias 



//ES5 Syntax
// module.exports =  fun  // default export
//const name = require("./player") default import

// const xqwe = 10;
// module.exports = {xqwe} // named export
// const {xqwe} = require("./player") import 
// const {xqwe:x1} = require("./player") named import with alias 



const fun = (x,y) => {
    let a = x, b =y;
    let sum = 0;
    while(a > 0) {
        let al = a%10;
        let bl = b%10;
        a= parseInt(a/10);
        b= parseInt(b/10);
        sum += al*bl 
    }
    return sum;
}

const arrSum = (arr,sum) => {
    for (const a of arr) {
        for (const b of arr) {
            if(a == b) continue;
            if(a+b == sum) return true;
        }
    }
    return false;
}


let a = 19141

const happ = (num) => {
    if(num == 1 ) return "happy num";
    let arr = [];
    let a = num;
    while(a > 0) {
        arr.push(a%10);
        a= parseInt(a/10);
    }
    a = arr.reduce((acc,e) => acc + e*e, 0);
    return happ(a)
}
console.log(happ(a));

// do {
//     let arr = [];
//     while(a > 0) {
//         arr.push(a%10);
//         a= parseInt(a/10);
//     }
//     console.log(arr);
//     a = arr.reduce((a,e) => a + e*e, 0);
//     console.log(a);
//     if(a == 1) {
//         console.log("happy num")
//         break;
//     }

// } while(a >-1)
