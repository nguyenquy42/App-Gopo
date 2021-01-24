const express = require('express');
const router = express.Router()

const postController = require('../controllers/posts.controller')

router.get('/', postController.getPost)
router.post('/', postController.createPost)


module.exports = router;