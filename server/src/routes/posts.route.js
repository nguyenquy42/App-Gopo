const express = require('express');
const router = express.Router()

const postController = require('../controllers/posts.controller')

router.get('/', postController.getPost)
router.post('/', postController.createPost)
router.put('/:_id/', postController.createPostComment)
router.put('/reaction/:_id/', postController.createPostReaction)


module.exports = router;