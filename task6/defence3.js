"use strict";

let chosen = -1;

const express = require("express");
const fs = require("fs");

const cookieSession = require("cookie-session");

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

app.use(cookieSession({
    name: 'session',
    keys: ['hhh', 'qqq', 'vvv'],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }))

app.get("/getfile", function(request, response) {
    if(!request.session.login) return response.redirect("/filename")
    const filename = request.session.login;
    const file = fs.readFileSync(filename, "utf8");

    const insides = {
        descriptionValue: "File contains:",
        file
    };
    response.render("fileopen.hbs", insides);
});

app.get("/filename", function (request, response) 
{
    const cookie = request.session.login;
    if (cookie)
    {
        response.redirect("/getfile");
    }
    const file = request.query.file;
    let flag = false;
    let fl = fs.readFileSync(file, "utf8");
    if (fl)
    {
        flag = true;
        // Set cookie
        request.session.login = file;
    }
    if (flag)
    {
        response.redirect("/getfile");
    }
    else
    {
        response.end("File not found");
    }
});

app.get("/logout", function(request, response) {
    request.session = null;
    response.redirect("/filename")
});