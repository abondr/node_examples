const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.send("question-file-name", "");

ipcRenderer.on("answer-file-name", function(event, arguments) {
    console.log(arguments);
});