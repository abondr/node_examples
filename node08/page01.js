var http = require("http");
var mod1 = require("./module01");
var port = 1234;
http.createServer(mod1.createServer).listen(port);
console.log("Server started at port " + port +
    " open browser at http://localhost:" + port);