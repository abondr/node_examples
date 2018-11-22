const express = require("express");
const fs = require("fs");
const path = require("path");
var port = 1234;
var app = express();
app.get("/", (request, response) => {
    var myReadStream = fs.createReadStream(path.join(__dirname, "html_pages", "page01.html"));
    myReadStream.pipe(response);
    console.log("get root");
});
app.get("/about", (request, response) => {
    var myReadStream = fs.createReadStream(path.join(__dirname, "html_pages", "page02.html"));
    myReadStream.pipe(response);
    console.log("get about");
});
app.get("/icon", (request, response) => {
    var myReadStream = fs.createReadStream(path.join(__dirname, "images", "icon01.png"));
    myReadStream.pipe(response);
    console.log("get icon");
});
app.get("/profile/:name", (request, response) => {
    response.end("requested name is " + request.params.name);
})
app.listen(port);