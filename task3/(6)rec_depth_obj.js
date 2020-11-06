"use strict";

function maxDepth()
{
    let head = {};
    let maxLevel = 0;
    let check = true;
    let current = head;
    while (check) 
    {
        current.newObj = {};
        maxLevel++;
        try {
                const jsonStr = JSON.stringify(head);
                current = current.newObj;
            } 
        catch (error) 
            {
                check = false;
            }
        }
        console.log(maxLevel);
}

maxDepth();

let tree = 
{
    a:
    {
        aa:
        {
            aaa: 1,
            aab: 2
        },
        ab:
        {
            aba:
            {
                abaa: 3,
                abab: 4,
                abac: 5,
            },
            abb:
            {
                abba: 6,
            },
            abc:
            {
                abca: 7, 
                abcb: 8,
                abcc:
                {
                    abcca:
                    {
                        abccaa:
                        {
                            abccaaa: 9
                        }
                    }
                }
            }
        }
    }
};

//tree.a.ab.abc.abcc.abcca.abccaa.abccaaa = tree.a.ab.abc.abcc.abcca.abccaa;

function getDepth(obj)
{
    let _is_handeled_flag = 'check';

    let depth = 0;
    let maxdepth = 0;
    let result = getProperty(obj);
    	
    function getProperty(my_obj, stack) 
    {
        let path = '';
        for (let next in my_obj) 
        {
            if (typeof(my_obj[next]) === 'object') 
            {
                depth++;
                if (!my_obj[next][_is_handeled_flag]) 
                {
                    Object.defineProperty(my_obj[next],_is_handeled_flag, 
                    {
                        value: true,
                        writable:false,
                        configurable: true
                    });
                    if (!stack)
                    {
                        path = 'rootObject.' + next;
                    }
                    else
                    {
                        path = stack + '.' + next;
                    }
                    maxdepth = getProperty(my_obj[next], path, maxdepth);
                } 
                else 
                {
                    path = stack + '.' + next;
                    console.error('Cycle reference');
                }
                delete my_obj[next][_is_handeled_flag]
            } 
            else 
            {
                if (depth > maxdepth)
                {
                    maxdepth = depth;
                }
                //console.log('Value: ', my_obj[next]);
                //console.log(stack + '.' + next);
            }
        }
        depth--;
        return maxdepth;
    }
    console.log(result);
}

getDepth(tree);

