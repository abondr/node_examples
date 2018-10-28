const electron = require("electron");
const ipcRenderer = electron.ipcRenderer;
let filesList = [];
$(window).on("load", function() {
    ipcRenderer.send("question-file-list", "");
});
ipcRenderer.on("answer-file-list", function(event, arguments) {
    if (arguments != "end_of_list") {
        filesList[arguments.fileSize] = arguments.filePath;
        $("#list_table tbody").append("<tr><td>" + arguments.fileSize +
            "</td><td>" + arguments.filePath + "</td></tr>");
        $("#list_table tbody").append("<tr><td colspan=2><div class='progress " +
            "progress-striped'><div id=\"progress_" + arguments.fileSize + "\" class=\"progress-bar " +
            "progress-bar-information\" role=\"progressbar\" style=\"width: " +
            "30%;\"><span>&nbsp;</span></div></div></td></tr>");

        $("#list_table tbody").append("<tr><td colspan=2></td></tr>");
        $("#loader").css("display", "block");

    } else {
        $("#loader").css("display", "none");
    }
});