const BrowserWindow = require("electron").remote.BrowserWindow;
const path = require("path"), url = require("url");
$(document).on('click', '#btn1', function () {
    let win3 = new BrowserWindow({ 'width': 600, 'height': 480 });
    win3.loadURL(url.format({
        pathname: path.join(__dirname, "\\assets\\page03.html"),
        protocol: "file",
        slashes: true
    }));
});
