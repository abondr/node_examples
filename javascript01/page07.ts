interface Person {
    firstName: string;
    lastName: string;
    getFullName(): string;
}
class Teacher implements Person {
    firstName: string;
    lastName: string;
    constructor(fname, lname) {
        this.firstName = fname;
        this.lastName = lname;
    }
    getFullName(): string {
        return "Teacher Name " + this.firstName + " " + this.lastName;
    }
}
class Programmer implements Person {
    firstName: string;
    lastName: string;
    constructor(fname, lname) {
        this.firstName = fname;
        this.lastName = lname;
    }
    getFullName(): string {
        return "Programmer Name " + this.firstName + " " + this.lastName;
    }
}

var t1 = new Teacher("abon", "duttaroy");
console.log(t1.getFullName());
var p1 = new Programmer("bapan", "duttaroy");
console.log(p1.getFullName());