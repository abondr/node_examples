const electron = require("electron");
const fs = require('fs');
const path = require("path");
const url = require("url");
let dirList = [], filesList = [], filesList2 = [];
let fileIndex = 0;
let startPath = "D:\\abcd2";

let getFiles = function (path, files) {
    fs.readdirSync(path).forEach(function (file) {
        let attr = [];
        let parent = path.substring(path.lastIndexOf("/") + 1);
        let subpath = path + '/' + file;
        if (fs.lstatSync(subpath).isDirectory()) {
            attr['is_folder'] = "1";
            attr['element'] = subpath.replace(startPath, "");
            dirList.push(attr);
            getFiles(subpath, files);
        } else {
            let parent = subpath.substring(0, subpath.lastIndexOf("/"));
            parent = parent.replace(startPath, "");
            attr['is_folder'] = "0";
            attr['parent'] = parent;
            attr['element'] = file;
            attr['absolute_path'] = subpath;
            filesList.push(attr);
            filesList2.push(attr);
        }

    });
}
app.on("ready", function () {
    getFiles(startPath, "*");
    console.log(dirList);
    console.log("======================================================");
    console.log(filesList);
});
