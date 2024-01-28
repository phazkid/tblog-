const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  name : {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  post: {
    type: mongoose.Schema.ObjectId, 
    ref: 'BlogPost'
  },
  parentId:{
    type: mongoose.Schema.ObjectId, 
    ref: 'Comment',
  }
  
  // You can add more fields based on your requirements (e.g., likes, replies, etc.).
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}

);

commentSchema.pre(/^find/, function(next) {
  this.populate('replies');
  next();
});



commentSchema.virtual('replies', {
  ref: 'Comment',
  foreignField: 'parentId',
  localField: '_id'
})

// Comment Model
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;