var port = 1234;
var http = require("http");
http.createServer(function(reqest, response) {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("<b>aqwdnqijodw</b>");
    response.end();
}).listen(port);

console.log("Server started at port " + port +
    " open browser at http://localhost:" + port);