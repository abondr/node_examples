/*
* 1st page calls file list
* 2nd page created and asks question. answer coming from 1st to 2nd.
* 2nd page button calls for 1st page to create 3rd page.
* 3rd page(s) call question to 1st page 
* 1st page gives answer to 3rd page.
* 3rd page on getting answer does ajax operation. 
* 3rd page sends % status with file name to 1st page. 
* 1st page sends data to 2nd page for status change.
 */
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
app.on("ready", function () {
    createWindow(
        win1,
        file2, {
            'width': 1024,
            'height': 768,

        }
    );
});