"use strict";

class student_journal
{
    constructor ()
    {
        this.students = new Map();
    }

    create (ticket_number, group, marks)
    {
        if (this.students.has(ticket_number))
        {
            console.log("Not unique!");
        }
        else
        {
            let data = [];
            data.push(group);
            data.push(marks);
            this.students.set(ticket_number, data);
        }
    }

    read (ticket_number)
    {
        let found = this.students.get(ticket_number);
        return found;
    }

    update (ticket_number, new_ticket_number, new_group, new_marks)
    {
        let data = [];
        if (!this.students.has(new_ticket_number))
        {
            let to_upd = this.read(ticket_number);
            if (to_upd)

                data.push(new_group);
                data.push(new_marks);
                this.students.delete(ticket_number);
                this.students.set(ticket_number, data);
        }
    }

    delete (ticket_number)
    {
        if (this.students.has(ticket_number))
        {
            this.students.delete(ticket_number);
        }
    }

    average_mark (ticket_number)
    { 
        let average_mark = 0;
        let count = 0;
        if (this.students.size)
        {
            let found = this.read(ticket_number);
            if (found)
            {
                for (let mark of found[1])
                {
                    average_mark += parseInt(mark);
                    count += 1
                }
                average_mark /= count
            }
        }
        return average_mark;
    }
   
    students_in_group(group)
    {
        let students_in_group = [];
        let values = [];
        if (this.students.size)
        {
            for (let student of this.students.keys())
            {
                values = this.students.get(student);
                if (group === values[0])
                {
                    students_in_group.push(student);
                    students_in_group.push(values[1]);
                }
            }
        }
        return students_in_group;
    }

    most_marks()
    {
        let values = [];
        let maxv = 0;
        let sname = "";
        if (this.students.size)
        {
            for (let student of this.students.keys())
            {
                values = this.students.get(student);
                if (values[1].length > maxv)
                {
                    maxv = values[1].length;
                    sname = student;
                }
            }
        }
        return sname;
    }

    no_marks()
    {
        let values = [];
        let sname = "";
        if (this.students.size)
        {
            for (let student of this.students.keys())
            {
                values = this.students.get(student);
                if (!values[1].length)
                {
                    sname = student;
                    break;
                }
            }
        }
        return sname;
    }
}

function main()
{
    let my_j = new student_journal();
    my_j.create("007", "IU7-77", [4, 5, 4, 3, 4, 5])
    my_j.create("008", "IU7-78", [4, 5, 4, 3, 4, 5, 3, 5])
    my_j.create("009", "IU7-78", [])
    console.log(my_j.average_mark("007"))
    console.log(my_j.students_in_group("IU7-77"))
    console.log(my_j.most_marks("008"));
    console.log(my_j.no_marks());
    return 0;
}
main();