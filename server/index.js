require("dotenv").config();
const express = require("express");
const app = express();
const WSServer = require("express-ws")(app);//WebSockets

const staticContentPath = `${__dirname}/../`

app.use('/', express.static(staticContentPath))
// app.ws("/viruswarsWebSockets", callback);

//server starts here: 
app.listen(process.env.SERVER_PORT, () =>
      console.log(`Server started on PORT = ${process.env.SERVER_PORT}`)
    );