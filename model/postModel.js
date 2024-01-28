const User = require('./userModel')
const mongoose = require('mongoose')
const slugify = require('slugify')
const AppError = require('./../utils/appError')
const { type } = require('os')
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
    author: {
     type: mongoose.Schema.Types.ObjectId,
     ref: User,
     required: [true, 'a post must have author']
    },  
    image: {
      type: String,
      required: [true, 'a blog post must have image']
    }, 
    createdAt: {
       type: Date,
       default: Date.now(),
    },
    
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}

)

postSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'post',
    localField: '_id'
})


postSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});


postSchema.pre(/^find/, function(next) {
    this.populate({
      path: 'author',
      select: 'name'
    });
  
    next();
  });
  

postSchema.pre('save', async function(next) {
   
   /* const authorPromises = this.author.map(async id => await User.findById(id));
    this.author = await Promise.all(authorPromises);*/

    this.author = await User.findById(this.author)

     next()
   });

postSchema.post(/^find/, function(docs, next) {
    
    if(!docs || docs.length === 0 ){
     return next(new AppError("no post founds", 404) )
    }
     
    next()
});  

 



const BlogPost = mongoose.model('BlogPost',postSchema );

module.exports = BlogPost;
