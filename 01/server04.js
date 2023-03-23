const http = require("http");
const PORT = 3000;
const server = http.createServer((req,res) => {
    
    res.writeHead(200, {"content-type": "text/html;charset=utf-8"});
    let browser = "";
    console.log(req.headers["user-agent"])
    if(req.headers["user-agent"].indexOf("Chrome") != -1){
        browser = "Chrome";
    }
    if(req.headers["user-agent"].indexOf("Firefox") != -1){
        browser = "Firefox";
    }
    res.end("Twoja przeglądarka to: " + browser + "<br>" + req.headers["user-agent"]);
});
server.listen(PORT, ()=>{
    console.log(`serwer slucha na porcie ${PORT}`);
});