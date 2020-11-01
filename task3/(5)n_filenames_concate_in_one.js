"use strict";

const rls = require('readline-sync');
const fs = require("fs");

const N = parseInt(rls.question("Input number of files: "));

const base = "./";
let files = [];
for (let i = 0; i < N; i++)
{
    const file = rls.question("Input filename: ");
    files.push(file)
}

let res = "";

for(let i = 0; i < files.length; i++) 
{
    const fileName = files[i];
    const c_str = fs.readFileSync(base + fileName, "utf8");
    res += c_str;
}
const nameString = "allstrings.txt";

fs.writeFileSync(nameString, res);