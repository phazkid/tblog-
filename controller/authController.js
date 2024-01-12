const User = require('./../model/userModel')
const AppError = require('./../utils/appError')
const { promisify } = require('util');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
let sendEmail = require('./../utils/email');

exports.signUp = async (req, res, next) => {
       try{
  /////retrieve user data and validate it with mongose valiadator
       
      let {name, email, password, passwordConfirm} = req.body
     
       const newUser = await User.create({name, email, password, passwordConfirm})
         

        res.status(201).json({
            status: "success",
            newUser

        })


       }catch(err){

        next(err)

      }

}


exports.login = async (req, res, next) => {
     try{
   ///get email and passord from user or client
  
    const {email, password} = req.body
    
    ////check if email and password  input exist
    if(!email || !password) return next(new AppError('please provide email and password', 400))
      
    //////get user by email
     const user = await User.findOne({email}).select('+password')
   
     /////// check if user exists 
     if(!user) return  next(new AppError('incorrect email or password', 401))
     
     /////check if password is the same
     let correct = await user.correctPassword(password)
     if(!correct) return  next(new AppError('incorrect email or password', 401))
   
      //////create a jwt token that tore user_id i the payload
     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
      
        /////store the http only jwt in cookie 
     const cookieOptions = {
        httpOnly: true,
        path: '/',
       sameSite: 'Lax',
      };
       ////////use https if on production
      if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
      
        res.cookie('jwt', token, cookieOptions);
    
        /////send response
         res.status(201).json({
          status: "success",
           token 
           })
        }catch(err){
          next(err) 
        }

}


exports.authProtect = async(req, res, next) => {
       
      try{
     //1) getting token from the authorization header
     let token;
     if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       token = req.headers.authorization.split(' ')[1];
     }

     ///2) checking wether the token exists
    if(!token) return next(new AppError('You are not logged in, log in to get access', 401))

    ///3) validate the token
     let payload = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
     
     ///4) check wether the user still exists
     let currentUser = await User.findById(payload.userId).select('+password')
      
     if(!currentUser) return next(new AppError("The user belonging to this token doest not exist", 401))
      
     req.user = currentUser
     next()
     
      }catch(err){
         next(err)
      }
      

}


exports.authRetrictTo = (...roles)=> {
 
  return (req, res, next) => {
   
     if(!roles.includes(req.user.role)){
      return next(new AppError('you did not have permision to perform this action', 403))
     }
     
      
    next()

  }

}


exports.forgetPassword =  async (req, res, next) => {
     let user
    try{
    //////get user based on posted email address 
     user = await User.findOne({email : req.body.email})
    if(!user) return next(new AppError('there is no user with that email address', 404))
    
    /////generate random reset token
     const resetToken = crypto.randomBytes(32).toString('hex');
     
     /// hash the reset generated reset token and store it in database
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    
    ////set when the token will expire
     user.passwordResetExpires = Date.now() + (10 * 60 * 1000);  ///expire in 10minute

    /////save it to database
     await user.save({validateBeforeSave: false})

     console.log(resetToken);
     /*
     ////send the token to user email address
     const resetURL = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

       await sendEmail({
         template: "passwordReset", 
         user,
         url: resetURL,
         subject: 'Your password reset token (valid for only 10 minutes)'
       })  
 */
     ////send response
     res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
    
   
    

    }catch(err){

      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      next(err)
      
    }

}

exports.resetPassword = async (req, res, next) => {
    try{
      ///get user based on token
      const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex'); 
     
     
      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
      });


      ////check if the token have not expired
      if (!user) {
      return next(new AppError('Token is invalid or has expired', 400));
       }
      
        //////create new password and save it
       user.password = req.body.password;
       user.passwordConfirm = req.body.passwordConfirm;
       user.passwordResetToken = undefined;
       user.passwordResetExpires = undefined;
       await user.save();

     /////send response
      res.status(201).json({
       status: "success",
       message: 'password changed successfully',
        })

      }catch(err){
        console.log(err);
         next(err)
      }


}


exports.updatePassword = async (req, res, next) => {
    try{



    }catch(err){



      
    }




}