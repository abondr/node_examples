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
    // win.webContents.openDevTools()
    renderProcess.on("closed", () => {
        renderProcess = null;
    });
}
app.on("ready", function () {
    createWindow(
        win1,
        file1,
        {
            'width': 1024,
            'height': 768,
            'show': false
        }
    );
    createWindow(
        win2,
        file2,
        {
            'width': 200,
            'height': 240,
            'parent': win1,
            'alwaysOnTop': true
        });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win1 === null) {
        createWindow(win1, file1, { 'width': 1024, 'height': 768 });
        createWindow(win2, file2, { 'width': 600, 'height': 480, 'parent': win1, 'alwaysOnTop': true });
    }
});
/*win1.on('closed', function () {
    win1 = null;
});
win2.on('closed', function () {
    win2 = null;
    win1.show();
});*/
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.