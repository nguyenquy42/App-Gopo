const Post = require('../models/post.model')

module.exports.createPostComment = async (req, res) => {

    const {type, data} = req.body;
    const _id = req.params

    if (type === 'comments') {
        const post = await Post.findOne({_id})
         post.comments.push({
             conntent:data.comment
         })
         post.save()
    }
}

module.exports.getPost = async (req, res) => {
    const posts = await Post.find()
    res.json({ isSuccess: true, data: posts })
}

module.exports.createPost = async (req, res) => {

    const { author, content } = req.body;

    if (!author || !content) {
        return res.json({
            isSuccess: false,
            message: 'Missing required fields',
        })
    }

    const newPost = new Post({ ...req.body })

    newPost.save(function (err, doc) {
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