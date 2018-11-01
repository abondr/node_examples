function Dog(name, breed) {
    var new_dog = this; // the 'new' object
    new_dog.name = name;
    if (breed) { this.breed = breed; }
}
Dog.prototype.breed = 'mixed breed';
Dog.prototype.speak = function () {
    return "Woof! Woof!";
}
Dog.prototype.who_am_i = function () {
    return "I'm " + this.name + " and my breed is " + this.breed;
}
Dog.prototype.diet = "carnivore1";
Dog.prototype.get_private = function () {
    return this._private;
}
var snoopy = new Dog('Snoopy', 'Beagle');
var lassie = new Dog('Lassie', 'Collie');
var mutt = new Dog('Mutt');
lassie._private = "Verified data.";
Dog.diet = "carnivore2"; // not prototype
console.log(Dog.diet);
console.log(snoopy.diet);
console.log(lassie.get_private());
console.log(mutt.who_am_i());
console.log(snoopy.who_am_i());
console.log(lassie.who_am_i());
console.log(lassie);