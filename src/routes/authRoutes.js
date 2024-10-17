const express = require('express');
const router = express.Router();
const { register } = 
require('../controllers/registerController');
const { login } =
require('../controllers/loginController');
const { authenticate } = 
require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login)
// Protected route
router.get('/protected', authenticate, (req, res) => {
    res.send(`Hello, ${req.user.username}!`);
  });
  
module.exports = router;
