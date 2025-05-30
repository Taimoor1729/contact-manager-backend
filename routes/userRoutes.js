const express = require('express');
const router = express.Router();
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const valdiateToken = require('../middleware/validateTokenHandler');

router.post('/register', registerUser);

router.post('/login', loginUser)

router.get('/current', valdiateToken , currentUser)

module.exports = router;