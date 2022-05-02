//Use the built in mini web server in node -http-
const http = require('http');

//Use the bulit in execSync commando that can run
// commnand line/bash commands
const { execSync } = require('child_process');



//Set up a small server that only checkout things if know the sercret hash

const server = http.createServer(function (req, res) {
    res.end('ok!');
    if (req.url === '/123456') {
        //checkout the git repo
        execSync('git pull');
        console.log('has run git pull');
    }
});
//Start the server

server.listen(9876, () => console.log('Listening on http://localhost:9876'));