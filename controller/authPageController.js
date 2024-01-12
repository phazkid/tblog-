const AppError = require('./../utils/appError')
const User = require('./../model/userModel')
const { promisify } = require('util');
let jwt = require('jsonwebtoken');
const { log } = require('console');


exports.isLoggedIn = async (req, res, next) => {
 
    try{
    if(req.cookies.jwt){
    //validate token
  let payload = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECRET);
    
   if(!payload){
    res.locals.user = null;
    return next()
   }
 
   //3) check wether the user still exists
 let currentUser = await User.findById(payload.userId).select('+password')
    
 
    if(!currentUser) {
      res.locals.user = null;
      return next()
    }

   res.locals.user = currentUser
      
 
     return next()

     }else{
      res.locals.user = null;
      return  next()
      
       }
       } catch(err){
      res.locals.user = null;
       next()
     }

}



exports.protectPage = async (req, res, next) => {
   try{
    
  if(!res.locals.user) return next(new AppError('You are not login, login to get access'))
   
    return  next() 

   }catch(err){
     //next(err)
  }
}
