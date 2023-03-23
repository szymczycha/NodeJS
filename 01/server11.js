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
        let out = {};
        switch (obj.operation){
            case "+":
                out.message = "suma dwu elementów";
                out.value = parseFloat(obj.a) + parseFloat(obj.b);
                break;
            case "-":
                out.message = "różnica dwu elementów";
                out.value = obj.a - obj.b;
                break;
            case "/":
                out.message = "iloraz dwu elementów";
                out.value = obj.a / obj.b;
                break;
            case "*":
                out.message = "iloczyn dwu elementów";
                out.value = obj.a * obj.b;
                break;
            case "all":
                out = [];
                let add = {};
                add.message = "suma dwu elementów";
                add.value = parseFloat(obj.a) + parseFloat(obj.b);
                out.push(add);
                let sub = {};
                sub.message = "różnica dwu elementów";
                sub.value = obj.a - obj.b;
                out.push(sub);
                let mult = {};
                mult.message = "iloraz dwu elementów";
                mult.value = obj.a / obj.b;
                out.push(mult);
                let div = {};
                div.message = "iloczyn dwu elementów";
                div.value = obj.a * obj.b;
                out.push(div);
                break;
        }

        res.writeHead(200, { "Content-type": "text/plain;charset=utf-8" });
        res.end(JSON.stringify(out, null, 5));
     
    })
}

const server = http.createServer((request, response) => {
    switch (request.method){
        case "GET":
            fs.readFile(__dirname + "/static/index11.html", function(error, data){
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