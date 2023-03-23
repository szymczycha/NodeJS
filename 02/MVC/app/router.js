const controller = require("./controller");
const utils = require("./utils");
const {animalsArray} = require("./model");
const fs = require("fs");

const router = async (request, response) => {

    switch (request.method) {
        case "GET":
            fs.readFile("./app/views/index.html", function(error, data){
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

            if (request.url == "/add") {
                // odczytaj dane z body
                // użyj funkcji z controllera
                // odpowiedz do klienta
                let data = await getRequestData(request);
                console.log(data);
                controller.add(data)
                response.writeHead(202, {"content-type":"application/json"});
                response.end(JSON.stringify({status: "animal added", arr: animalsArray}));
            }
            else if (request.url == "/getall") {
                
                response.writeHead(202, {"content-type":"application/json"});
                response.end(JSON.stringify({all: animalsArray}));
            }
            else if (request.url == "/delete") {
                let data = await getRequestData(request);
                console.log("/delete");
                controller.delete(data.selectedId)
                response.writeHead(202, {"content-type":"application/json"});
                response.end(JSON.stringify({status: "animal deleted", arr: animalsArray}));
            }
            else if (request.url == "/update") {
                let data = await getRequestData(request);
                console.log("/update");
                controller.update(data.selectedId)
                response.writeHead(202, {"content-type":"application/json"});
                response.end(JSON.stringify({status: "animal updated", arr: animalsArray}));
            }

            break;

    }
}

module.exports = router