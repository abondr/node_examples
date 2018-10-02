var port = 1234;
var http = require("http");
var fs = require("fs");
http.createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile("./page01.html", function(error, data) {
        if (error) {
            response.writeHead(404);
            response.write("File Not Found");
        } else {
            response.write(data);
        }
        response.end();
    });

}).listen(port);

console.log("Server started at port " + port +
    " open browser at http://localhost:" + port);