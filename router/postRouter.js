const express = require('express')
const router = express.Router()
const postController = require('./../controller/postController')
const authController = require('./../controller/authController')



//router.route.post('/upload', postController.uploadUserPhoto, postController.contentImage)
router.route('/upload').post(postController.uploadUserPhoto, postController.resizeUserPhoto, postController.contentImage)

router
  .route('/')
  .get(postController.getAllpost)
  .post(authController.authProtect, postController.uploadUserPhoto, postController.resizeBlogImage,  postController.createPost);

router
  .route('/:slug')
  .get(postController.getPost)
  .patch(postController.uploadUserPhoto, postController.resizeBlogImage, postController.updatePost)
  //.delete(authController.authProtect, authController.authRetrictTo('admin'), postController.deletePost);
  .delete(postController.deletePost);


module.exports = router