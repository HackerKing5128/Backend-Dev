const http = require('http');  
const fs = require('fs'); 

const myServer = http.createServer((req, res) => {
    let resText = "";
    // switch (req.url) {
    //     case '/':
    //         // res.end("Hello, Duniya! from Server");
    //         resText = "visited Home Page";
    //         break;
    //     case '/about':
    //         // res.end("About Us Page of the server");
    //         resText = "visited About Page"; 
    //         break;
    //     case '/contact':
    //         // res.end("Contact Us Page of the server");
    //         resText = "visited Contact Page";
    //         break;
    //     default:
    //         // res.end("404 Page Not Found");
    //         resText = "404 Page Not Found";
    // }

    if (req.method === 'GET' && req.url === '/') {
        res.end("Hello, Duniya! from Server");
        resText = "visited Home Page";
    } else if (req.method === 'GET' && req.url === '/about') {
        res.end("About Us Page of the server");
        resText = "visited About Page";
    } else if (req.method === 'GET' && req.url === '/contact') {
        res.end("Contact Us Page of the server");
        resText = "visited Contact Page";
    
    } else if (req.method === 'GET' && req.url === '/favicon.ico') {
        // res.end("404 Page Not Found");
        resText = "Favicon request - ignored";
    } else {
        res.end("404 Page Not Found");
        resText = "404 Page Not Found";
    }


    // log complete request object from different endpoints to logs.txt
    const logs = `TimeStamp: ${Date.now()} | URL: ${req.url} | ${resText}\n`;
    console.log(logs);
    fs.appendFileSync("logs.txt", logs, 'utf-8');


});

myServer.listen(5000, () => console.log("Server Started at port 5000"));