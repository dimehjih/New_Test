const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: { type: String, unique: true },
  password: String,
  status: String,
  date_created: Date,
  date_updated: Date,
});

module.exports = mongoose.model('User', userSchema);
