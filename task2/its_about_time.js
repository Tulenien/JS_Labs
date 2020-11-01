"use strict";

function main()
{
    let cnt = 0;    
    let wait = 1000;
    let times = 0;
    function counter()
    {
        cnt++;
        if (cnt > 10)
        {
            wait = 0;
            if (cnt > 20)
            {
                cnt = 1;
                times++;
                wait = 1000;
            }
        }
        console.log(cnt);
    }
    let interval = setInterval(() => {
        setTimeout(() => {
            counter()
        }, wait);
        if (times > 2)
        {
            clearInterval(interval);
        }
    }, 1000);
}
main();