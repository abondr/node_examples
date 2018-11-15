var events = require(`events`);
var util = require(`util`);

var Person = function (name) {
    this.name = name
}
util.inherits(Person, events.EventEmitter);
//Person.prototype.emit("speak", " hello there");

var James = new Person(`James`);
var Earl = new Person(`Earl`);
var Aniket = new Person(`Aniket`);
var peoples = [James, Earl, Aniket];
peoples.forEach(function (person1) {
    person1.on("speak", function (msg1) {
        console.log(person1.name + " said " + msg1);
    });
});
//Person.prototype.emit("speak", "1234");
James.emit("speak", "asfcfef1");
Earl.emit("speak", "asfcfef2");
Aniket.emit("speak", "asfcfef3");