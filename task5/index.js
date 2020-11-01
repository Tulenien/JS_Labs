"use strict";

const fs = require("fs");
const express = require("express");

const app = express();
const port = 8888;
app.listen(port);
console.log(`Server on port ${port}`);

const way = __dirname + "/static";
app.use(express.static(way));

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/sum", function(request, response) {
    const a = request.query.a;
    const b = request.query.b;
    const s = parseInt(a) + parseInt(b);
    response.end(JSON.stringify({
        result: s
    }));
});

function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

app.post("/save/info", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const a = obj["a"];
        const b = obj["b"];
        const c = obj["c"];
        const contentString = `A: ${a} B: ${b} C: ${c}`;
        fs.writeFileSync("file.txt", contentString);
        response.end(JSON.stringify({
            result: "Save content ok"
        }));
    });
});