const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
var eventSender;
const fs = require('fs');
const path = require("path");
const url = require("url");
let win2, winArr = [];
let file2 = "pages//page02.html",
    file3 = "pages//page03.html";
let filesList = [];
let filesList2 = [];
let startPath = "D:\\abcd2";
//"D:\\abcd2";
let getFiles = function (path, files) {
    fs.readdirSync(path).forEach(function (file) {
        var subpath = path + '/' + file;
        if (fs.lstatSync(subpath).isDirectory()) {
            getFiles(subpath, files);
        } else {
            var fileSize = fs.statSync(path + '/' + file).size;
            var filePath = path + '/' + file;
            filesList[fileSize] = filePath;
            filesList2[fileSize] = { 'filePath': filePath, 'fileSize': fileSize };
        }
    });
}

let createWindow = function (renderProcess = win2, htmlPage = file2, attr = []) {
    renderProcess = new BrowserWindow(attr);
    renderProcess.loadURL(
        url.format({
            "pathname": path.join(__dirname, htmlPage),
            "protocol": "file",
            "slashes": true
        })
    );
    // Open the DevTools.
    renderProcess.webContents.openDevTools()
    renderProcess.on("closed", () => {
        renderProcess = null;
    });
}
app.on("ready", function () {
    getFiles(startPath, "*");
    ipcMain.on("question-file-list", function (event, arguments) {
        eventSender = event.sender;
        filesList.forEach(function (filePath, fileSize) {
            createWindow(
                winArr[fileSize],
                file3, {
                    'width': 240,
                    'height': 160,
                    'frame': true,
                    'show': true
                }
            );
            eventSender.send("answer-file-list", { 'fileSize': fileSize, 'filePath': filePath });
        });
        eventSender.send("answer-file-list", "end_of_list");
    });
    let fileList3 = Object.values(filesList2);
    ipcMain.on("question-file-name", function (event, arguments) {
        event.sender.send("answer-file-name", fileList3.shift());
    });
    createWindow(
        win2,
        file2, {
            'width': 900,
            'height': 750,
            'frame': true
        }
    );

});