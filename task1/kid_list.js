"use strict";
const output_change = `$ $ changed`;

class KidStorage
{
    constructor ()
    {
        this.kid_list = new Map();
    }

    create (sec_name, age) 
    {
        if (this.kid_list.has(sec_name))
        {
            console.log("Not unique!");
        }
        else
        {
            this.kid_list.set(sec_name, age);
        }
    }

    read (sec_name)
    {
        let found = this.kid_list.get(sec_name);
        return found;
    }

    update (sec_name, new_name, new_age)
    {
        if (!this.kid_list.has(new_name))
        {
            let to_upd = this.read(sec_name);
            if (to_upd)
                console.log(output_change, to_upd);
                this.kid_list.delete(sec_name);
                this.kid_list.set(new_name, new_age);
        }
    }

    delete (sec_name)
    {
        if (this.kid_list.has(sec_name))
        {
            this.kid_list.delete(sec_name);
        }
    }

    average_age ()
    {
        let average_age = 0;
        if (this.kid_list.size)
        {
            for (let value of this.kid_list.values())
            {
                console.log(value);
                average_age += parseInt(value);
            }
            average_age /= this.kid_list.size
        }
        return average_age;
    }

    oldest_kid()
    {
        let oldest_kid = 0;
        let oldest_kid_key = "";
        if (this.kid_list.size)
        {
            for (let key of this.kid_list.keys())
            {
               if (parseInt(this.kid_list.get(key)) > oldest_kid)
                    oldest_kid_key = key;
                    oldest_kid = parseInt(this.kid_list.get(key));
            }
            this.read(key);
            return key;
        }
    }

    age_in_range(a, b)
    {
        let found = [];
        if (this.kid_list.size)
        {
            for (let key of this.kid_list.keys())
            {
                let temp = parseInt(this.kid_list.get(key));
                if (temp >= a && temp <= b)
                    found.push(this.kid_list.get(key));
            }
        }
        return found;
    }

    letter_name(letter)
    {
        let found = [];
        if (this.kid_list.size)
        {
            for (let key of this.kid_list.keys())
            {
                if (key.charAt(0) === letter)
                    found.push(this.kid_list.get(key));
            }
        }
        return found;
    }

    length_name(length)
    {
        let found = [];
        if (this.kid_list.size)
        {
            for (let key of this.kid_list.keys())
            {
                if (key.size > length)
                    found.push(this.kid_list.get(key));
            }
        }
        return found;
    }

    letters_first(letters)
    {
        let found = [];
        if (this.kid_list.size)
        {
            for (let key of this.kid_list.keys())
            {
                if (letters.includes(key.charAt(0)));
                    found.push(this.kid_list.get(key));
            }
        }
        return found;
    }
}

function main()
{
    let list = new KidStorage();
    list.create("Иванов", 13);
    list.create("Иванов", 13);
    list.create("Иванов", 14);
    list.create("Петров", 10);
    list.create("Сидоров", 17);
    //console.log("Hi");
    console.log("Иванов: " + list.read("Иванов"));
    list.delete("Иванов");
    list.update("Иванов", "Сидоров", "12");
    console.log(list.average_age());
    return 0;
}
main();