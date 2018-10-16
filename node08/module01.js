url = require("url");
fs = require("fs");
module.exports = {
    "renderHtml": function(path, response) {
        fs.readFile(path, function(error, data) {
            if (error) {
                response.writeHead(404);
                response.write("File Not Found");
            } else {
                response.write(data);
            }
            response.end();
        });
    },
    "handleRequest": function(request, response) {
        responce.writeHead(200, { "Content-Text": "text/html" });
        var path = url.parse(request.url).pathname;
        switch (path) {
            case "/":
                this.renderHtml("./page01.html", response);
                break;
            case "/about":
                this.renderHtml("./page02.html", response);
                break;
            default:
                this.renderHtml("404", response);
                break;
        }
    }
};