var http = require("http");
var port = 2999;
http.createServer(function(request,response){
	var body_code = "<html><head>"+"<title>Simple Page</title>"
		+"</head><body><h3>oiqnwdoin</h3></body></html>";
	var content_length = body_code.length;
	response.writeHead(200,{"Content-Type":"text/html",
	"Content-Length":content_length});
	response.end(body_code); 
}).listen(port);

console.log("Server started at port "+port+
	" open browser at http://localhost:"+port);