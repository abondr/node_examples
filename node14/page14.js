http = require("http");
fs = require("fs");
var port = 1234;
server = http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'application/json'
    });
    var myObj = {
        name: 'abon',
        job: 'dreamer',
        age: 35
    };
    response.end(JSON.stringify(myObj));
}).listen(port, "127.0.0.1", () => {
    console.log(`port ${port} is listning with 127.0.0.1`);
});
console.log(`the server started successfully at http://localhost:${port}`);