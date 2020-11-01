"use strict";

const fs = require("fs");
const nameString = "Nstrings.json";
const json_str = fs.readFileSync(nameString, "utf8");

//console.log(json_str);
const str = JSON.parse(json_str);

for (let string in str) 
{
    //console.log(string);
    let flag = 1;
    for (let j = 0; j < str[string].length; j++)
    {
        if (!(str[string][j] === 'a'||
              str[string][j] === 'e'||
              str[string][j] === 'i'||
              str[string][j] === 'o'||
              str[string][j] === 'u'||
              str[string][j] === 'y'))
            {
                flag = 0;
                break;
            }
        }
    if (flag)
    {
        console.log(str[string]);
    }
}