var http = require("http");
var fs = require("fs");
var url = require("url");
var content = require("./content");

http.createServer(function(request, response)
{
	var pathname = url.parse(request.url).pathname.substring(1);
	console.log("Request for " + pathname + " received.");
	
	var ext = pathname.substring(pathname.indexOf(".")+1);
	var contentType = content.getFileTypeObject(ext);
	fs.readFile(pathname, function(err, data)
	{
		if(err)
		{
			console.log(err);
			response.writeHead(404, {"Content-Type": contentType.type + "/" + contentType.extension});
		}
		else
		{
			response.writeHead(200, {"Content-Type": contentType.type + "/" + contentType.extension});
			if(contentType.type != "text")
			{
				response.write(data, "binary");
			}
			else
			{
				response.write(data.toString());
			}
		}
		response.end();
	});
}).listen(8081);

console.log("Server running at http://127.0.0.1:8081");