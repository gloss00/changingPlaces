require('dotenv').config();
const fs = require('fs');
const https = require('https');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const nunjucks = require('nunjucks');


const app = express();

app.use(helmet());

app.set('view engine', 'njk');
let nunjucksEnv = nunjucks.configure([
    path.join(process.cwd(), '/app/views')
], {
    autoescape: true,
    express: app,
    noCache: true,
    watch: true
});

app.use(express.static(path.join(process.cwd(), '/app/assets')));

app.get('*', (req, res, next) => {
    res.render("index");
});

app.all('*', (req, res, next) => {
    res.send("Method not allowed");
});






const PORT = process.env.PORT || 3200;


const options = {
    key: fs.readFileSync(process.env.KEY_FILE_PATH),
    cert: fs.readFileSync(process.env.CERT_FILE_PATH)
};

const server = https.createServer(options, app);

server.listen(PORT, () => console.log(`Nunjucks server listening on port ${PORT}`));
