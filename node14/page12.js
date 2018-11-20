http = require("http");
fs = require("fs");
var port = 1234;
page01 = __dirname + "\\html_pages\\page01.html";
//console.log(page01);
server = http.createServer((request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
    });
    var myReadStream = fs.createReadStream(page01, 'utf8');
    myReadStream.pipe(response);
    //response.end();
    console.log(`response 123456`);
}).listen(port, "127.0.0.1", () => {
    console.log(`port ${port} is listning with 127.0.0.1`);
});


console.log(`the server started successfully at http://localhost:${port}`);