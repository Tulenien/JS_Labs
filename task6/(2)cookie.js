"use strict";

let chosen = -1;

const clients = 
[
    { log: "afdpro_46", pass: "oldschool", hobby: "collecting stamps", age: 74},
    { log: "__BackBeak__", pass: "a11w4ys", hobby: "reading", age: 26 },
    { log: "wasP", pass: "qw3rty", hobby: "gaming", age: 15 },
    { log: "admin", pass: "dific1lP4SSworD", hobby: "languages", age: 40 }
];

const express = require("express");
const fs = require("fs");

const cookieSession = require("cookie-session");

const app = express();
const port = 8888;
app.listen(port);
console.log(`Server on port ${port}`);

app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))

app.get("/login", function(request, response) {
    const nameString = "exit.html";
    if (fs.existsSync(nameString)) {
        const contentString = fs.readFileSync(nameString, "utf8");
        response.end(contentString);
    } else {
        const contentString = fs.readFileSync("bad.html", "utf8");
        response.end(contentString);
    }
});

app.get("/account", function(request, response) {
    if(!request.session.login) return response.redirect("/login")
    if(!request.session.password) return response.redirect("/login")

    if (chosen == -1) {
        response.redirect("/login");
    }
    let username = request.session.login
    let age = clients[chosen].age
    let hobby = clients[chosen].hobby

    const infoObject = {
        descriptionValue: "Information",
        username,
        age,
        hobby
    };
    response.render("account.hbs", infoObject);
});

app.get("/login_process", function (request, response) {
    let flag = false;
    chosen = -1;
    const login = request.query.login;
    const password = request.query.password;
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].log === login) {
            if (clients[i].pass === password) {
                console.log(clients[i].log);
                console.log(clients[i].pass);
                // Set cookie
                request.session.login = login;
                request.session.password = password;
                console.log(request.session.login);
                chosen = i;
                flag = true;
                response.redirect("/account");
            } else {
                response.end("Wrong Password");
            }
        }
    }
    if (!flag) {
        response.end("Not registered");
    }
});

app.get("/logout", function(request, response) {
    request.session = null;
    response.redirect("/login")
});