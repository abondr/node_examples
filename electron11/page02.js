const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const ipcRenderer = electron.ipcRenderer;

$(window).on("load", function () {
    ipcRenderer.send("question_file_list", "");
});
ipcRenderer.on("answer_file_list", function (event, arg) {
    console.log(arg);
});

