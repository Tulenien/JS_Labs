"use strict";

const fs = require('fs');
const { delimiter } = require('path');
const name = "./tree.json";
const content = fs.readFileSync(name, "utf-8");
let tree = JSON.parse(content);

function getPath(obj) {
    let _is_handeled_flag = 'check';
    let depth = 0;
    let maxdepth = 0;
    let branch = '';
    let result = getProperty(obj);
    function getProperty(my_obj, stack) 
    {
        let path = '';
        for (let next in my_obj) 
        {
            if (typeof(my_obj[next]) === 'object') 
            {
                depth++;
                if (!my_obj[next][_is_handeled_flag]) 
                {
                    Object.defineProperty(my_obj[next],_is_handeled_flag, 
                    {
                        value: true,
                        writable:false,
                        configurable: true
                    });
                    if (!stack)
                        path = next;
                    else
                        path = stack + '.' + next;
                    branch = getProperty(my_obj[next], path, maxdepth);
                } 
                else 
                {
                    path = stack + '.' + next;
                    console.error('Cycle reference at', path);
                }
                delete my_obj[next][_is_handeled_flag]
            } 
            else 
            {
                if (depth > maxdepth)
                {
                    maxdepth = depth;
                    branch = stack;
                }
            }
        }
        depth--;
        return branch;
    }
    return result;
}

let path = '';
path = getPath(tree);
//console.log(path);
path = path.split('.');
//console.log(path);

let cursor = tree[path[0]];
for (let i = 1; i < path.length; i++)
{
    cursor = cursor[path[i]];
}
for (let elem in cursor)
{
    console.log(cursor[elem]);
}
