const mongoose = require('mongoose')
const slugify = require('slugify')
const AppError = require('./../utils/appError')
const validator = require('validator');
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please tell us your name"]
    },
    email: {
        type: String,
        required: [true, "please provide your email"],
        unique: true, 
        lowercase: true,   
        validate: [validator.isEmail, 'Please provide a valid email']
    }, 
    photo: {
      type: String
    },
    role: {
        type: String,
        enum: [ 'guide', 'admin'],
        default: "guide"
     },
     password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
     },
     passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'], 
        validate : {
            //this only work on create or save
            validator: function(el){
                return el === this.password
            }, 
             message: 'password and passwordconfirm must be the same'
        }
      },
      passwordResetToken: String,
      passwordResetExpires: Date,

})


userSchema.methods.correctPassword =  async function (candidatePassword) { 
  return await bcrypt.compare( candidatePassword, this.password)
} 



userSchema.pre('save', async function(next) {
  
    // Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
  
    // Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);
  
    // Delete passwordConfirm field
    this.passwordConfirm = undefined;
    next();
  });



const User = mongoose.model('User', userSchema);

module.exports = User;