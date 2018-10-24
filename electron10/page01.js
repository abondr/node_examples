const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
let win1;
const file2 = "pages//page02.html";

function createWindow(renderProcess = win1, htmlPage = file2, attr = []) {
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
app.on("ready", function() {
    createWindow(
        win1,
        file2, {
            'width': 1024,
            'height': 768,

        }
    );
});