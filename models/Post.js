const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        tittle: {
            type: String,
            required: true,
            unique: true
        },
        desc: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
        },
        category: {
            type: Array,
            required: false
        },
    }, 
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);