const mongoose = require('mongoose');
const questionModel = mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
);
module.exports = mongoose.model('question', questionModel);
