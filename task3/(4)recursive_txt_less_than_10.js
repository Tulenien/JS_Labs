"use strict";
const rls = require('readline-sync');
const fs = require("fs");

const fold = rls.question("Input folder name: ");
const base = "./";

const files = fs.readdirSync(base + fold);

function scaner(y){
    let y1 = fs.readdirSync(y);
    for(let x of y1)
    {
        let stat = fs.statSync(y + '/' + x);
        if(!stat.isFile())
        {
            let path = y + '/' + x;
            scaner(path);
        }
        else
        {
            const c_str = fs.readFileSync(y + '/' + x);
            if (c_str.length < 10)
            {
                console.log(x);
            }
        }
    }
}
scaner(base + fold);