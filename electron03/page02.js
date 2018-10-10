const file1 = "page01.html";
const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

let win;

function createWindow(file1) {
    win = new BrowserWindow({ width: 800, height: 600 })
    win.loadURL(url.format({
        pathname: path.join(__dirname, file1),
        protocol: 'file:',
        slashes: true
    }))
}

app.on('ready', createWindow); 