const User = require('../models/user');
const auth = require('../auth');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).send('Invalid credentials');
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(401).send('Invalid credentials');
    }
    const token = auth.generateToken(user);
    res.send({ token, username, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).send('Login failed');
  }
};

module.exports = { login };