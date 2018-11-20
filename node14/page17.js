const http = require("http");
const fs = require("fs");
const path = require('path');
var port = 1234;
var home_page_html = path.join(__dirname, "html_pages", "page01.html");
var about_page_html = path.join(__dirname, "html_pages", "page02.html");
var html_404 = path.join(__dirname, "html_pages", "404.html");
var page_icon = path.join(__dirname, "images", "icon01.png");
server = http.createServer((request, response) => {
    switch (request.url) {
        case "/":
        case "/home":
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            var myReadStream = fs.createReadStream(home_page_html);
            myReadStream.pipe(response);
            break;
        case "/about":
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            var myReadStream = fs.createReadStream(about_page_html);
            myReadStream.pipe(response);
            break;
        case "/contact":
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            response.write("contact us ");
            break;
        case "/icon":
            response.writeHead(200, {
                'Content-Type': 'text/html'
            });
            var myReadStream = fs.createReadStream(page_icon);
            myReadStream.pipe(response);
            break;
        default:
            response.writeHead(404, {
                'Content-Type': 'text/html'
            });
            var myReadStream = fs.createReadStream(html_404);
            myReadStream.pipe(response);
            break;
            response.end(1);

    }
    console.log(request.url);
}).listen(port, "127.0.0.1", () => {
    console.log(`port ${port} is listning with 127.0.0.1`);
});


console.log(`the server started successfully at http://localhost:${port}`);