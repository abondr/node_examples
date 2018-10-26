const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const fs = require('fs');
const path = require("path");
const url = require("url");
let winArr = [];
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

    getFiles(startPath, "*");
    filesList.forEach(function (filePath) {
        $(".se-pre-con").show();
        count++;
        row1 = "<tr><td>" + count + "</td><td>" + filePath + "</td></tr>";
        $("#list_table tbody").append(row1);
        var row2 = "<tr><td colspan=2><div class=\"progress\"><div style=\"width:100%;\" class=\'progress progress-striped\'>"
            + "<div class=\"progress-bar progress-bar-warning\" role=\"progressbar\" "
            + " style=\"width: 0%; \">&nbsp;</div></div ></div ></td ></tr > ";
        $("#list_table tbody").append(row2);
    });
    return this;
}

$.fn.hideLoader = function () {
    $(".se-pre-con").hide();
    return this;
}
$(window).on("load", function () {
    $(window).callFileOperation().hideLoader();
});
$("#btnExecute").on("click", function () {
    //filesList

});

