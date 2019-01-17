'use estric'
const express = require('express');
const config = require('./settings');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/public');
const routesPrivates = require('./routes/private');
const utils = require('./utils');
const auth = require('./middlewares/auth');
const body = require('connect-multiparty')();
const http = require('http');
const socket = require('socket.io');
mongoose.Promise = global.Promise;


let server = http.createServer(app);
var io = socket(server);
exports.io = io;

app.use(cors());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.use(helmet());
app.disable('x-powered-by');
app.use(morgan('combined'));
app.use("/",body,routes);
app.use("/auth",auth.auth,body,routesPrivates);


mongoose.connect(utils.db.connectionString()).then(() => {
        console.log('connect database server');
    }).catch(err => {
        console.log(err);
    });


server.listen(config.SERVER.port, err => {
    if(err) throw err;
    console.log('server running in port', config.SERVER.port);
});


