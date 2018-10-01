var http = require('http');
var module01 = require("./modules/module01");
var port = 1234;
http.createServer(module01.createServer).listen(port);
console.log("Server started on http://localhost:" + port + " ; press Ctrl-C to terminate....");