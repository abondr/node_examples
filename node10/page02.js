var http = require("http");
var port = 2999;
http.createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end("<html><head>" +
        "<title>Simple Page</title>" +
        "</head><body><h3>oiqnwdoin</h3></body></html>		");
}).listen(port);

console.log("Server started at port " + port +
    " open browser at http://localhost:" + port);