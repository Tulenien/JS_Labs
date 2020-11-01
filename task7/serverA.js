"use strict";

const express = require("express");
const fs = require("fs");
const { formatWithOptions } = require("util");

const app = express();
const port = 5002;
app.listen(port);
console.log("Server on port " + port);

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
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

app.post("/input/car", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const model = obj.model;
        const price = obj.price;
        const carRecords = fs.readFileSync("carRecords.txt", "utf-8");
        let myCarObj = JSON.parse(carRecords);
        myCarObj[model] = price;
        console.log(myCarObj);
        fs.writeFileSync("carRecords.txt", JSON.stringify(myCarObj));
    });
});

app.post("/get/car", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const model = obj.model;
        const carRecords = fs.readFileSync("carRecords.txt", "utf-8");
        let myCarObj = JSON.parse(carRecords);
        response.end(JSON.stringify({
            model: model,
            price: myCarObj[model]
        }));
    });
});