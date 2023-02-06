const mongoose = require('mongoose');
const subjectModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    topics: {
      type: [String],
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model('subject', subjectModel);
