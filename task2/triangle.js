"use strict";

class Triangle
{
    constructor(a, b, c)
    {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    possible()
    {
        return ((this.a + this.b > this.c)
             && (this.a + this.c > this.b) 
             && (this.b + this.c > this.a));
    }
    side_sum()
    {
        return this.a + this.b + this.c;
    }
    area()
    {
        let p = this.side_sum() / 2;
        return Math.sqrt(p * (p - this.a) * (p - this.b) * (p - this.c));
    }
    is_rectangular()
    {
        let eps = 1e-7;
        return this.a * this.a + this.b * this.b - this.c * this.c < eps;
    }
}

function main()
{
    let triangle = new Triangle(3.00000,4.000, 5.00000);
    console.log(triangle.possible());
    console.log(triangle.side_sum());
    console.log(triangle.area());
    console.log(triangle.is_rectangular());
    return 0;
}
main();