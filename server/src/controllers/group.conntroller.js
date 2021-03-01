const { update } = require('../models/group.model');
const Groups = require('../models/group.model')


module.exports.getGroup = async (req, res) => {
    const groups = await Groups.find()
    res.json({ isSuccess: true, data: groups })
}


module.exports.getGroupById = async (req, res) => {
    const _id = req.params
    const groupname = await Groups.findOne({ _id })
    if (groupname) {
      return res.json({ isSuccess: true, data: groupname })
    }
  
  }

module.exports.createGroup = async (req, res) => {

    const { groupname } = req.body;

    if (!groupname) {
        return res.json({
            isSuccess: false,
            message: 'Missing required fields',
        })
    }

    const newGroup = new Groups({
        ...req.body
    })

    newGroup.save(function (err, doc) {
        if (err) {
            return res.json({
                isSuccess: false,
                message: 'Database error',
            })
        } else {
            return res.json({
                isSuccess: true,
                message: 'Group is created',
                data: doc,
            })
        }
    });
}


module.exports.createPostGr = async (req, res) => {

    const { type, data } = req.body;
    const _id = req.params
    console.log(_id);

    if (type === 'post') {
        const post = await Post.findOne({ _id })
        post.push({
            content: data.comment,
            author: data.author

        })
        post.save(function (err, doc) {
            if (err) {
                return res.json({
                    isSuccess: false,
                    message: 'Database error',
                })
            } else {
                return res.json({
                    isSuccess: true,
                    message: 'User is created',
                    data: doc,
                })
            }
        });
    }
    res.json({ isSuccess: true })
}