const http = require('http');

const myServer = http.createServer((req, res) => {
    // console.log("Request received");
    // console.log(req.headers); // To log request headers which contains metadata about the request
    console.log(req); // To log complete request object
    res.end("Hello, Duniya! from Server");
})

myServer.listen(5000, () => console.log("Server Started at port 5000"));