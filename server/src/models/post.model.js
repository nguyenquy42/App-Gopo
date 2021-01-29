const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    author: String,
    content: String,
    reaction: {
        like: Number,
        smile: Number,
        love: Number,
        angry: Number,
        surprise: Number
    },
    comments: [
        {
          author: String,
          content: String
        }
      ],
      created: { type: Date, default: Date.now }
},
    {
        collection: 'Posts'
    });

module.exports = mongoose.model('Post', postSchema)