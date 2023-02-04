const mongoose = require('mongoose')
const questionModel = mongoose.Schema({
    
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    question:{
        type: String, 
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    options:{
        type  :Array,
        required:true
    }
})
module.exports = mongoose.model('question', questionModel)