const mongoose = require('mongoose')
const { Schema } = mongoose;

const postSchema = new Schema({
    author: String,
    content: String,
    reaction: {
        like: Number,
        haha: Number,
        love: Number,
        angry: Number,
        wow: Number
    },
    comments: Array
},
    {
        collection: 'Posts'
    });

module.exports = mongoose.model('Post', postSchema)