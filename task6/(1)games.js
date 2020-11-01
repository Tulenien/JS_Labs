
"use strict";

const express = require("express");

const app = express();
const port = 8888;
app.listen(port);
console.log(`Server on port ${port}`);

app.set("view engine", "hbs");

// заголовки в ответ клиенту
app.use(function(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

const all_games = 
[
    {
        title: "The Legend of Zelda: Ocarina of Time",
        age_restriction: 0,
        description: "As a young boy, Link is tricked by Ganondorf, the King of the Gerudo Thieves.\
        The evil human uses Link to gain access to the Sacred Realm, where he places his tainted \
        hands on Triforce and transforms the beautiful Hyrulean landscape into a barren wasteland. \
        Link is determined to fix the problems he helped to create, so with the help of Rauru he \
        travels through time gathering the powers of the Seven Sages."    
    },
    {
        title: "Tony Hawk's Pro Skater 2",
        age_restriction: 0,
        description: "As most major publishers' development efforts shift to any number of \
        next-generation platforms, Tony Hawk 2 will likely stand as one of the last truly \
        fantastic games to be released on the PlayStation."    
    },
    {
        title: "Grand Theft Auto IV",
        age_restriction: 18,
        description: "As most major publishers' development efforts shift to any number of \
        next-generation platforms, Tony Hawk 2 will likely stand as one of the last truly \
        fantastic games to be released on the PlayStation."    
    },
    {
        title: "Marvel's Spider-Man: Miles Morales",
        age_restriction: 13,
        description: "This is an action game in which players assume the role of Miles Morales\
        /Spider-Man as he battles underground gangs and villains while attempting to save \
        New York City from attacks. From a third-person perspective, players fight crime, \
        swing around buildings, and engage in melee combat with enemies. Characters mostly \
        punch, kick, and throw each other during fights; Miles can also use special \
        electricity-based attacks. Some enemies use pistols and/or machine guns during fights; \
        gunshots result in small splashes of blood when characters are hit. Cutscenes depict \
        additional acts of violence: a character beaten with clubs while tied to a chair; \
        an explosion that kills a character. A handful of lines in the dialogue reference \
        running/dealing drugs. The words “sh*t” and “a*shole” appear in dialogue."    
    },
    {
        title: "The Walking Dead: Saints & Sinners - Complete Edition",
        age_restriction: 18,
        description: "This is an action/horror game in which players explore \
        a post-apocalyptic New Orleans, while interacting with survivors and \
        fighting off zombies. From a first-person perspective, players search \
        for supplies, collect weapons, and use axes, guns, and knives to kill \
        characters (e.g., zombies, humans) in melee and ranged combat. Enemies \
        emit large splatters of blood when shot or stabbed, and some weapons \
        allow players to decapitate zombies. Players can also continue to shoot\
        /chop up humans and zombies when down (i.e., post-mortem damage) and use \
        severed heads or limbs as bludgeoning weapons. During the course of the \
        game, players can obtain and smoke cigarettes from a first-person \
        perspective. The word “f**k” appears in the dialogue."    
    },
    {
        title: "Spacebase Startopia",
        age_restriction: 10,
        description: "This is a strategy game in which players manage a space \
        station. Players cater to alien creatures' needs (e.g., habitation, \
        wellness) to earn energy and expand facilities. As players build \
        space station facilities, they can use drones and robots to defend \
        against alien vermin and invaders. From a pulled-back perspective, \
        players use lasers and missiles to attack enemy creatures, resulting \
        in mild explosions; some creatures disappear amid splatters of green \
        blood. Alien creatures can sometimes be seen vomiting on the ground \
        when sick and/or when wellness needs are not fulfilled."    
    },
    {
        title: "DOOM Eternal: The Ancient Gods - Part One",
        age_restriction: 18,
        description: "This is a first-person shooter in which players assume \
        the role of the Doom Slayer as he battles evil forces on Earth and in \
        demonic dimensions. Players use machine guns, shotguns, laser rifles, \
        and blasters to kill demons in frenetic combat. Large blood-splatter \
        effects occur frequently as enemies get decapitated and/or dismembered\
        during combat. Players can also use blades and chainsaws to dismember \
        and decapitate enemies at close range. Combat is frenetic, highlighted \
        by realistic gunfire, screams of pain, and large explosions."    
    },
    {
        title: "Little Nightmares II",
        age_restriction: 13,
        description: "This is an adventure platformer in which players assume \
        the role of Mono, a boy trying to survive a strange, hostile world. \
        As players traverse mysterious environments, they can run, jump, climb, \
        and sneak around various obstacles and enemies. Getting caught by the \
        large ghoul-like enemies usually results in Mono's death: getting \
        struck by objects; being chased and shot; getting eaten alive. The \
        game often has a dark tone, with sounds of characters screaming, \
        depictions of body bags and meat grinders, and blood stains splattered\
         on objects in a hospital and morgue. One sequence depicts human-like \
         characters falling from rooftops, apparently committing suicide."    
    },
    {
        title: "Hotline Miami",
        age_restriction: 18,
        description: "Step into the neon-soaked underground of 1980s Miami \
        as bizarre messages on your answering machine seem to be urging you \
        to commit terrible acts of violence - but will you obey?"    
    },
    {
        title: "NHL 21",
        age_restriction: 10,
        description: "In this hockey simulation game, players can select \
        teams from NHL rosters and play realistically depicted games of \
        hockey. During the course of each match, players may initiate brief \
        fistfights; the perspective shifts to isolate two players throwing \
        punches and grabbing at one another until the fight is broken up."    
    }
]

app.get("/page/games/:age", function(request, response) {
    let games = [];
    const age = request.params.age.trim();
    for (let i = 0; i < all_games.length; i++)
    {
        if (all_games[i].age_restriction < age)
        {
            games.push(all_games[i]);
        }
    }
    const infObject = {
        description: "Games for " + age + " years:",
        games
    };
    response.render("games.hbs", infObject);
});