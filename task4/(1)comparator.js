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

app.get("/compare", function(req, res)
{
    const a = req.query.a;
    const b = req.query.b;
    const c = req.query.c;
    const aNum = parseFloat(a);
    const bNum = parseFloat(b);
    const cNum = parseFloat(c);
    let answer = NaN;
    if (aNum > bNum)
    {
        answer = cNum;
        if (aNum > cNum)
            answer = aNum;
    }
    else
    {
        answer = cNum;
        if (bNum > cNum)
            answer = bNum
    }
    const JSON_answer = JSON.stringify({result: answer});
    res.end(JSON_answer); 
}
);