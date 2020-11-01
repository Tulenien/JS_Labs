"use strict";
function factor(x) {
    if (x != 1) {
        return x * factor(x - 1);
    } else {
        return 1;
    }
}
const n = "" + process.argv[2];
let result = factor(n);
console.log(result);