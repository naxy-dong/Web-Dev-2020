var fs = require('fs');

exports.getClientData = function(pathname){
    console.log(pathname);
    if(pathname == "getdata"){
        var data = fs.readFileSync("itemdata.txt");
        return data.toString();
    }
    return "";
}