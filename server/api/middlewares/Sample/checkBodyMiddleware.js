const express = require('express');
const { ApiError } = require('../errorMiddlewareSample');

/**
 * errors handles here
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 * @returns 
 */
module.exports = function (req, res, next) {
    try {
        if(req.body.constructor === Object && Object.keys(req.body).length === 0) {
            next(ApiError.bodyNotFound()) //error middleware
        }
        next();//success skip middleware
    } catch (e) {
        return next(e);
    }
};