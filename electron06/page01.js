const electron = require("electron");
//const app = electron.app;
//const BrowserWindow = electron.BrowserWindow;
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
let win1;
let htmlFile1 = "page01.html";
function createWindow(winObj, htmlFile) {
    winObj = new BrowserWindow();
    winObj.loadURL(url.format({
        pathname: path.join(__dirname, htmlFile),
        protocol: "file",
        slashes: true
    }));
    winObj.on("closed", () => {
        winObj = null;
    });
}

app.on("ready", () => {
    createWindow(win1, htmlFile1);
});
