var fs = require("fs");
var readFile = "readMe.txt";
var writeFile = "writeMe.txt";
//var readMe = fs.readFileSync("readMe.txt", "utf8");
//fs.writeFileSync("writeMe.txt", readMe);
fs.readFile(readFile, "utf8", function (error1, fileContent) {
    fs.writeFile(writeFile, fileContent, function (error2) {
        console.log(error1);
        console.log(error2);
    });
});