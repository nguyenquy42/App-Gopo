// const { posts } = require('../data/post.data');
// const { v4: uuidv4 } = require('uuid');
const Post = require('../../models/post.model')



module.exports.getPost = async (req, res) => {
    const posts = await Post.find()
    res.json({ isSuccess: true, data: posts })
}

module.exports.createPost = async (req, res) => {
    // const newPost = { id: uuidv4(), ...req.body }
    // posts.push(newPost)
    // res.json({ status: 'success', newPost })

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