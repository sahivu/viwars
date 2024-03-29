const express = require('express');
module.exports.ApiError = class ApiError extends Error {
    status;
    errors;
  
    constructor(status, message, errors = []) {
      super(message);
      this.status = status;
      this.errors = errors;
    }
  
    static bodyNotFound(errors = []) {
      return new ApiError(400, 'Body Not Found', errors);
    }
  };
  
/**
 * errors handles here
 * @param {ApiError | Object} err 
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.NextFunction} next 
 * @returns 
 */
module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof ApiError) {
        return res.status(err.status).json(err)
    }
    return res.status(500).json({message: 'Непредвиденная ошибка'})
};