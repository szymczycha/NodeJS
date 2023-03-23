const http = require("http");
const PORT = 3000;
const fs = require("fs");
function serverResponse(req, res){
    let body = "";

    // kiedy przychodzą dane postem, w postaci pakietów
    // łącza się do jednej zmiennej "body"

    req.on("data", function (data) {
        console.log("data: " + data)
        body += data.toString();
    })

    // kiedy przyjdą już WSZYSTKIE dane, logujemy je
    // i odsyłamy do przeglądarki

    req.on("end", function (data) {

        console.log(body)

        const params = new URLSearchParams(body);
        console.log(params)
     
        const obj = Object.fromEntries(params);
        console.log(obj)
     
        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(obj, null, 5));
     
    })
}

const server = http.createServer((request, response) => {
    switch (request.method){
        case "GET":
            fs.readFile(__dirname + "/static/index10.html", function(error, data){
                if(error){
                    response.writeHead(404, {"content-type":"text/html"});
                    response.end("404 error: <br>"+error);
                }else{
                    response.writeHead(200, {"content-type":"text/html"})
                    response.end(data);
                }
            });
            break;
        case "POST":
            serverResponse(request,response);

            break;
    }
});

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});