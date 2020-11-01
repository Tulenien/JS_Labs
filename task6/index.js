"use strict";

const exp = require("express");

const app = exp();
const port = 8888;
app.listen(port);
console.log(`server on port ${port}`);

app.set("view engine", "hbs");

app.use(function(req, res, next)
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
})

app.get("/page/department", function(request, response)
{
    const infObject = 
    {
        faculty: "Информатика и системы управления",
        department: "Программная инженерия",
        index: 7
    }
    response.render("pageDep.hbs", infObject);
})

app.get("/page/pupils", function(request, response)
{
    const infObject = 
    {
        pupils:
        [
            {a: "Петров", b: "Пётр"},
            {a: "Иванов", b: "Иван"},
            {a: "Дмитриев", b: "Дмитрий"},
            {a: "Александров", b: "Александр"}
        ]
    };
    response.render("pagePupils.hbs", infObject);
})

