const mongoose = require('mongoose')
const slugify = require('slugify')
const AppError = require('./../utils/appError')
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'blogs tittle is required']
    },
    content: {
        type: String,
        required: [true, 'blog content is required'],
      },
    category: {
        type: String,
        
        required: [true, 'a blog must have a category'],
        enum: {
            values: ['science', 'art', 'commerce'],
            message: 'category can only be science, art, or commerce'
        }
    },
    slug: String,
    author:Array, 
    image: {
      type: String,
      required: [true, 'a blog post must have image']
    }, 
    createdAt: {
       type: Date,
       default: Date.now(),
    }
})


postSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});


postSchema.post(/^find/, function(docs, next) {
    
    if(!docs || docs.length === 0 ){
     return next(new AppError("no post founds", 404) )
    }
     
    next()
});  



const BlogPost = mongoose.model('BlogPost',postSchema );

module.exports = BlogPost;
