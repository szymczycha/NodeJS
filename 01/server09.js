const http = require("http");
const PORT = 3000;
const fs = require("fs");
const server = http.createServer((request, response) => {
    console.log(`żądany przez przeglądarkę adres: ${request.url}` )
    let url = decodeURIComponent(request.url);
    let fileType = url.split(".").pop();
    console.log(fileType);
    let headers = {
        "png": "image/png",
        "jpg": "image/jpeg",
        "html": "text/html",
        "css": "text/css",
        "js": "application/javascript",
    }
    console.log("/static"+url);
    fs.readFile(__dirname+"/static"+url, function(error,data){
        if(error){
            
            response.writeHead(404, {"content-type":headers["html"]+";charset=utf-8"});
            response.end("404 ERROR - file not found <br>" + error);
        }else{
            response.writeHead(200, {"content-type":headers[fileType]+";charset=utf-8"});
            response.write(data)
            response.end();
        }
    })
});

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});