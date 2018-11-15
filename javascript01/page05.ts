class Person {
    firstName: string;
    lastName: string;
    constructor(fname: string, lname: string) {
        this.firstName = fname;
        this.lastName = lname;
    }
    getFullName() {
        return this.firstName + " " + this.lastName;
    }
}
var p1 = new Person('abon', 'duttaroy');
console.log(p1.getFullName());