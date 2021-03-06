const file1 = "page01.html";
const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");
let win;
function createWindow(){
    win = new BrowserWindow();
        win.loadURL(
            url.format({
                "pathname" : path.join(__dirname , file1),
                "protocol" : "file",
                "slashes" : true
        })
    );
    console.log(path.join(__dirname , file1));
     // Open the DevTools.
    // win.webContents.openDevTools()
    win.on("closed",()=>{
        win = null;
    });
}
app.on("ready",createWindow);
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
    if (win === null) {
      createWindow()
    }
  })
  
  // In this file you can include the rest of your app's specific main process
  // code. You can also put them in separate files and require them here.