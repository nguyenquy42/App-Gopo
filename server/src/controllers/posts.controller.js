const { update } = require('../models/post.model');
const Post = require('../models/post.model')

module.exports.createPostComment = async (req, res) => {

    const {type, data} = req.body;
    const _id = req.params

    if (type === 'comments') {
        const post = await Post.findOne({_id})
         post.comments.push({
             content:data.comment
         })
         post.save()
    }
    res.json({ isSuccess: true})
}

module.exports.createPostReaction = async (req, res) => {
    // const { post, postId} = req.body;

 

    // if (!post) {
    //     return res.json({
    //         isSuccess: false,
    //         message: 'Missing required fields',
    //     })
    // }

    //     const id = Post.where({_id: postId})
    //     id.update({ $set: { reaction: post.reaction}}).exec()
    //     return res.json({ isSuccess: true, data: post.reaction})
    Post.findByIdAndUpdate(req.params.id, req.body, function(err, doc){
        if (err) {
          return res.json({
            isSuccess: false,
            message: 'Error in updating person with id',
          })
        }
        return res.json({isSuccess: true, data: "ssss"});
     })
        
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
        reaction:{
            like:0,
            smile:0,
            love:0,
            angry:0,
            surprise:0
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