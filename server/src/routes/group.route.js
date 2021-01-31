const express = require('express');
const router = express.Router()

const groupController = require('../controllers/group.conntroller')

router.get('/', groupController.getGroup)
router.post('/', groupController.createGroup)
// router.put('/:_id/', groupController.createPostComment)
// router.put('/reaction/:_id/', groupController.createPostReaction)


module.exports = router;