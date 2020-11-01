"use strict";

const exp = require("express");
const fs = require("fs");

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

app.get("/mas/create", function(req, res)
{
    const a = req.query.a;
    const b = req.query.b;
    const c = req.query.c;
    const aNum = parseInt(a);
    const bNum = parseInt(b);
    const cNum = parseInt(c);
    let answer = [];
    if (cNum)
    {
        let start = bNum;
        let fin = aNum;
        if (aNum < bNum)
        {
            start = aNum;
            fin = bNum;
        }
        for (let i = aNum; i < bNum; i++)
        {
            if (!(i % cNum))
                answer.push(i);
        }
    }
    const JSON_answer = JSON.stringify({result: answer});
    res.end(JSON_answer); 
}
);