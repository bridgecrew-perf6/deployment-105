//Use the built in mini web server in node -http-
const http = require('http');

//Use the bulit in execSync commando that can run
// commnand line/bash commands
const { execSync } = require('child_process');

//Path helps build file paths
const path = require('path');


//Path to db-template
const dbTemplatePath = path.join(__dirname, '../database', 'products-template.db');
const dbPath = path.join(__dirname, '../database', 'products.db');


// A function that does all neccessary git checkout, clean up etc
function checkout() {
    //Run the git checkout command
    execSync('git pull'); // pull the latest changes from the remote repo
    execSync('npm install'); // install new npm modules mentioned in package.json
    execSync('rm ' + dbPath); // remove the old db file
    execSync('cp ' + dbTemplatePath + ' ' + dbPath); // copy the template db file to the new db file
    execSync('pm2 restart main-app');//restart our main-app
    console.log('Pulled, copied db and restarted the sever');
}


//Set up a small server that only checkout things if know the sercret hash

const server = http.createServer(function (req, res) {
    res.end('ok!');
    if (req.url === '/123456') {
        checkout();
    }
});


//Start the server
server.listen(9876, () => console.log('Listening on http://localhost:9876'));