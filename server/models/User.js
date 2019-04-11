const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: mongoose.Schema.Types.String,
  email: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' }]
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User
};
