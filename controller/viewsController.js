const axios = require('axios')
const { log } = require('console')
//const BlogPost = require('../models/BlogPost');

exports.registerPage = async (req, res, next) => {

    res.status(200).render('register', { title: 'Register Account'})

}

exports.loginPage = async (req, res, next) => {

    res.status(200).render('login', { title: 'login to your Account'})

}


exports.getOverview = async (req, res, next)=>{
     try{

     let currentPage = req.query.page
     let apiResponse = await axios.get(`${req.protocol}://${req.get('host')}/api/v1/post?page=${req.query.page}&limit=3`)
      
     let posts = apiResponse.data.data
     let totalPages = apiResponse.data.totalPages

     res.status(200).render('overview', { title: 'Home Page', posts, currentPage, totalPages})

     }catch(err){


        err.response.data.originalUrl = req.originalUrl
        next(err.response.data)

     }
}

exports.getPostByCategory = async (req, res, next) => {
       try{
    let apiResponse = await axios.get(`${req.protocol}://${req.get('host')}/api/v1/post?category=${req.params.category}&page=${req.query.page}&limit=${req.query.limit}`)
   
    let posts = apiResponse.data.data
     let totalPages = apiResponse.data.totalPages

     res.status(200).render('overview', { title: `${req.params.category}`, posts, totalPages, })
       }catch(err){
        err.response.data.originalUrl = req.originalUrl
        next(err.response.data)
       }
}




exports.editPost = async (req, res, next) => {
    try{

    let apiResponse = await axios.get(`${req.protocol}://${req.get('host')}/api/v1/post/${req.params.slug}`)
     
    let [data] = apiResponse.data.data
    
    let post  = data

      res.status(200).render('editPost', {title: `${post.title}`, post})


    }catch(err){

        err.response.data.originalUrl = req.originalUrl
        next(err.response.data)

    }

}


exports.getPost = async (req, res, next) => {
   
    try{
        //console.log(req.originalUrl);
    let apiResponse = await axios.get(`${req.protocol}://${req.get('host')}/api/v1/post/${req.params.slug}`)
     
    let [data] = apiResponse.data.data
     let post  = data
    
    res.status(200).render('post', {title: `${post.title}`, post})

    }catch(err){

       
      err.response.data.originalUrl = req.originalUrl
      next(err.response.data)



    }



}

exports.createNewPost = (req, res, next) => {
     
    res.status(200).render('createPost', {title: 'create New Post'})
}




exports.managePost = async (req, res, next) => {
      
    try{   
        let apiResponse = await axios.get(`${req.protocol}://${req.get('host')}/api/v1/post`)
      
        let posts = apiResponse.data.data
      
        res.status(200).render('managePost', { title: 'manage post', posts})
   
        }catch(err){
           
          err.response.data.originalUrl = req.originalUrl
           next(err.response.data)  
        }

}

exports.deletePost = async (req, res, next) => {
    
     try{
       
   let apiResponse = await axios.delete(`${req.protocol}://${req.get('host')}/api/v1/post/${req.params.slug}`)
       
    if(response.data.status === 'success'){
        res.redirect('/managePost'); 
    }

    }catch(err){


     }
}




exports.forgotPassword = (req, res, next) => {
    res.status(200).render('forgotPassword', {title: 'Forgot Your Password'})
}

exports.resetPassword = (req, res,next) => {

    res.status(200).render('resetPassword', {title: 'Reset Your Password', token: req.params.token})
}