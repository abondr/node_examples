const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcipcMain;
const fs = require('fs');
const path = require("path");
const url = require("url");
let win2, winArr = [];
let file2 = "pages//page02.html", file3 = "pages//page03.html";
let filesList = [];
let startPath = "D:\\abcd2";
let getFiles = function (path, files) {
    fs.readdirSync(path).forEach(function (file) {
        var subpath = path + '/' + file;
        if (fs.lstatSync(subpath).isDirectory()) {
            getFiles(subpath, files);
        } else {
            filesList[fs.statSync(path + '/' + file).size] = path + '/' + file;
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
    createWindow(
        win2,
        file2, {
            'width': 1024,
            'height': 768,

        }
    );
    ipcMain.on("question_file_list", function (event, arg) {
        getFiles(startPath, "*");
        event.sender.send("answer_file_list", filesList);
    });
});

