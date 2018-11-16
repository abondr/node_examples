var fs = require("fs");
var readFile = "vid1.mp4";
var writeFile = "vid2.mp4";
var myReadStream = fs.createReadStream(__dirname + `/${readFile}`); // `utf8`
var myWriteStream = fs.createWriteStream(__dirname + `/${writeFile}`);
myReadStream.on(`data`, (chunk) => {
    console.log(`=====`);
    myWriteStream.write(chunk);
});