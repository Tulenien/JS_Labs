"use strict";

const express = require("express");
const fs = require("fs");
const { formatWithOptions } = require("util");

const app = express();
const port = 5001;
app.listen(port);
console.log("Server on port " + port);

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// загрузка тела
function loadBody(request, callback) {
    let body = [];
    request.on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

// приём запроса
app.post("/input/warehouse", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const storage = obj.wareHouseName;
        const Qty = obj.fields;
        const storeRecords = fs.readFileSync("storageList.txt", "utf-8");
        let myStrObj = JSON.parse(storeRecords);
        myStrObj[storage] = Qty;
        console.log(myStrObj);
        fs.writeFileSync("storageList.txt", JSON.stringify(myStrObj));
    });
});

app.post("/get/warehouse", function(request, response) {
    loadBody(request, function(body) {
        const obj = JSON.parse(body);
        const storage = obj.wareHouseName;
        const storeRecords = fs.readFileSync("storageList.txt", "utf-8");
        let myStoreObj = JSON.parse(storeRecords);
        response.end(JSON.stringify({
            wareHouse: storage,
            Qty: myStoreObj[storage]
        }));
    });
});