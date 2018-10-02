var port = 1234;
var http = require("http");
var module1 = require("./module01");
var module2 = require("./module02");
http.createServer(function(reqest, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    module1.myModuleFunction();
    response.write(module1.myModule01String);
    module2.myModuleFunction("abcd");
    response.write(module2.myModule01String);
    response.end();
}).listen(port);

console.log("Server started at port " + port +
    " open browser at http://localhost:" + port);