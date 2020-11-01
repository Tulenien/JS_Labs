"use strict";

class Dots
{
    constructor()
    {
        this.name = "name";
        this.x = 0;
        this.y = 0;
    }

    view()
    {
        console.log(`${this.name}: x = ${this.x}, y = ${this.y}`);
    }
}

class Line
{
    constructor()
    {
        this.start = new Dots();
        this.end = new Dots();
    }
    init_line(xs, ys, xe, ye)
    {
        this.start.x = xs;
        this.start.y = ys;
        this.end.x = xe;
        this.end.y = ye;
    }
    view()
    {
        console.log(`start:(${this.start.x},${this.start.y}), end:(${this.end.x},${this.end.y})`);
    }
    get_len()
    {
        return Math.sqrt((this.start.x - this.end.x) * (this.start.x - this.end.x) +
                         (this.start.y - this.end.y) * (this.start.y - this.end.y))
    }
}

function main()
{
    let dots = new Dots();
    let line = new Line();
    line.init_line(0, 0, 5, 0);
    line.view();
    console.log(line.get_len());
    return 0;
}
main();