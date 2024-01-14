const express = require('express')
const router = express.Router()
const viewsController = require('./../controller/viewsController')
const authPageController = require('./../controller/authPageController')

router.use(authPageController.isLoggedIn)

router.get('/', viewsController.getOverview)
router.get('/deletePost/:slug', viewsController.deletePost)
router.get('/category/:category', viewsController.getPostByCategory)
router.get('/art', viewsController.getOverview)
router.get('/editPost/:slug', viewsController.editPost)
router.get('/managePost', authPageController.protectPage, viewsController.managePost)
router.get('/createPost', authPageController.protectPage, viewsController.createNewPost)
router.get('/post/:slug', viewsController.getPost)
router.get('/register', viewsController.registerPage )
router.get('/login', viewsController.loginPage)
router.get('/forgotPassword', viewsController.forgotPassword)
router.get('/resetPassword/:token', viewsController.resetPassword)

module.exports = router


