const express = require('express');
const checkBodyMiddleware = require('./middlewares/Sample/checkBodyMiddleware');
const TRouter = express.Router;
/** @type {express.Router} */
const Router = new TRouter();

// ping pong sample
Router.get('ping', (req, res, next)=>{//Accesible only by method GET in HTTP
    try {
        return res.json({ ping:'pong' })
    } catch(e) {
        next(e)
    }
})
Router.use('webping', (req, res, next)=>{//for access http://127.0.0.1:5002/api/webping from browser
    try {
        res.set('Content-Type', 'text/html');
        return res.send(Buffer.from('pong'));
    } catch(e) {
        next(e)
    }
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