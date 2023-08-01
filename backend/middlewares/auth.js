const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const jwt = require('jsonwebtoken');
//protection of routes

//checks if a user is authenticated or not

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next)=>{

    const { token } = req.cookies

 if(!token){
    return next(new ErrorHandler('Login first to acces this resource', 401))
 }

 const decoded = jwt.verify(token, process.env.JWT_SECRET);
 req.user = await User.findById(decoded.id);

 next()




})