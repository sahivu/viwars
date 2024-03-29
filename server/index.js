//includes
const configs = require("dotenv").config();//access as `process.env.KEY` or as here `configs.KEY`//config file `.env` at root
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const app = express();
const WSServer = require("express-ws")(app); // link express WebSockets for app
const apiSample = require('./api/apiSample.js');
const wsSample = require('./ws/wsSample.js');
// VARs
const staticContentPath = `${__dirname}/../${process.env.STATIC_FILES_PATH}`


// Initializations






// express app initializations and starting
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', express.static(staticContentPath)) // share static files
app.use('/api', apiSample) // dyn actions
app.ws("/ws", wsSample);
app.use(require('./api/middlewares/errorMiddlewareSample.js'))

//server starts here: 
app.listen(process.env.SERVER_PORT, () =>
      console.log(`Server started on PORT = ${process.env.SERVER_PORT}`)
    );