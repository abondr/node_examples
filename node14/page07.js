var fs = require("fs");
var writeFile = "writeMe.txt";
var dir1 = "dir1";
fs.readFile(writeFile, "utf8", (error1, data) => {
    if (error1 == null) {
        fs.unlink(writeFile, (error1) => {});
    } else {
        fs.writeFile(writeFile, "good text", (error1) => {});
    }
});

fs.readdir(dir1, (error1, data1) => {
    if (error1 != null) {
        fs.mkdir(dir1, (error2) => {});
    } else {
        fs.rmdir(dir1, (error3) => {});
    }
});