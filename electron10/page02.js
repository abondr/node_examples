const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const path = require("path");
const url = require("url");
let win1;
const file3 = "pages//page03.html";
let row1 = "<tr><td>1</td><td>name 1</td></tr>";
var filesList = [];
var startPath = "D:\\abcd2";
var getFiles = function (path, files) {
    fs.readdirSync(path).forEach(function (file) {
        var subpath = path + '/' + file;
        if (fs.lstatSync(subpath).isDirectory()) {
            getFiles(subpath, files);
        } else {
            filesList[fs.statSync(path + '/' + file).size] = path + '/' + file;
        }
    });
}
let count = 0;
$.fn.callFileOperation = function () {
    $(".se-pre-con").show();
    getFiles(startPath, "*");
    filesList.forEach(function (filePath) {
        count++;
        row1 = "<tr><td>" + count + "</td><td>" + filePath + "</td></tr>";
        $("#list_table tbody").append(row1);
    });
    console.log(2);
    return this;
}

$.fn.hideLoader = function () {
    $(".se-pre-con").hide();
    console.log(3);
    return this;
}
$(window).callFileOperation().hideLoader();