//includes
const configs = require("dotenv").config();//access as `process.env.KEY` or as here `configs.KEY`//config file `.env` at root
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');

const app = express();
const WSServer = require("express-ws")(app); // link express WebSockets for app

const apiSample = require('./api/apiSample.js');
const wsSample = require('./ws/wsSample.js');


// VARs
const staticContentPath = `${__dirname}/../${process.env.STATIC_FILES_PATH}`


// Initializations
//???
//???
//???
//???
// где тут фронт?
// то что в папке server -- сервер, всё остально фронт
// js/EntryPoint фронт, скрипт что запускается первым

// express app initializations and starting
//  someutilities
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//  our routers
app.use('/api', apiSample) // dyn actions
app.ws("/ws", wsSample); // ws connection
app.use(require('./api/middlewares/errorMiddlewareSample.js')) // errors handler
app.use('/ping', (req, res, next)=>{//Accesible only by method GET in HTTP
    res.send('pong')
})
app.use('/', express.static(staticContentPath)) // share static files

//server starts here: 
app.listen(process.env.SERVER_PORT, () =>
      console.log(`Server started on PORT = ${process.env.SERVER_PORT}`)
    );