const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'Sharma';


const generateToken = (user) => {
  const token = jwt.sign({ 
    id: user._id, 
    username: user.username, 
    role: user.role 
  }, process.env.SECRET_KEY, { expiresIn: '1h' });
  return token;
};


const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send('Unauthorized');
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    req.user = decoded;
    next();
  });
};


const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};


const comparePassword = async (password, hash) => {
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
};

module.exports = { generateToken, verifyToken, hashPassword, comparePassword };
