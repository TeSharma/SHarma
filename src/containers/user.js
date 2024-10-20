const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const auth = require('../auth');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: [3, 'Username too short'],
    maxlength: [20, 'Username too long']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password too short']
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await auth.hashPassword(this.password);
  }
  next();
});

userSchema.methods.comparePassword = async function(password) {
  return await auth.comparePassword(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;