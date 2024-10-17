const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const auth = require('../auth');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await auth.hashPassword(this.password);
  }
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(password) {
  return await auth.comparePassword(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
