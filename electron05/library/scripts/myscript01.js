var fs = require('fs')
var $ = require("jquery");
var path = process.cwd()
var filesList = [];
var startPath = "D:\\abcd2";
$("h2").html(startPath)
var getFiles = function (path, files) {
    fs.readdirSync(path).forEach(function (file) {
        var subpath = path + '/' + file;
        if (fs.lstatSync(subpath).isDirectory()) {
            getFiles(subpath, files);
        } else {

            filesList[fs.statSync(path + '/' + file).size] =
                path + '/' + file;
        }
    });
}

getFiles(startPath, "*")
console.log(filesList) // will log all files in directory

filesList.forEach(function (filePath) {
    $("#fileListing").append(" <li class=\"list-group-item "
        + "d-flex justify-content-between align-items-center\">"
        + filePath + "<span class=\"badge badge-primary "
        + "badge-pill\">00</span></li>");
});

