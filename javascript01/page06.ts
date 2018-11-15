class Person {
    firstName: string;
    lastName: string;
    constructor(fname: string, lname: string) {
        this.firstName = fname;
        this.lastName = lname;
    }
    getFullName(): string {
        return this.firstName + " " + this.lastName;
    }
}
class Programmer extends Person {
    subject: string;
    constructor(fname: string, lname: string, subject: string) {
        super(fname, lname);
        this.subject = subject;
    }
    getInfo(): string {
        return super.getFullName() + " subject = " + this.subject;
    }
}
var p1 = new Programmer('abon', 'duttaroy', "javascript");
console.log(p1.getInfo());