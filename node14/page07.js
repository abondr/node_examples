var fs = require("fs");
var writeFile = "writeMe.txt";
var dir1 = "dir1";
fs.readFile(writeFile, "utf8", (error1, data) => {
    if (error1 === null) {
        fs.unlink(writeFile, (error1) => {});
    }
});

fs.readdir(dir1, function (error1, data1) {
    console.log(error1);
    console.log(data1);
});