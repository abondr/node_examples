var events = require(`events`);
var someEvent = `someEvent`;
var myEmitter = new events.EventEmitter();
myEmitter.on(someEvent, function (mssg) {
    console.log(mssg);
});

myEmitter.emit(someEvent, `event was emitted`);