const User = require('../models/user');
const auth = require('../auth');

const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }
    const newUser = new User({ username, password, role });
    await newUser.save();
    const token = auth.generateToken(newUser);
    res.send({ token, username, role });
  } catch (err) {
    console.error(err);
    res.status(500).send('Registration failed');
  }
};

module.exports = { register };