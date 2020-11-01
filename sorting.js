"use strict";
 
const rls = require("readline-sync");

//сортировка произвольных объектов, компаратор из вне. Программа пол. на вход 1 - по возр. 2 - по уб
class MyClass
{
    constructor()
    {
        this.contains = 
        [
            {
                "age": 41,
                "surname": "Ivanov"
            },
            {
                "age": 36,
                "surname": "Petrov"
            },
            {
                "age": 44,
                "surname": "Osipov"
            },
            {
                "age": 31,
                "surname": "Sidorov"
            },
            {
                "age": 67,
                "surname": "Belov"
            },
            {
                "age": 42,
                "surname": "Chernov"
            }
        ];
        for (let elem in this.contains)
            console.log(this.contains[elem]);
    }

    sort(comparator, direction)
    {
        this.contains = mergeSort(this.contains, direction, comparator);
        
        function merge(mas1, mas2, direction, comparator)
        {
            let result = [];
            let i = 0; 
            let j = 0;
          
            while(i < mas1.length && j < mas2.length)
            {
              if(comparator(mas1[i], mas2[j], direction)) 
              {
                result.push(mas2[j]);
                j++;
              } 
              else 
              {
                result.push(mas1[i]);
                i++;
              }
            }
            while(i < mas1.length)
            {
              result.push(mas1[i]);
              i++;
            }
            while(j < mas2.length)
            {
              result.push(mas2[j]);
              j++;
            }
            return result;
        }
        function mergeSort(mas, direction, comparator)
        {
            if(mas.length <= 1) return mas;

            let half = Math.ceil(mas.length / 2);
            let left = mergeSort(mas.splice(0, half), direction, comparator);
            let right = mergeSort(mas.splice(-half), direction, comparator);

            return merge(left, right, direction, comparator);
        }
    }
}

function comparator(obj1, obj2, direction)
{
    let res = true;
    if (obj1["age"] < obj2["age"])
        res = false;
    if (direction === 1)
        return res;
        else
    return !res;
}

const t = parseInt(rls.question("Sort asc(1), desc(2): "));
let obj = new MyClass();
obj.sort(comparator, t);

for (let elem in obj)
    console.log(obj[elem]);