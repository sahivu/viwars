const express = require('express');
const checkBodyMiddleware = require('./middlewares/Sample/checkBodyMiddleware');
const bodyParser = require('body-parser');
/** @type {express.Router} */
const Router = new express.Router();
Router.use(bodyParser.json());

// ping pong sample
Router.get('ping', (req, res, next)=>{//Accesible only by method GET in HTTP
    try {
        return res.json({ ping:'pong' })
    } catch(e) {
        next(e)
    }
})
Router.get('webping', (req, res)=>{//for access http://127.0.0.1:5002/api/webping from browser
    res.write('hello');
    res.end();
})




// middleware Sample // as sample return request Body
Router.post('echo', checkBodyMiddleware, (req, res, next)=>{
    try {
        return res.json({ echo: req.body })
    } catch(e) {
        next(e)
    }
})

module.exports = Router;