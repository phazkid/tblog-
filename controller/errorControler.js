 const AppError = require('./../utils/appError')
 
 module.exports = (err, req, res, next)=> {
   
  if(process.env.NODE_ENV === 'development'){
    ///// development errrror

    err.statusCode = err.statusCode || 500
    err.status = err.status || 'error'
     
    ////render api error
   if(!err.originalUrl){
     res.status(err.statusCode).json({
         status: err.status,
         message: err.message,
         err ,
         stack: err.stack
     })
     ////render webpage error 
    } else {
     
      res.status(err.statusCode).render('error', {title: `error page`, message: err.message})

      }


   }else if(process.env.NODE_ENV === 'production'){

      if(err.originalUrl){
        
      return  res.status(500).render('error', {title: `error page`, message: err.message})
      }


      if(err.code === 11000){
       err.message = Object.entries(err.keyValue)
      .map(([fieldName, fieldValue]) => `the ${fieldName} => ${fieldValue} already exist, please provide another value`)
       .join(", ");
        err = new AppError(err.message, 400) 
      }
      ///handling validation error
      if(err.name === "ValidationError"){
        let errorMessage = Object.values(err.errors).map(el => el.message).join('. ')
        err = new AppError(`invalid input data, ${errorMessage}`, 400)
      }
   

     if(err.isOperational){

        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
      })


     } else{
      err.statusCode =  500
      err.status = 'error'   
      console.log(err);
        res.status(err.statusCode).json({
            status: err.status,
            message: 'something went wrong',
        })

     }

    } 





   }



    
  
 