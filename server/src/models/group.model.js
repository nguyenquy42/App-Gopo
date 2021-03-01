const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    groupname: String,
    post: [
        {
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
        }
    ],
    createdGroup: { type: Date, default: Date.now }
},
    {
        collection: 'Groups'
    });

module.exports = mongoose.model('Groups', userSchema)