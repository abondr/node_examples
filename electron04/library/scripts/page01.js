alert("page01");
const file1 = "../../page03.html";
const electron = require("electron");
const BrowserWindow = electron.remote.BrowserWindow;
const path = require("path");

const url = require("url");
const newWindowBtn = document.getElementById("create_window");
newWindowBtn.addEventListener("click", function (event) {
    win3 = new BrowserWindow();
    win3.loadURL(
        url.format({
            "pathname": path.join(__dirname, file1),
            "protocol": "file",
            "slashes": true
        })
    );
    win3.on("closed", () => {
        win3 = null;
    });
});