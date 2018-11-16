var fs = require("fs");
var readFile = "readMe.txt";
var myReadStream = fs.createReadStream(__dirname + `/${readFile}`); // `utf8`
myReadStream.on(`data`, (chunk) => {
    console.log(`=====`);
    console.log(chunk);
});