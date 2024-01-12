const express = require('express')
const router = express.Router()
const authController = require('./../controller/authController')


//////////auth router
router.route('/signup').post(authController.signUp)

router.route('/forgotPassword').post(authController.forgetPassword)

router.route('/resetPassword/:token').patch(authController.resetPassword)
  

router.route('/login').post(authController.login)



//////user router





module.exports = router