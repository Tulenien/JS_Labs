"use strict";

const readlineSync = require('readline-sync');
const fs = require("fs");

const N = parseInt(readlineSync.question("Input number of strings: "));

let str_mas = [];
let value = true;

for (let i = 0; i < N; i++)
{
    value = readlineSync.question("Input string: ");
    if(value !== "" && !(value.length % 2)) str_mas.push(value);
}

const json_str = JSON.stringify(str_mas);

const nameString = "Nstrings.txt";

fs.writeFileSync(nameString, json_str);
