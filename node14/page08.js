http = require("http");
var port = 1234;
server = http.createServer((request, response) => {
    console.log(request.url);
    response.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    response.write("end of response");
    response.end();
    console.log("response area end");
}).listen(port, "127.0.0.1", () => {
    console.log(`port ${port} is listning with 127.0.0.1`);
});


console.log(`the server started successfully at http://localhost:${port}`);