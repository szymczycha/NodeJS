const http = require("http");
const PORT = 3000;
const fs = require("fs");
const server = http.createServer((request, response) => {
    console.log(`żądany przez przeglądarkę adres: ${request.url}` )

    if (request.url === "/strona3.html") {
        fs.readFile("static/third.html", function (error, data) {
            if(error){
                response.writeHead(400, { 'Content-Type': 'text/html' });
                response.end(error);
            }else{
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.write(data);
                response.end();
            }
        })
    }
    else if (request.url === "/style.css") {
        fs.readFile("static/style.css", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'text/css' });
            response.write(data);
            response.end();
        })
    }
    else if (request.url === "/script.js") {
        fs.readFile("static/script.js", function (error, data) {
            response.writeHead(200, { 'Content-Type': 'application/javascript' });
            response.write(data);
            response.end();
        })
    }
});

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});