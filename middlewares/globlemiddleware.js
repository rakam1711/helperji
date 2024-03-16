const { validationResult } = require('express-validator');
const formidable = require('formidable')
const {env} = require('../environments/env')
const jwt = require('jsonwebtoken')

exports.ractifyError = (req, res, next) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
        req.errorStatus = 422; // 422 Unprocessable Entity
        next(new Error(error.array()[0].msg)); // to global error method
    } else {
        next(); // to next middleware
    }
}

exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.json({
          success: false,
          errors: { message: 'User not logged in' },
          data: {}
        }).status(404)
        return
      }
    const token = authHeader.split(' ')[1]
    try {
        jwt.verify(token, env().jwt_secret, ((err, data) => {
            if (err) {
                next(err)
            } else if (!data) {
                req.errorStatus = 401;
                next(new Error('User Not Authorised'))
            } else {
                console.log('middle',data)
                req.employeeData = data;
                next();
            }
        }))
    } catch (e) {
        req.errorStatus = 401;
        next(e);
    }
}


exports.formDataParser=(req,res,next)=>{
    try {
        let form = new formidable.IncomingForm()
        form.parse(req,(err,fields={},files)=>{
            if (err) {
                console.log('err',err)
                return
            }
            req.body = {...fields,files}
            console.log('xxxxxxx',fields,files)
            next()
        })
    } catch (error) {
        req.errorStatus=401
        next(error)
    }
   
}