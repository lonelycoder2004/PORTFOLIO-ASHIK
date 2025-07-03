const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  demoUrl: {
    type: String,
    default: "#"
  },
  githubUrl: {
    type: String,
    default: "#"
  },
  tags: {
    type: [String],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('Work', workSchema);