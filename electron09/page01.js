const file1 = "page01.html";
const file2 = "page02.html";
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
const dialog = electron.dialog;
const ipc = electron.ipcMain;
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
    // win.webContents.openDevTools()
    renderProcess.on("closed", () => {
        renderProcess = null;
    });
}
app.on("ready", function() {
    createWindow(
        win1,
        file1, {
            'width': 1024,
            'height': 768,

        }
    );
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// app.on('activate', () => {
//     if (win1 === null) {
//         createWindow(win1, file1, { 'width': 1024, 'height': 768 });
//         createWindow(win2, file2, { 'width': 600, 'height': 480, 'parent': win1, 'alwaysOnTop': true });
//     }
// });
ipc.on("open-error-dialog", function(event, arguments) {
    console.log(arguments);
    console.log(" @ main , catch render");
    //dialog.showErrorBox("Error Window", "Demo of an Error Message");
    createWindow(win2, file2, { 'width': 600, 'height': 480, 'parent': win1, 'alwaysOnTop': true });
    event.sender.send("opened-error-dioalog-complete", "abcd");
});