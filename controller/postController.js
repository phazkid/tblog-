const BlogPost = require('./../model/postModel')
const multer = require('multer')
const sharp = require('sharp')
const AppError = require('./errorControler')
/*

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'assets/images/content');
    },
  filename: (req, file, cb) => {
      const ext = file.mimetype.split('/')[1]
      cb(null, `content-${Date.now()}.${ext}`);
    }
}) */

const multerStorage = multer.memoryStorage()

const multerFilter = ((req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Accept the file
  } else {
  // cb(new AppError('this image is not allowed', 404));
  }})


  const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
})


exports.uploadUserPhoto = upload.single('file')

exports.resizeUserPhoto = async (req, res, next) => {

  if(!req.file) return next()

  req.file.filename = `content-${Date.now()}.jpeg`

 await sharp(req.file.buffer).resize(1200,600).toFormat('jpeg').jpeg({quality: 70}).toFile(`assets/images/content/${req.file.filename}`)

  next()
}

exports.resizeBlogImage = async (req, res, next) => {

  if(!req.file) return next()

  req.file.filename = `blog-${Date.now()}.jpeg`

 await sharp(req.file.buffer).resize(300,300).toFormat('jpeg').jpeg({quality: 70}).toFile(`assets/images/blog/${req.file.filename}`)

  next()
}



exports.contentImage = async (req, res, next)=> {
 
res.json({ location: `/images/content/${req.file.filename}`})

}




   

exports.getAllpost = async (req, res, next) => {

    try{
       
        //get the copied version of req.query
        let queryObject = Object.assign({}, req.query)

        let excludedField = ["page", "sort", "limit", "fields"]
         
        excludedField.forEach(field => {
            delete queryObject[field]
        })
       

        let page = +(req.query.page) || 1
        let limit = +(req.query.limit) || 20
        let skip  = (page - 1) * limit 

       let totalPost =  await BlogPost.countDocuments(queryObject);


        let totalPages = Math.ceil(totalPost / limit)
         
        


        let post = await BlogPost.find(queryObject).sort('-createdAt').select("-__v").skip(skip).limit(limit)
        



        res.status(200).json({
        status: 'success',
         totalPages,
         data:  post
        });







    }catch(err){

     next(err)
     
    }


}

exports.createPost = async (req, res, next) => {

    try{
    
    const {title, content, category, author} = req.body
      
  
    const newPost = new BlogPost({
      title,
      content,
      author,
      category,
      image : req.file.filename
    });
 
    
    // Save the blog post to the database
     const savedPost = await newPost.save();
       


    res.status(201).json({
      status: 'success',
      data: savedPost
    }); 
  }catch(err){

    next(err)

    }

}

exports.getPost = async (req, res, next) => {
      try{

  let post = await BlogPost.find({slug: req.params.slug})
      
    

    res.status(200).json({
        status: 'success',
        data: post
      }); 
   
    }catch(err){
      next(err)
    }

}


exports.updatePost = async (req, res, next) => {
     try{
  const {title, content, category, author} = req.body
  
      
   let updatedPost = await BlogPost.findOneAndUpdate({slug: req.params.slug}, {title, content, category, author,  image : req.file.filename}, {new : true, runValidators: true})
     

    res.status(200).json({
        status: 'success',
        message: updatedPost
      });

    }catch(err){
      next(err)
    }
      
}

exports.deletePost = async (req, res, next) => {
     try{
    
      await BlogPost.findOneAndDelete({slug: req.params.slug})

      res.status(200).json({
        status: 'success',
        message: 'delete posts'
      });

      
     }catch(err){
      next(err)
     }


}




