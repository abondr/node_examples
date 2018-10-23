const electron = require("electron");
const ipc = electron.ipcRenderer;
$("#error1").click(() => {
    ipc.send("open-error-dialog", { '1': 1, 'a': 'b' });
});
ipc.on("opened-error-dioalog-complete", function(event, arguments) {
    alert("all process complete" + arguments);
});