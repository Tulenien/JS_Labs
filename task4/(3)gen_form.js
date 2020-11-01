"use strict";

const fs = require("fs");

function genForm(mas, address)
{
    let html_text = '<!DOCTYPE html>';
    html_text += '<head><meta charset = "utf-8"><title>Send request</title></head>';
    html_text += '<body><form method = "GET" action = "/' + address + '">';
    for (let i = 0; i < mas.length; i++)
    {
        html_text += '<p>Введите ' + mas[i] + ':</p>';
        html_text += '<input name = "' + mas[i] + '", spellcheck = "false", autocomplete = "off"></input>';
    }
    html_text += '<br><input type = "submit", value = "send request"></form></body></html>'
    return html_text;
}

let mas = ["field1", "field2", "field3", "field4"];
let address = "responce";
let res = genForm(mas, address);

fs.writeFileSync("form.html", res);