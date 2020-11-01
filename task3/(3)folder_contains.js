"use strict";

const rls = require('readline-sync');
const fs = require("fs");

const fold = rls.question("Input folder name: ")
const ext = rls.question("Input extension name: ");
//console.log(fold, ext);

const base = "./";
const files = fs.readdirSync(base + fold);

//console.log("Length: " + files.length);

for(let i = 0; i < files.length; i++) {
    const fileName = files[i];
    if (fileName.includes('.' + ext))
    {
        console.log(fileName);
        const c_str = fs.readFileSync(base + fold + "/" + fileName, "utf8");
        console.log(c_str + '\n');
    }
}