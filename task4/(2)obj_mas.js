"use strict";

const fs = require("fs");
const exp = require("express");

const app = exp();
const port = 8888;

app.listen(port);
console.log("My server is listening to port number ", port);

app.get("/page", function(req, res)
{
    const name = req.query.p;
    if (fs.existsSync(name))
    {
        const content = fs.readFileSync(name, "utf-8");
        res.end(content);
    }
    else
    {
        const content = fs.readFileSync("bad.html", "utf-8");
        res.end(content);
    }
}
);

function getValues(obj, index) 
{
    let _is_handeled_flag = 'check';
    let object = obj[Object.keys(obj)[0]][index];

    let mas = [];
    let result = getProperty(object);
            
    function getProperty(my_obj, stack) 
    {
        let path = '';
        for (let next in my_obj) 
        {
            if (typeof(my_obj[next]) === 'object')
                getProperty(my_obj[next], path);
            else
            {
                console.log('Value: ', my_obj[next]);
                mas.push(my_obj[next]);
            }
        }
    }
    return mas;
}

app.get("/mas/read", function(req, res)
{
    const index = req.query.index;
    const content = fs.readFileSync("obj_mas.json");
    const obj = JSON.parse(content);
    let mas = getValues(obj, index);
    const JSON_answer = JSON.stringify(mas);
    res.end(JSON_answer);
}
);
