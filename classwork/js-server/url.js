const url = require('url');
const http = require('http');

const myServer = http.createServer((req, res) => {
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    switch (myUrl.pathname) {
        case '/':
            res.end("Hello, Duniya! from Server");
            break;
        case '/about':
            const username = myUrl.query.username || 'Guest';
            res.end(`Hi, ${username}`);
            break;
        default:
            res.end("404 Page Not Found");
    }
})

myServer.listen(5000, () => console.log("Server Started at port 5000"));