http = require("http");
fs = require("fs");
var port = 1234;
server = http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    console.log(request.)
    response.end("page response end");
}).listen(port, "127.0.0.1", () => {
    console.log(`port ${port} is listning with 127.0.0.1`);
});


console.log(`the server started successfully at http://localhost:${port}`);