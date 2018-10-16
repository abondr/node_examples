const file1 = "page01.html";
const file2 = "page02.html";
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
let win1, win2;

function createWindow(renderProcess = win1, htmlPage = file1, attr = []) {
    renderProcess = new BrowserWindow(attr);
    renderProcess.loadURL(
        url.format({
            "pathname": path.join(__dirname, htmlPage),
            "protocol": "file",
            "slashes": true
        })
    );
    // Open the DevTools.
    renderProcess.webContents.openDevTools();
    renderProcess.on("closed", () => {
        renderProcess = null;
    });

}

app.on("ready", function() {
    createWindow(
        win1,
        file1, {
            'width': 630,
            'height': 360,
            'frame': false
        }
    );

});