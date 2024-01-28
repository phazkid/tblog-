const express = require('express')
const router = express.Router({ mergeParams: true })
const commentController = require('./../controller/commentController')


router
  .route('/')
  .get(commentController.getAllComment)
  .post(commentController.createComment);

router.route('/:id').get(commentController.getComment)
module.exports = router

