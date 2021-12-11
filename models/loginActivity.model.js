const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CustomSchema = new mongoose.Schema({
  
  user_id: {
    type: String,
    required: true
  },

  user_type: {
    type: String,
    required: true
  },

  agent: {
    type: String,
    required: true
  },

  ip: {
    type: String,
    required: true,
  },

  latitude: {
    type: String,
    required: false,
  },
  
  longitude: {
    type: String,
    required: false,
  },

  login_status: {
    type: String,
    required: true,
  },

  login_time: {
    type: Date,
    required:true,
    default: Date.now
  },

  logout_time: {
    type: String,
    required:false
  },

  created_at: {
    type: Date,
    default: Date.now
  },

  updated_at: {
    type: Date,
    required: false
  }

}, {
  versionKey: false
});


module.exports = mongoose.model('UserLoginActivity', CustomSchema);
