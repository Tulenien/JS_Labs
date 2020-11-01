"use strict";

const fs = require("fs");
const exp = require("express");

const app = exp();
const port = 8888;
app.listen(port);
console.log(`Server on port ${port}`);

const way = __dirname + "/(1)static";
app.use(exp.static(way));

app.use(function(req, res, next) 
{
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-reqed-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

function loadBody(req, callback) 
{
    let body = [];
    req.on('data', (chunk) => 
    {
        body.push(chunk);
    }).on('end', () => 
    {
        body = Buffer.concat(body).toString();
        callback(body);
    });
}

app.post("/save", function(req, resp) 
{
    loadBody(req, function(body) 
    {
        let obj = JSON.parse(body);
        // These fields must be unique
        const email = obj["mail"];
        const tel = obj["telephone"];

        const current = fs.readFileSync('DB.json', "utf8");
        if (!current)
        {
            // create an object list
            fs.writeFileSync('DB.json', '[' + body + ']');
            resp.end(JSON.stringify({"result": "Content saved successfully"}));
        }
        else
        {
            // Check the DB for repeatance
            let cur = JSON.parse(current);
            let flag = true;
            for (let i = 0; i < cur.length && flag; i++)
            {
                if (cur[i].mail === email)
                    flag = false;
                else if (cur[i].telephone === tel)
                    flag = false;
            }
            if (flag)
            {
                // New element added
                cur.push(JSON.parse(body));
                // Changed to string to be properly written in .json file
                fs.writeFileSync('DB.json', JSON.stringify(cur));                
                resp.end(JSON.stringify({"result": "Content saved successfully"}));
            }
            else
            {
                resp.end(JSON.stringify({"result": "Error. Entry is not unique!"}));
            }
        }
    });
});

app.get("/human", function(request, response)
{
    let flag = false;
    let rs = {};
    const mail = request.query.mail;
    const base = fs.readFileSync('DB.json', "utf8");
    if (base)
    {
        const current = JSON.parse(base);
        for (let i = 0; i < current.length && !flag; i++)
        {
            if (current[i].mail === mail)
            {
                flag = true
                rs = current[i];
            }
        }
    }
    if (flag)
    {
        let object = 
        {
            result:
            {
                email: rs.mail,
                telephone: rs.telephone,
                surname: rs.surname
            }
        }
        response.end(JSON.stringify(object));
        //response.end(JSON.stringify({"result": "Found"}));
    }
    else
    {
        response.end(JSON.stringify({"result": "Not found"}));
    }
})
