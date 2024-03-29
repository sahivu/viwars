//includes
const configs = require("dotenv").config();//access as `process.env.KEY` or as here `configs.KEY`
const express = require("express");
const app = express();
const apiSample = require('./api/apiSample.js');
const wsSample = require('./ws/wsSample.js');
// VARs
const staticContentPath = `${__dirname}/../${process.env.STATIC_FILES_PATH}`


// Initializations
const router = new express.Router();






// express app initializations and starting
if(!process.argv.includes('--nginx')) // share static files if we haven't nginx
    app.use('/', express.static(staticContentPath))
app.use('/api/', apiSample)
app.use(require('./api/middlewares/errorMiddlewareSample.js'))
app.ws("/ws", wsSample);

//server starts here: 
app.listen(process.env.SERVER_PORT, () =>
      console.log(`Server started on PORT = ${process.env.SERVER_PORT}`)
    );