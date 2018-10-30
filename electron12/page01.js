const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const fs = require('fs');
const path = require("path");
const url = require("url");
let win2, winArr = [];
let no_of_renders = 10;
let file2 = "pages//page02.html",
    file3 = "pages//page03.html";
let fileList = [];
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
    //renderProcess.webContents.openDevTools()
    renderProcess.on("closed", () => {
        renderProcess = null;
    });
}
app.on("ready", function () {
    for (let i = 0; i < 1000; i++) {
        fileList.push("file" + i);
    }
    for (let i = 0; i < no_of_renders; i++) {
        createWindow(winArr[i],
            file3, {
                'width': 480,
                'height': 200,
                'frame': true,
                'show': true
            }
        );
    }
    ipcMain.on("question-file-name", function (event, arguments) {
        let file_name;
        if (fileList.length > 0) {
            file_name = fileList.shift();
        } else {
            file_name = "end_off_file_list";
        }
        event.sender.send("answer-file-name", file_name);
    });
});
