const http = require("http");
const PORT = 3000;
const server = http.createServer((req, res) => {
    res.writeHead(200, {"content-type": "video/mp4;charset=utf-8"});//video lol
    res.end(`<h2> ${JSON.stringify(req.headers, null, 5)}</h2>`);
});

server.listen(PORT, () => {
    console.log(`serwer startuje na porcie ${PORT}`)
});