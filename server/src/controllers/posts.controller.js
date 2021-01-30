const { update } = require('../models/post.model');
const Post = require('../models/post.model')

module.exports.createPostComment = async (req, res) => {

    const { type, data } = req.body;
    const _id = req.params

    if (type === 'comments') {
        const post = await Post.findOne({ _id })
        post.comments.push({
            content: data.comment
        })
        post.save()
    }
    res.json({ isSuccess: true })
}

module.exports.createPostReaction = async (req, res) => {
    const { postUpdate } = req.body; //

    const post = Post.where({ _id: req.body._id })
    post.update({ $set: { reaction: req.body.reaction } }).exec()
    return res.json({ isSuccess: true, data: req.body })
    // Post.findByIdAndUpdate(req.params.id, req.body, function (err, doc) {
    //     if (err) {
    //         return res.json({
    //             isSuccess: false,
    //             message: 'Error in updating reaction',
    //         })
    //     }

    //     return res.json({ isSuccess: true, data: req.body._id });
    // })

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

    const newPost = new Post({
        ...req.body,
        reaction: {
            like: 0,
            smile: 0,
            love: 0,
            angry: 0,
            surprise: 0
        },
        comments: []
    })

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