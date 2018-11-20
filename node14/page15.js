http = require("http");
fs = require("fs");
const path = require('path');
var port = 1234;
file01 = path.join(__dirname, 'html_pages', 'page01.html');
var myReadStream = fs.createReadStream(file01);
server = http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    myReadStream.pipe(response);
    console.log(request.url);
}).listen(port, "127.0.0.1", () => {
    console.log(`port ${port} is listning with 127.0.0.1`);
});


console.log(`the server started successfully at http://localhost:${port}`);