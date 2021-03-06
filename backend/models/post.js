const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  image: {
    type: String
  },
  tags: {
    type: [String],
    required: true
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('post', PostSchema);