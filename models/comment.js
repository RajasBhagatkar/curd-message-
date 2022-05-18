const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        require: true
    }
})


const comment = mongoose.model('comment', commentSchema)

module.exports = comment