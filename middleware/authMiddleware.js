const auth = require('../auth');
const jwt = require('jsonwebtoken');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token'] || req.headers.authorization;
    if (!token) {
      return res.status(401).send('Unauthorized');
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token');
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Authentication failed');
  }
};

module.exports = { authenticate };
