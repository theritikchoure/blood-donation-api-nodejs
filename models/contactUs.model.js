const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ContactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name is Required'
  },

  email: {
    type: String,
    required: true,
    unique: false,
    // Regexp to validate emails with more strict rules as added in tests/users.js which also conforms mostly with RFC2822 guide lines
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email'],
  },

  mobile: {
    type: Number,
    required: true,
    trim: true,
    unique: false,
  },
  
  message: {
    type: String,
    required: 'Message is Required'
  },

}, {
  versionKey: false
});


module.exports = mongoose.model('ContactUs', ContactUsSchema);
