const electron = require("electron");
const { getCurrentWindow, globalShortcut } = require('electron').remote;
const ipcRenderer = electron.ipcRenderer;
let checkFile = function () {
    ipcRenderer.send("question-file-name", "");
    ipcRenderer.on("answer-file-name", function (event, arguments) {
        if (arguments != "end_off_file_list") {
            //console.log(arguments);
            getCurrentWindow().reload();
        }
    });
}
$(window).on("load", function () {
    checkFile();
});
