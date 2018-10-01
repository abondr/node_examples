var fs = require("fs");
var path = require("path");
module.exports.serveStaticFile = function (res, path1, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(path.resolve(__dirname, '..') + path1, function (err, data) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<b><u>500</u> - Internal Error</b>');
        } else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
}
module.exports.createServer = function (req, res) {
    // normalize url by removing querystring, optional
    // trailing slash, and making lowercase
    var path2 = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch (path2) {
        case '':
            module.exports.serveStaticFile(res, '/public/home.html', 'text/html');
            break;
        case '/about':
            module.exports.serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        case '/img/logo.jpg':
            module.exports.serveStaticFile(res, '/public/image/anlogo2.jpg', 'image/jpeg');
            break;
        default:
            module.exports.serveStaticFile(res, '/public/notfound.html', 'text/html', 404);
            break;
    }
}