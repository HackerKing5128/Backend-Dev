const http = require('http');
const url = require('url');
const fs = require('fs').promises;

async function logger(timestamp, username, activity) {
    const log = `${timestamp} | ${username} | ${activity}\n`;
    await fs.appendFile('./activity.log', log);
}

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    // const pathname = parsedUrl.pathname;

    const timestamp = Date.now();
    const query = parsedUrl.query;
    const username = query.name || "guest";
    const activity = query.activity || "unknown";

    res.end(`${username} is ${activity}`);




    await logger(timestamp, username, activity);
}); 


server.listen(5000, () => {console.log('Server is running on port 5000...')});


