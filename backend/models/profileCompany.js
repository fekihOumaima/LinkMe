const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileCompanySchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: 'company'
  },
  image: {
    type: String,
    required: true,
    max: 40
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  social: {
    facebook: {
      type: String
    },
    instagram: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ProfileCompany = mongoose.model('profileCompany', ProfileCompanySchema);
