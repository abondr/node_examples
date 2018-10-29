const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.send("question-file-name", "");

ipcRenderer.on("answer-file-name", function (event, arguments) {
    $("body").html("<h1>" + arguments["filePath"] + "</h1>");
    $("body").append("<h1>" + arguments["fileSize"] + "</h1>");
});