"use strict";

const express = require("express");
const request = require("request");
const fs = require("fs");

const app = express();
const port = 5000;
app.listen(port);
console.log(`Server on port ${port}`);

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get("/login", function(request, response) {
    const nameString = "main.html";
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});

app.get("/add/warehouse", function(request, response) {
    const contentString = fs.readFileSync("iStorage.html", "utf8");
    response.end(contentString);
});

app.get("/input/warehouse", function(request, response) {
    const wareHouseName = request.query.warehouse;
    const fields = request.query.field;
    console.log(wareHouseName);
    console.log(fields);
    
    sendPost("http://localhost:5001/input/warehouse", JSON.stringify({
        wareHouseName: wareHouseName,
        fields: fields
    }), function(answerString) {
        response.end(answerString);
    });
});

app.get("/find/warehouse", function(request, response) {
    const contentString = fs.readFileSync("fStorage.html", "utf8");
    response.end(contentString);
});

app.get("/get/warehouse", function(request, response) {
    const wareHouseName = request.query.warehouse;
    console.log(wareHouseName);
    
    sendPost("http://localhost:5001/get/warehouse", JSON.stringify({
        wareHouseName: wareHouseName,
    }), function(answerString) {
        response.end(answerString);
    });
});

app.get("/add/car", function(request, response) {
    const contentString = fs.readFileSync("iCar.html", "utf8");
    response.end(contentString);
});

app.get("/input/car", function(request, response) {
    const model = request.query.model;
    const price = request.query.price;

    console.log(model);
    console.log(price);
    
    sendPost("http://localhost:5002/input/car", JSON.stringify({
        model: model,
        price: price
    }), function(answerString) {
        response.end(answerString);
    });
});

app.get("/find/car", function(request, response) {
    const contentString = fs.readFileSync("fCar.html", "utf8");
    response.end(contentString);
});

app.get("/get/car", function(request, response) {
    const model = request.query.model;

    console.log(model);
    
    sendPost("http://localhost:5002/get/car", JSON.stringify({
        model: model,
    }), function(answerString) {
        response.end(answerString);
    });
});

function sendPost(url, body, callback) {
    const headers = {};
    headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    headers["Connection"] = "close";
    request.post({
        url: url,
        body: body,
        headers: headers,
    }, function (error, response, body) {
        if(error) {
            callback(null);
        } else {
            callback(body);
        }
    });
}
