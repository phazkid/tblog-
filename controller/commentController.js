const Comment = require('./../model/commentModel')

exports.createComment = async (req, res, next) => {
     
    try{
    
        if(!req.body.post) req.body.post = req.params.postId
        if(req.body.parentId) req.body.post = undefined
        let {text, name, post, parentId} = req.body
    

    //let {text, name, post, parentId} = req.body


    let newComment = await Comment.create({text, name, post, parentId}) 
   
    res.status(201).json({
        status: "success",
        newComment

    })

   }catch(err){
     next(err)
   }
}



exports.getAllComment = async (req, res, next) => {
      try{
    let query = {}
   if(req.params.postId) query = {post : req.params.postId}

   let comments =  await Comment.find(query).sort('-date')

   res.status(201).json({
    status: "success",
    result: comments.length,
    comments
})

}catch(err){
    next(err)
}

}

exports.getComment = async (req, res, next) => {
  
    await Comment.findOne({_id : req.params.id})


}
