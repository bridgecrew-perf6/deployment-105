// use the build in mini web server in node - http
const http = require('http');

// Use the built in execSync commando that can run 
// command line/bash commands
const { execSync } = require('child_process');

const path = require('path');

// Path to db-template
const dbTemplatePath = path.join(__dirname, '../database', 'products-template.db');
const dbPath = path.join(__dirname, '../database', 'products.db');



//A  funcction that does all necessary git checkout, cleanup etc
function checkout() {
    execSync('git stash'); // remove changed files if any
    execSync('git pull');
    execSync('npm install'); // install new npm modules mentioned in package.json
    execSync('pm2 stop dev-main'); // stop dev server in case it locks the db file to remove
    execSync('rm ' + dbPath); // remove the database
    execSync('cp ' + dbTemplatePath + ' ' + dbPath); // copy dbTemplate to db
    //execSync('npm run build'); // build the dist folder that will be served
    execSync('pm2 restart main-main'); // restart our main app
    console.log('Pulled, copied db and restarted the server');
}

// Set up a small server that only check out things if know
// the secret hash
const server = http.createServer(function (req, res) {
    res.end('Ok');
    if (req.url === '/123456'
    ) {
        checkout();
    }
});

// Start up the server 

server.listen(9876, () => console.log('Listening on http://localhost:9876'));