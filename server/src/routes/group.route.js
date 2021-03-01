const express = require('express');
const router = express.Router()

const groupController = require('../controllers/group.conntroller')

router.get('/', groupController.getGroup)
router.post('/', groupController.createGroup)
router.put('/:_id/', groupController.createPostGr)
router.get('/:_id/', groupController.getGroupById)
// router.put('/reaction/:_id/', groupController.createPostReaction)


module.exports = router;