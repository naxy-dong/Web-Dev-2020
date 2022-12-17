var fs = require('fs');
var qs = require('qs');
var url = require('url');

exports.getClientData = function(pathname, request){
    console.log(pathname);
    var qdata = parseQueryString(request);
    if(pathname == "post"){
        fs.appendFile("posts/" + qdata.title + ".txt", qdata.post, function(err){
            if(err)
                throw err;
            console.log("File updated.");
        });
    }
    return "";
}

function parseQueryString(request){
    var qdata = url.parse(request.url).search.substring(1);
    return qs.parse(qdata);
}