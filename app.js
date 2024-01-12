const path = require('path')
const express = require('express')
const cookieParser = require('cookie-parser');
const ejs = require('ejs')
const postRouter = require('./router/postRouter')
const userRouter = require('./router/userRouter')
const viewsRouter = require('./router/viewsRouter')
const globalErrorHandeler = require('./controller/errorControler')
const AppError = require('./utils/appError')
const { log } = require('console')


let app = express()

//////set view engine
app.set('view engine', 'ejs');
////set where to look for view folder
app.set('views', path.join(__dirname, 'views'))
//// static files
app.use(express.static(path.join(__dirname, 'assets')));
app.use(cookieParser());
app.use(express.json())
/////views Router 
app.use('/', viewsRouter)


////api Routes
app.use('/api/v1/post', postRouter)
app.use('/api/v1/users', userRouter)

/*this will be implemented later
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
api.use('/api/v1/comment',commentRouter )
*/


///this is for unhandled routes
app.all("*", (req, res, next)=>{

   next(new AppError(`cant find ${req.originalUrl} on this server`, 404))
    
   
})


app.use(globalErrorHandeler)



module.exports = app