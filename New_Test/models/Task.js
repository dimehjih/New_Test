const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task: String,
  user_id: String,
  to_user: String,
  description: String,
  status: String,
  date_created: Date,
  date_updated: Date,
});

module.exports = mongoose.model('Task', taskSchema);
