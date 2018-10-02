var port = 1235;
var http = require("http");
http.createServer(function(request, response) {
    response.writeHead(200, { "Content-Text": "text/plain" });
    response.write("line 1\n");
    response.write("line 2\n");
    response.write("line 3\n");
    response.write("line 4\n");
    response.end("end line");
}).listen(port);

console.log("link http://localhost:" + port + " ctrl+c to end");