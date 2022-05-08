// use the build in mini web server in node - http
const http = require('http');

const port = process.env.PORT;
if (!port) {
    console.warn("You must provide a PORT number as process envioronment variable");
    process.exit(1) // shut down
}
// remember to set different servers to restart depending on port
let pm2serverNameToRestart = "";
if (port == "9876") {
    // we are expecting this to be the dev-checkout-server
    // so the name of the server we should restart should  be dev-server
    pm2serverNameToRestart = "dev-server";
}
if (port == "9878") {
    // we are expecting this to be the main-checkout-server
    // so the name of the server we should restart should  be main-server
    pm2serverNameToRestart = "main-server";
}
if (pm2serverNameToRestart == "") {
    console.warn("Don't know which server to restart, exiting");
    console.warn("Please use port 9876 for dev-server or port 9878 for live-server");
    process.exit(1) // shut down
}


// Use the built in execSync commando that can run 
// command line/bash commands
const { execSync } = require('child_process');

const path = require('path');


//Read the deployment key from the environment variable
const secret = process.env.DEPLOYMENT_KEY;

//If there is not secret key-shutdown
if (!secret) {
    console.log('You need provide the DEPLOYMENT_KEY as en environment variable');
    process.exit(1);
}






// Path to db-template
const dbTemplatePath = path.join(__dirname, '../database', 'products-template.db');
const dbPath = path.join(__dirname, '../database', 'products.db');



//A  funcction that does all necessary git checkout, cleanup etc
function checkout() {
    //Run the git checkout command
    execSync('git stash'); // remove local changes (like i package.lock.json has changed automatically so have a clean repo)
    execSync('git pull'); // pull the latest changes from the remote repo

    execSync('npm install'); // install new npm modules mentioned in package.json
    execSync('pm2 stop ' + pm2serverNameToRestart); // stop dev server in case it locks the db file to remove
    execSync('rm ' + dbPath); // remove the database
    execSync('cp ' + dbTemplatePath + ' ' + dbPath); // copy dbTemplate to db
    //execSync('npm run build'); // build the dist folder that will be served
    execSync('pm2 restart ' + pm2serverNameToRestart); // restart our main app
    console.log('Pulled, copied db and restarted the server');
}

// Set up a small server that only check out things if know
// the secret hash
const server = http.createServer(function (req, res) {
    res.end('Ok');
    if (req.url === '/' + secret) {
        checkout();
    }
});

// Start up the server 

server.listen(port, () => console.log('Listening on http://localhost:' + port));