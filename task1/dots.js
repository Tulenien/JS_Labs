"use strict";

class Dots
{
    constructor ()
    {
        this.points = new Map();
    }

    create (point_name, x, y)
    {
        if (this.points.has(point_name))
        {
            console.log("Not unique!");
        }
        else
        {
            let coords = {};
            coords["x"] = x;
            coords["y"] = y;
            this.points.set(point_name, coords);
        }
    }

    read (point_name)
    {
        let found = this.points.get(point_name);
        return found;
    }

    update (point_name, new_point_name, new_x, new_y)
    {
        let temp = {};
        if (!this.points.has(new_point_name))
        {
            let to_upd = this.read(point_name);
            if (to_upd)
                temp["x"] = new_x;
                temp["y"] = new_y;
                this.points.delete(point_name);
                this.points.set(new_point_name, temp);
        }
    }

    delete (point_name)
    {
        if (this.points.has(point_name))
        {
            this.points.delete(point_name);
        }
    }

    most_distance()
    {
        let pts = [];
        let most_dist = 0;
        let dots = [];
        if (this.points.size > 1)
        {
            for (let one of this.points.keys())
            {
                for (let other of this.points.keys())
                {
                    if (one != other)
                    {
                        let dx = this.points.get(one)["x"] - this.points.get(other)["x"];
                        let dy = this.points.get(one)["y"] - this.points.get(other)["y"];
                        let res = Math.sqrt(dx * dx + dy * dy);
                        if (res > most_dist)
                        {
                            most_dist = res;
                            dots = [];
                            dots.push(one);
                            dots.push(other);
                        }
                    }
                }
            }
        }
        return dots;
    }
    
    keep_distance(point_name, cnst)
    {
        let dots = [];
        if (this.points.size > 1)
        {
            for (let one of this.points.keys())
            {
                if (one != point_name)
                {
                    let dx = this.points.get(one)["x"] - this.points.get(point_name)["x"];
                    let dy = this.points.get(one)["y"] - this.points.get(point_name)["y"];
                    let res = Math.sqrt(dx * dx + dy * dy);
                    if (!(res > cnst))
                    {
                        dots.push(one);
                    }
                }
            }
        }
        return dots;
    }

    underlined(axis, direction)
    {
        let result = [];
        if (axis === "X")
        {
            if (direction === "left")
            {
                for (let dot of this.points.keys())
                {
                    if (this.points.get(dot)["x"] < 0)
                    {
                        result.push(dot);
                    }
                }
            }
            else if (direction === "right")
            {
                for (let dot of this.points.keys())
                {
                    if (this.points.get(dot)["x"] > 0)
                    {
                        result.push(dot);
                    }
                }
            }
        }
        else if ( axis === "Y")
        {
            if (direction === "above")
            {
                for (let dot of this.points.keys())
                {
                    if (this.points.get(dot)["y"] > 0)
                    {
                        result.push(dot);
                    }
                }
            }
            else if (direction === "below")
            {
                for (let dot of this.points.keys())
                {
                    if (this.points.get(dot)["y"] < 0)
                    {
                        result.push(dot);
                    }
                }                
            }
        }
        return result;
    }

    rect_area(uplx, uply, dorx, dory)
    {
        let dots = [];
        if (this.points.size > 1)
        {
            for (let one of this.points.keys())
            {
                if (this.points.get(one)["x"] >= uplx && this.points.get(one)["x"] <= dorx/
                    this.points.get(one)["y"] <= uply && this.points.get(one)["y"] >= dory)
                {
                    dots.push(one);
                }
            }
        }
        return dots;
    }
}

function main()
{
    let dots = new Dots();
    dots.create("a0", 128, 128);
    dots.create("a2", 256, 4096);
    dots.create("a3", -128, 256);
    dots.create("a4", 128, -2048);
    dots.create("a5", 128, -1);
    dots.create("a6", 1, 1);
    dots.create("a7", 1, -5);
    dots.create("a8", 1, 6);
    dots.create("a9", -1, 7);
    // console.log(dots.read("a0"));
    dots.update("ao", "a1", 64, 64);
    dots.create("a0", 1, 8);
    dots.delete("a1");
    console.log(dots.most_distance());
    console.log(dots.keep_distance("a6", 30));
    console.log(dots.underlined("X", "left"));
    console.log(dots.underlined("X", "right"));
    console.log(dots.underlined("Y", "above"));
    console.log(dots.underlined("Y", "below"));
    console.log(dots.rect_area(-100, 100, 400, 0));

    return 0;
}
main();